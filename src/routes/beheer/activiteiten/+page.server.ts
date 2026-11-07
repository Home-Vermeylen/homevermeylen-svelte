import { ActiviteitSchema, VerwijderActiviteitSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		breadcrumb: {
			label: 'Activiteiten',
			href: '/beheer/activiteiten'
		},
		activiteiten_promise: fetch('/api/activiteiten').then(async (response) => {
			return await response
				.json()
				.then((a) => [...a.opkomende_activiteiten, ...a.afgelopen_activiteiten]);
		}),
		activiteiten_form: await superValidate(zod4(ActiviteitSchema)),
		verwijder_activiteit_form: await superValidate(zod4(VerwijderActiviteitSchema))
	};
};

export const actions: Actions = {
	verwijder_activiteit: async ({ request, locals }) => {
		const origineleData = await request.clone().formData();
		const form = await superValidate(request, zod4(VerwijderActiviteitSchema));

		if (!form.valid) {
			return message(form, { text: 'ID niet correct', type: 'error' });
		}

		try {
			await locals.pb.collection('activiteiten').delete(String(origineleData.get('id')));
		} catch {
			return message(form, {
				text: 'Fout bij verwijderen activiteit',
				type: 'error'
			});
		}

		return message(form, {
			text: 'ID correct',
			type: 'success'
		});
	}
};