import { VerkiezingenSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { sorteer_door_functie } from '$lib/utils/functieSort';
import type { PageServerLoad } from './$types';

type PraesidiumLidMetFunctie = {
	expand?: {
		functie?: {
			username: string;
		};
	};
};

export const load: PageServerLoad = async ({ params, fetch, locals }) => {
	const leden = (await locals.pb.collection('praesidium_leden').getFullList({
		filter: `praesidium.academiejaar = '${locals.praesidium?.academiejaar}'`,
		expand: 'functie'
	})) as PraesidiumLidMetFunctie[];

	const praesidium_leden = leden
		.sort((a, b) =>
			sorteer_door_functie(
				a.expand?.functie?.username?.replace(/[0-9]/g, '') ?? '',
				b.expand?.functie?.username?.replace(/[0-9]/g, '') ?? ''
			)
		)
		.map((lid) => ({ ...lid }));

	return {
		breadcrumb: {
			label: 'Verkiezingen',
			href: '/beheer/verkiezingen'
		},
		verkiezing_promise: fetch(`/api/verkiezingen/${params.id}`).then((r) => r.json()),
		form: await superValidate(zod4(VerkiezingenSchema)),
		praesidium_leden
	};
};