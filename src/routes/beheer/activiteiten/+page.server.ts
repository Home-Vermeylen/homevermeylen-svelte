import { ActiviteitSchema, VerwijderActiviteitSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ fetch }) {
	return {
		activiteiten_promise: fetch('/api/activiteiten').then(async (data) => {
			return await data
				.json()
				.then((a) => [...a.opkomende_activiteiten, ...a.afgelopen_activiteiten]);
		}),
		activiteiten_form: await superValidate(zod(ActiviteitSchema)),
		verwijder_activiteit_form: await superValidate(zod(VerwijderActiviteitSchema))
	};
}

export const actions = {
	verwijder_activiteit: async ({ fetch, request, locals }) => {
		const origineleData = await request.clone().formData();
		const form = await superValidate(request, zod(VerwijderActiviteitSchema));


		if (!form.valid) {
			return message(form, 'ID niet correct');
		}

		try {
			await locals.pb.collection('activiteiten').delete(origineleData.get('id'));
		} catch {
			return message(form, 'Fout bij verwijderen activiteit', { status: 500 })
		}
		return message(form, 'ID correct', { status: 200 })
	}
}
