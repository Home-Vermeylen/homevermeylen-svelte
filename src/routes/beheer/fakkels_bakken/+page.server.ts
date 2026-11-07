import { FakkelsBakkenSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		breadcrumb: {
			label: 'Fakkels & Bakken',
			href: '/beheer/fakkels_bakken'
		},
		fakkels_bakken_form: await superValidate(zod4(FakkelsBakkenSchema)),
		fakkels_bakken: fetch('/api/fakkels_bakken').then(
			async (response) => {
				return await response.json();
			}
		)
	};
};