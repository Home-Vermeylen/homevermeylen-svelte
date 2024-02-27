import { BakkenSchema, FakkelSchema } from '$lib/schemas.js';
import { serializeNonPOJOs, valideerData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from "sveltekit-superforms/server";

export async function load({ fetch, locals }) {
	const praesidium_leden = await locals.pb
		.collection('praesidium')
		.getOne(locals.user?.expand?.praesidiumlid?.praesidium, {
			expand: 'praesidium_leden, praesidium_leden.gebruiker'
		})
		.then((p: any) => {
			return p.expand.praesidium_leden;
		});

	const BakkenForm = await superValidate(BakkenSchema, { id: "bakken" });
	const FakkelsForm = await superValidate(FakkelSchema, { id: "fakkels" });

	return { bakken: fetch('/api/bakken', { method: 'GET' }).then((res) => (res.json())), fakkels: fetch('/api/fakkels', { method: 'GET' }).then((res) => (res.json())), praesidium_leden: serializeNonPOJOs(praesidium_leden), BakkenForm, FakkelsForm };
}

