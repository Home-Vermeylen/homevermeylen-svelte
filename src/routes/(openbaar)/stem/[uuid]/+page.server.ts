import { StemSchema } from '$lib/schemas';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	let verkiezingen;

	try {
		verkiezingen = await locals.pb.collection('verkiezingen').getFullList({
			filter: `actief = true`
		});

		verkiezingen = verkiezingen.filter((verkiezing) =>
			(verkiezing.toegangscodes ?? []).includes(params.uuid)
		);
	} catch (err) {
		console.error('Fout bij ophalen verkiezingen:', err);
		return error(500, 'Verkiezingen ophalen mislukt.');
	}

	if (verkiezingen.length === 0) {
		return error(403, 'Ongeldige toegangscode.');
	}

	return {
		stemmer_id: params.uuid,
		verkiezingen,
		stem_form: await superValidate(zod4(StemSchema))
	};
};