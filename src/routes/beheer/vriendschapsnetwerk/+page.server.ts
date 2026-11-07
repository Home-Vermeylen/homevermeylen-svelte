import { NieuweConnectieSchema, NieuwePersoonSchema } from '$lib/schemas.js';
import { zod4 } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		breadcrumb: {
			label: 'Vriendschapsnetwerk',
			href: '/beheer/vriendschapsnetwerk'
		},
		netwerk: fetch('/api/vriendschapsnetwerk').then(async (response) => {
			return await response.json();
		}),
		nieuwe_connectie_form: await superValidate(zod4(NieuweConnectieSchema)),
		nieuwe_persoon_form: await superValidate(zod4(NieuwePersoonSchema))
	};
};