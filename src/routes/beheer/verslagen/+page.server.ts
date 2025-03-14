import { VerslagSchema, VerwijderVerslagSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ fetch }) {
	return {
		verslagen_promise: fetch('/api/verslagen').then(async (data) => {
			return await data.json();
		}),
		verslagen_form: await superValidate(zod(VerslagSchema)),
		verwijder_verslagen_form: await superValidate(zod(VerwijderVerslagSchema))
	};
}

export const actions = {
	verwijder_verslag: async ({ fetch, request, locals }) => {
		const origineleData = await request.clone().formData();
		const form = await superValidate(request, zod(VerwijderVerslagSchema));


		if (!form.valid) {
			return message(form, 'ID niet correct');
		}

		try {
			await locals.pb.collection('verslagen').delete(origineleData.get('id'));
		} catch {
			return message(form, 'Fout bij verwijderen verslag', { status: 500 })
		}
		return message(form, 'ID correct', { status: 200 })
	}
}
