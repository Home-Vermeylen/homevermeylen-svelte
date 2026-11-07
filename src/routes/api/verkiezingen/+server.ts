import { VerkiezingenSchema } from '$lib/schemas';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

async function controleerKiescomite(locals: App.Locals): Promise<boolean> {
	const user = locals.pb.authStore.model;

	if (!user) {
		return false;
	}

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

export const GET: RequestHandler = async ({ locals }) => {
	if (!(await controleerKiescomite(locals))) {
		return json(
			{ error: 'Je hebt geen toegang tot de verkiezingen.' },
			{ status: 403 }
		);
	}

	try {
		const recentstePraesidium = await locals.pb
			.collection('praesidia')
			.getFirstListItem('', { sort: '-academiejaar' });

		const verkiezingen = await locals.pb.collection('verkiezingen').getFullList({
			filter: `praesidium = "${recentstePraesidium.id}"`,
			sort: '-created'
		});

		return json(
			verkiezingen.map((r) => ({
				...r,
				created: new Date(r.created)
			}))
		);
	} catch (err) {
		console.error('Fout bij ophalen verkiezingen:', err);

		return json(
			{ error: 'Verkiezingen ophalen mislukt.' },
			{ status: 500 }
		);
	}
};

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!(await controleerKiescomite(locals))) {
		return json(
			{ error: 'Je hebt geen toegang tot de verkiezingen.' },
			{ status: 403 }
		);
	}

	const origineleData = await request.clone().formData();
	const form = await superValidate(request, zod4(VerkiezingenSchema));

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	try {
		const recentstePraesidium = await locals.pb
			.collection('praesidia')
			.getFirstListItem('', { sort: '-academiejaar' });

		await locals.pb.collection('verkiezingen').create({
			naam: origineleData.get('naam'),
			stemgerechtigde_functies: [],
			toegangscodes: [],
			stemmingen: [],
			praesidium: recentstePraesidium.id,
			actief: false
		});
	} catch (err) {
		console.error('Fout bij aanmaken verkiezing:', err);
		return actionResult('error', { form }, 500);
	}

	return actionResult('success', { form }, 200);
};