import { ActiviteitSchema, VerwijderActiviteitenSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ fetch }) {
	return {
		activiteiten_promise: fetch('/api/activiteiten').then(async (data) => {
			return await data
				.json()
				.then((a) => [...a.opkomende_activiteiten, ...a.afgelopen_activiteiten]);
		}),
		activiteiten_form: await superValidate(zod(ActiviteitSchema)),
		verwijder_activiteiten_form: await superValidate(zod(VerwijderActiviteitenSchema))
	};
}
