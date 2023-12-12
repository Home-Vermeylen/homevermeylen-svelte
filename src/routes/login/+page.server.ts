import { LoginGebruikerSchema } from '$lib/schemas.js';
import { valideerData } from '$lib/utils.js';
import { error, redirect, fail } from '@sveltejs/kit';

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
		} catch (err: any) {
			throw error(err.status, err.message);
		}

		throw redirect(303, '/');
	}
};
