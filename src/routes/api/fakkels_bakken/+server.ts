import { FakkelsBakkenSchema } from "$lib/schemas";
import { json } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { actionResult, superValidate } from "sveltekit-superforms/server";

export async function GET({ locals }) {
	const praesidiumleden = await locals.pb
		.collection('praesidium_leden')
		.getFullList({
			filter: `praesidium.id = "${locals.praesidium?.id}"`,
			fields: 'voornaam, familienaam, bakken, fakkels, id'
		});

	return json(praesidiumleden);
}

export async function POST(event) {
	const origineleData = await event.request.clone().formData();

	const form = await superValidate(event, zod(FakkelsBakkenSchema));

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	try {
		await event.locals.pb.collection('praesidium_leden').update(form.data.id, { fakkels: origineleData.get('fakkels'), bakken: origineleData.get('bakken')});
	} catch (err) {
		return actionResult('error', { form }, 500);
	}

	return actionResult('success', { form }, 200);
}