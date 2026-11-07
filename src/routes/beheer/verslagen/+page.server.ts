import { VerslagSchema, VerwijderVerslagSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

export async function load({ fetch }) {
	return {
		breadcrumb: {
			label: 'Verslagen',
			href: '/beheer/verslagen'
		},
		verslagen_promise: fetch('/api/verslagen').then(async (data) => {
			return await data.json();
		}),
		verslagen_form: await superValidate(zod4(VerslagSchema)),
		verwijder_verslagen_form: await superValidate(zod4(VerwijderVerslagSchema))
	};
}

export const actions = {
	verwijder_verslag: async ({ fetch, request, locals }) => {
		const origineleData = await request.clone().formData();
		const form = await superValidate(request, zod4(VerwijderVerslagSchema));

		if (!form.valid) {
			return message(form, {
				text: 'ID niet correct',
				type: 'error'
			});
		}

		const id = origineleData.get('id');

		if (typeof id !== 'string' || !id) {
			return message(
				form,
				{
					text: 'ID niet correct',
					type: 'error'
				},
				{ status: 400 }
			);
		}

		try {
			await locals.pb.collection('verslagen').delete(id);
		} catch {
			return message(
				form,
				{
					text: 'Fout bij verwijderen verslag',
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