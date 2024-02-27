import { BakkenSchema } from "$lib/schemas";
import { json } from "@sveltejs/kit";
import { actionResult, superValidate } from "sveltekit-superforms/server";

export async function GET({ locals }) {
    const bakken = await locals.pb
		.collection('bakken')
		.getFullList({
			filter: `praesidium.academiejaar = "${locals.academiejaar}"`,
			expand: 'gebruiker'
		});

    return json(bakken);
}

export async function POST({locals, request}) {
    const origineleData = await request.clone().formData();

		const form = await superValidate(request, BakkenSchema);

		if (!form.valid) {
			return actionResult('failure', {form}, 400);
		}

		if (Number(form.data.aantal) < 0) {
			return actionResult('failure', {form}, 400);
		}

		try {
			if (form.data.id) {
				await locals.pb.collection('bakken').update(form.data.id, origineleData);
			} else {
				await locals.pb.collection('bakken').create(origineleData);
			}
		} catch (err) {
			return actionResult('error', {form}, 500);
		}

		return actionResult('success', {form}, 200);
}