import { AugustjesSchema, VerwijderAugustjeSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		breadcrumb: {
			label: 'Augustjes',
			href: '/beheer/augustjes'
		},
		augustjes_promise: fetch('/api/augustjes').then(async (response) => {
			return await response.json();
		}),
		augustjes_form: await superValidate(zod4(AugustjesSchema)),
		verwijder_augustje_form: await superValidate(zod4(VerwijderAugustjeSchema))
	};
};

export const actions: Actions = {
	verwijder_augustje: async ({ request, locals }) => {
		const origineleData = await request.clone().formData();
		const form = await superValidate(request, zod4(VerwijderAugustjeSchema));

		if (!form.valid) {
			return message(form, {
				text: 'ID niet correct',
				type: 'error'
			});
		}

		try {
			await locals.pb
				.collection('augustjes')
				.delete(String(origineleData.get('id')));
		} catch {
			return message(
				form,
				{
					text: 'Fout bij verwijderen Augustje',
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