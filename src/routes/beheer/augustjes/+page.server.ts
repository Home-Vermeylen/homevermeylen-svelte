import { AugustjesSchema, VerwijderAugustjeSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ fetch }) {
	return {
		augustjes_promise: fetch('/api/augustjes').then(async (data) => {
			return await data.json();
		}),
		augustjes_form: await superValidate(zod(AugustjesSchema)),
		verwijder_augustje_form: await superValidate(zod(VerwijderAugustjeSchema))
	};
}

export const actions = {
	verwijder_augustje: async ({ fetch, request, locals }) => {
		const origineleData = await request.clone().formData();
		const form = await superValidate(request, zod(VerwijderAugustjeSchema));


		if (!form.valid) {
			return message(form, 'ID niet correct');
		}

		try {
			await locals.pb.collection('augustjes').delete(origineleData.get('id'));
		} catch {
			return message(form, 'Fout bij verwijderen augustje', { status: 500 })
		}
		return message(form, 'ID correct', { status: 200 })
	}
}
