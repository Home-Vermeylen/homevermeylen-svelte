import { AugustjesSchema, VerwijderAugustjesSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ fetch }) {
	return {
		augustjes_promise: fetch('/api/augustjes').then(async (data) => {
			return await data.json();
		}),
		augustjes_form: await superValidate(zod(AugustjesSchema)),
		verwijder_augustjes_form: await superValidate(zod(VerwijderAugustjesSchema))
	};
}
