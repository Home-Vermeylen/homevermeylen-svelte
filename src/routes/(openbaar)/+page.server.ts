import { LoginGebruikerSchema } from '$lib/schemas.js';
import { fail, type Actions } from '@sveltejs/kit';
import { message, superValidate, type Infer } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export type Message = { status: 'error' | 'success' | 'warning'; text: string };

export const actions: Actions = {
	default: async (event) => {
	  const login_form = await superValidate<Infer<typeof LoginGebruikerSchema>, Message>(event, zod(LoginGebruikerSchema));
	  if (!login_form.valid) {
		return fail(400, {
		  login_form,
		});
	  }

	  try {
		await event.locals.pb.collection('functies').authWithPassword(login_form.data.gebruikersnaam, login_form.data.wachtwoord);
	  } catch(_) {
		return message(login_form, { status: 'error', text: 'Verkeerde inloggegevens' }, {status: 401})
	  }

	  return {
		login_form,
	  };
	},
  };

