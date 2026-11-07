import { StemSchema } from '$lib/schemas.js';
import { redirect } from '@sveltejs/kit';
import { zod4 } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.pb.authStore.model;

	if (!locals.pb.authStore.isValid || !user) {
		redirect(303, '/');
	}

	try {
	const alleVerkiezingen = await locals.pb
		.collection('verkiezingen')
		.getFullList({
			filter: 'actief = true'
		});

	console.log('Ingelogde gebruiker:', user.id);
	console.log('Actieve verkiezingen:', alleVerkiezingen);

	const verkiezingen = alleVerkiezingen.filter(
		(verkiezing: { stemgerechtigde_functies?: string[] }) =>
			verkiezing.stemgerechtigde_functies?.includes(user.id)
	);

	console.log('Verkiezingen waarvoor gebruiker stemgerechtigd is:', verkiezingen);

	return {
		functie_id: user.id,
		verkiezingen,
		stem_form: await superValidate(zod4(StemSchema))
	};
} catch (err) {
	console.error('Fout bij ophalen stemmingen:', err);
	throw err;
}
};