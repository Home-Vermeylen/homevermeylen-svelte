import { VerkiezingenSchema } from "$lib/schemas";
import { json } from "@sveltejs/kit";
import { actionResult, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const GET = async ({ locals }) => {
    return json(
        await locals.pb
            .collection('verkiezingen')
            .getFullList({
                filter: `praesidium = '${locals.praesidium?.id}'`,
                sort: '-created'
            }
            ).then(n => n.map(r => ({ ...r, created: new Date(r.created) }))));
}

export const POST = async ({ request, locals }) => {
    const origineleData = await request.clone().formData();

    const form = await superValidate(request, zod(VerkiezingenSchema));


    if (!form.valid) {
        return actionResult('failure', { form }, 400);
    }

    try {
        await locals.pb.collection('verkiezingen').create({
            naam: origineleData.get('naam'),
            stemgerechtigde_homeraadsleden: [],
            toegangscodes: [],
            stemmingen: [],
            praesidium: locals.praesidium?.id,
            actief: false
        });
    } catch (err) {
        return actionResult('error', { form }, 500);
    }

    return actionResult('success', { form }, 200);
};


