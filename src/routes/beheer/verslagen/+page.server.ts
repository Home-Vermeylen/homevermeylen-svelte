import { VerslagSchema } from '$lib/schemas.js';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({fetch}) {
	const form = superValidate(VerslagSchema);
	return { verslagen: fetch("/api/verslagen", {method: "GET"}).then(async (data) => { return data.json()}), form };
}
