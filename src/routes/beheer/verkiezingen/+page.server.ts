import { VerkiezingenSchema, VerwijderVerkiezingenSchema } from '$lib/schemas.js';
import { zod4 } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

type PraesidiumLidMetKiescomite = {
	kiescomite?: boolean;
};

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const user = locals.pb.authStore.model;

	if (!user) {
		redirect(303, '/login');
	}

	const recentsteAcademiejaar = await locals.pb
		.collection('praesidia')
		.getFirstListItem('', { sort: '-academiejaar' });

	const praesidiumLid = await locals.pb
		.collection('praesidium_leden')
		.getFirstListItem(
			`functie = "${user.id}" && praesidium = "${recentsteAcademiejaar.id}"`
		);

	if (!(praesidiumLid as typeof praesidiumLid & PraesidiumLidMetKiescomite).kiescomite) {
		redirect(303, '/');
	}

	return {
		breadcrumb: {
			label: 'Verkiezingen',
			href: '/beheer/verkiezingen'
		},
		verkiezingen_promise: fetch('/api/verkiezingen').then(async (response) => response.json()),
		form: await superValidate(zod4(VerkiezingenSchema)),
		verwijder_form: await superValidate(zod4(VerwijderVerkiezingenSchema))
	};
};

export const actions: Actions = {
	verwijder_verkiezing: async ({ request, locals }) => {
		const user = locals.pb.authStore.model;

		if (!user) {
			redirect(303, '/login');
		}

		const recentsteAcademiejaar = await locals.pb
			.collection('praesidia')
			.getFirstListItem('', { sort: '-academiejaar' });

		const praesidiumLid = await locals.pb
			.collection('praesidium_leden')
			.getFirstListItem(
				`functie = "${user.id}" && praesidium = "${recentsteAcademiejaar.id}"`
			);

		if (!(praesidiumLid as typeof praesidiumLid & PraesidiumLidMetKiescomite).kiescomite) {
			redirect(303, '/');
		}

		const origineleData = await request.clone().formData();
		const form = await superValidate(request, zod4(VerwijderVerkiezingenSchema));

		if (!form.valid) {
			return message(form, {
				text: 'ID niet correct',
				type: 'error'
			});
		}

		try {
			await locals.pb.collection('verkiezingen').delete(String(origineleData.get('id')));
		} catch {
			return message(
				form,
				{
					text: 'Fout bij verwijderen verkiezing',
					type: 'error'
				},
				{ status: 500 }
			);
		}

		return message(form, {
			text: 'ID correct',
			type: 'success'
		});
	}
};