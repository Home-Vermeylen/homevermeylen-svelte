import { BaravondSchema, VerwijderBaravondSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		breadcrumb: {
			label: 'Baravonden',
			href: '/beheer/baravonden'
		},
		baravonden_promise: fetch('/api/baravonden').then(async (response) => {
			if (!response.ok) {
				throw new Error('Baravonden konden niet worden opgehaald.');
			}

			return await response.json();
		}),
		baravonden_form: await superValidate(zod4(BaravondSchema)),
		verwijder_baravond_form: await superValidate(zod4(VerwijderBaravondSchema))
	};
};