import { LoginGebruikerSchema } from '$lib/schemas.js';
import { valideerData } from '$lib/utils.js';
import { fail, redirect } from '@sveltejs/kit';
import { actionResult } from 'sveltekit-superforms';

export const actions = {
	login: async ({ request, locals }) => {
	console.log('LOGINACTIE WORDT UITGEVOERD');
		const { formData, errors } = await valideerData(await request.formData(), LoginGebruikerSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const authData = await locals.pb
	.collection('functies')
	.authWithPassword(formData.gebruikersnaam, formData.wachtwoord);

console.log('Loginresultaat:', {
	isValid: locals.pb.authStore.isValid,
	username: locals.pb.authStore.model?.username,
	heeftToken: !!authData.token,
	tokenLengte: authData.token?.length
});
		} catch (_) {
			return actionResult("error");
		}

		redirect(303, '/');
	}
};
