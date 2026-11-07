import { StemgerechtigdeFunctiesSchema } from '$lib/schemas';
import { json } from '@sveltejs/kit';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { RequestHandler } from './$types';

async function controleerKiescomite(locals: App.Locals): Promise<boolean> {
	const user = locals.pb.authStore.model;

	if (!user) return false;

	try {
		const recentsteAcademiejaar = await locals.pb
			.collection('praesidia')
			.getFirstListItem('', { sort: '-academiejaar' });

		const praesidiumLid = await locals.pb
			.collection('praesidium_leden')
			.getFirstListItem(
				`functie = "${user.id}" && praesidium = "${recentsteAcademiejaar.id}"`
			);

		const lidMetKiescomite = praesidiumLid as typeof praesidiumLid & {
			kiescomite?: boolean;
		};

		return lidMetKiescomite.kiescomite === true;
	} catch {
		return false;
	}
}

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!(await controleerKiescomite(locals))) {
		return json(
			{ error: 'Je hebt geen toegang tot deze verkiezing.' },
			{ status: 403 }
		);
	}

	try {
		return json(await locals.pb.collection('verkiezingen').getOne(params.id));
	} catch {
		return actionResult('error', undefined, { status: 404 });
	}
};

export const POST: RequestHandler = async (event) => {
	if (!(await controleerKiescomite(event.locals))) {
		return json(
			{ error: 'Je hebt geen toegang tot deze verkiezing.' },
			{ status: 403 }
		);
	}

	const origineleData = await event.request.clone().formData();
	const form = await superValidate(event, zod4(StemgerechtigdeFunctiesSchema));
    console.log('Validatie formulier:', form);

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	try {
		const verkiezing = await event.locals.pb
			.collection('verkiezingen')
			.getOne(event.params.id);

            console.log('Start opslaan functies:', form.data.geselecteerde_functies);
            await event.locals.pb.collection('verkiezingen').update(event.params.id, {
	...verkiezing,
	naam: origineleData.has('naam')
		? origineleData.get('naam')
		: verkiezing.naam,
	actief: origineleData.has('actief')
	? origineleData.get('actief') == 'on'
	: verkiezing.actief,
	stemgerechtigde_functies: form.data.geselecteerde_functies
});
console.log('Functies succesvol opgeslagen');
	} catch (err) {
		console.error('Fout bij aanpassen verkiezing:', err);
		return actionResult('error', { form }, 500);
	}

	return actionResult('success', { form }, 200);
};