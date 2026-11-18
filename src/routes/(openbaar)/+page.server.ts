import { LoginGebruikerSchema } from '$lib/schemas.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate, type Infer } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

export type Message = { status: 'error' | 'success' | 'warning'; text: string };

export const actions: Actions = {
	default: async (event) => {
		console.log('DEFAULT ACTION WORDT UITGEVOERD');

		const login_form = await superValidate<
			Infer<typeof LoginGebruikerSchema>,
			Message
		>(event, zod4(LoginGebruikerSchema));

		if (!login_form.valid) {
			console.log('LOGINFORM ONGELDIG:', login_form.errors);

			return fail(400, {
				login_form
			});
		}

		console.log('LOGINFORM GELDIG');

		try {
			console.log('LOGINACTIE: gestart');

			const authData = await event.locals.pb
				.collection('functies')
				.authWithPassword(
					login_form.data.gebruikersnaam,
					login_form.data.wachtwoord
				);

			console.log('LOGINACTIE: succesvol', {
				isValid: event.locals.pb.authStore.isValid,
				username: event.locals.pb.authStore.model?.username,
				heeftToken: !!authData.token,
				tokenLengte: authData.token?.length
			});

			// Tablet gaat rechtstreeks naar de Tablet-startpagina.
			if (event.locals.pb.authStore.model?.username === 'Tablet') {
				throw redirect(303, '/beheer/tablet');
			}
		} catch (err: any) {
			// Een redirect is geen loginfout en moet opnieuw gegooid worden.
			if (err?.status === 303) {
				throw err;
			}

			console.error(
				'LOGINACTIE: mislukt',
				JSON.stringify(err.response, null, 2)
			);

			return message(
				login_form,
				{ status: 'error', text: 'Verkeerde inloggegevens' },
				{ status: 401 }
			);
		}
	}
};