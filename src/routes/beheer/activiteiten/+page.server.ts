import { ActiviteitSchema } from '$lib/schemas.js';

import { superValidate } from 'sveltekit-superforms/server';

export async function load({ fetch }) {
	const form = await superValidate(ActiviteitSchema);

	return {
		activiteiten: fetch('/api/activiteiten', { method: 'GET' }).then(async (data) => {
			return data.json();
		}),
		form
	};
}
