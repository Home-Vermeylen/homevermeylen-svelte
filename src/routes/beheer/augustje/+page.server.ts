import { AugustjesSchema } from '$lib/schemas.js';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ fetch }) {
	const form = superValidate(AugustjesSchema);
	return { augustjes: fetch("/api/augustjes", {method: "GET"}).then(async (data) => { return data.json()}), form };
}
