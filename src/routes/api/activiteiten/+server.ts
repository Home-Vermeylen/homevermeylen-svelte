import { ActiviteitSchema } from '$lib/schemas';
import { error, fail, json } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult, superValidate } from 'sveltekit-superforms/server';


export async function GET({ locals }) {
	const a = await locals.pb
		.collection('activiteiten')
		.getFullList({ filter: `praesidium.academiejaar = '${locals.praesidium?.academiejaar}'`, sort: '-datum' })
		.then(r => r.map(a => ({...a, banner: locals.pb.files.getUrl(a, a.banner), datum: new Date(a.datum)})));

	const opkomende_activiteiten = a
		.filter((a) => {
			return a.datum.getTime() >= (new Date()).getTime();
		})
		.sort((a, b) => a.datum.getTime() - b.datum.getTime())
	const afgelopen_activiteiten = a
		.filter((a) => {
			return a.datum.getTime() < (new Date()).getTime();
		})
		.sort((a, b) => b.datum.getTime() - a.datum.getTime());

	return json({ opkomende_activiteiten, afgelopen_activiteiten });
}

export async function POST(event) {
	const origineleData = await event.request.clone().formData();

	if ((origineleData.get('banner') as File).size == 0) {
		origineleData.delete('banner');
	}

	const lokale_datum = new Date(origineleData.get('datum') as string);

	origineleData.set('datum', (new Date(Date.UTC(lokale_datum.getUTCFullYear(), lokale_datum.getUTCMonth(),
	lokale_datum.getUTCDate(), lokale_datum.getUTCHours(),
	lokale_datum.getUTCMinutes(), lokale_datum.getUTCSeconds()))).toISOString());

	const form = await superValidate(event, zod(ActiviteitSchema));
	form.data.banner = undefined;

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	if(form.data.id) {
		try {
			await event.locals.pb.collection('activiteiten').update(form.data.id, origineleData);
		} catch (err) {
			return actionResult('error', { form }, 500);
		}
	} else {
		origineleData.set('praesidium', event.locals.praesidium?.id ?? '')
		try {
			await event.locals.pb.collection('activiteiten').create(origineleData);
		} catch (err) {
			return actionResult('error', { form }, 500);
		}
	}

	return actionResult('success', { form }, 200);
}

export async function DELETE({ locals, request }) {
	const data = await request.json();

    if (!locals.pb.authStore.isValid) {
        fail(403);
    }

	try {
		await locals.pb.collection('activiteiten').delete(data.id);
	} catch (err) {
		error(500, 'Er is een probleem opgetreden bij het verwijderen van de activiteit.');
	}

    return new Response(undefined, { status: 200 });
}
