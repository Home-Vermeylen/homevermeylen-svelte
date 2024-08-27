import { LoginGebruikerSchema, ProfielSchema } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async ({ locals }) => {
	return {
		functie_id: locals.pb.authStore.isValid ? locals.pb.authStore.model?.id : '',
	  login_data: await superValidate(zod(LoginGebruikerSchema)),
	  profiel_form: await superValidate(zod(ProfielSchema)),
	  praesidium_leden: await locals.pb.collection('praesidium_leden').getFullList({ filter: `praesidium = '${locals.praesidium?.id}'`, expand: 'functie' }).then(r => r.map(l => ({...l, avatar: locals.pb.files.getUrl(l, l.avatar)})))
	};
  };