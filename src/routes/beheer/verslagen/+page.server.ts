import { VerslagSchema, VerwijderVerslagenSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ fetch }) {
	return {
		verslagen_promise: fetch('/api/verslagen').then(async (data) => {
			return await data.json();
		}),
		verslagen_form: await superValidate(zod(VerslagSchema)),
		verwijder_verslagen_form: await superValidate(zod(VerwijderVerslagenSchema))
	};
}
