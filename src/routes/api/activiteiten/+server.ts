import { ActiviteitSchema } from '$lib/schemas';
import { parseDateTime } from '@internationalized/date';
import { error, fail, json } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult, superValidate } from 'sveltekit-superforms/server';

export async function GET({ locals, url }) {
	const id = url.searchParams.get('id');

	if (id) {
		return json(
			locals.pb
				.collection('activiteiten')
				.getOne(id)
				.then((n) => ({
					...n,
					banner: locals.pb.files.getUrl(n, n.banner)
				}))
		);
	}

	const a = await locals.pb
		.collection('activiteiten')
		.getFullList({
			filter: `praesidium.academiejaar = '${locals.praesidium?.academiejaar}'`,
			sort: '-datum'
		})
		.then((r) =>
			r.map((a) => ({
				...a,
				banner: locals.pb.files.getUrl(a, a.banner)
			}))
		);

	const vandaag = new Date();
vandaag.setHours(0, 0, 0, 0); // alleen de datum telt

const opkomende_activiteiten = a
	.filter((a) => {
		const datum = new Date(a.datum);
		datum.setHours(0, 0, 0, 0);
		return datum >= vandaag; // vandaag of later = opkomend
	})
	.sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());

const afgelopen_activiteiten = a
	.filter((a) => {
		const datum = new Date(a.datum);
		datum.setHours(0, 0, 0, 0);
		return datum < vandaag; // enkel echt oudere datums = afgelopen
	})
	.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());

	return json({ opkomende_activiteiten, afgelopen_activiteiten });
}

export async function POST(event) {
	const origineleData = await event.request.clone().formData();

	if ((origineleData.get('banner') as File).size == 0) {
		origineleData.delete('banner');
	}

	origineleData.set('datum', new Date(origineleData.get('datum')).toISOString());

	const form = await superValidate(event, zod(ActiviteitSchema));
	form.data.banner = undefined;

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	if (form.data.id) {
		try {
			await event.locals.pb.collection('activiteiten').update(form.data.id, origineleData);
		} catch (err) {
			return actionResult('error', { form }, 500);
		}
	} else {
		origineleData.set('praesidium', event.locals.praesidium?.id ?? '');
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
