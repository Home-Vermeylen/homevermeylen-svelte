import { LoginGebruikerSchema } from '$lib/schemas.js';
import { valideerData } from '$lib/utils.js';
import { fail, redirect } from '@sveltejs/kit';
import { actionResult } from 'sveltekit-superforms';

export const actions = {
	login: async ({ request, locals }) => {
		const { formData, errors } = await valideerData(await request.formData(), LoginGebruikerSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb
				.collection('gebruikers')
				.authWithPassword(formData.gebruikersnaam, formData.wachtwoord);
		} catch (_) {
			return actionResult("error");
		}

		redirect(303, '/');
	}
};
