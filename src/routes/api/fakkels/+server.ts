import { FakkelSchema } from "$lib/schemas.js";
import { json } from "@sveltejs/kit";
import { actionResult, superValidate } from "sveltekit-superforms/server";

export async function GET({ locals }) {
    const fakkels = await locals.pb
		.collection('fakkels')
		.getFullList({
			filter: `praesidium.academiejaar = "${locals.academiejaar}"`,
			expand: 'gebruiker'
		});
    
    return json(fakkels);
}

export async function POST({locals, request}) {
    const origineleData = await request.clone().formData();

		const form = await superValidate(request, FakkelSchema);

		if (!form.valid) {
			return actionResult('failure', {form}, 400);
		}

		if (Number(form.data.aantal) < 0) {
			return actionResult('failure', {form}, 400);
		}

		try {
			if (form.data.id) {
				await locals.pb.collection('fakkels').update(form.data.id, origineleData);
			} else {
				await locals.pb.collection('fakkels').create(origineleData);
			}
		} catch (err) {
			return actionResult('error', {form}, 500);
		}

		return actionResult('success', {form}, 200);
}