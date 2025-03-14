import { KandidaatSchema, VerwijderKandidaatSchema } from "$lib/schemas"
import { message, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async ({ params, fetch }) => {
    return {
        verkiezing: fetch(`/api/verkiezingen/${params.id}`).then(r => r.json()),
        form: await superValidate(zod(KandidaatSchema)),
        verwijder_kandidaat_form: await superValidate(zod(VerwijderKandidaatSchema))
    }
}

export const actions = {
    verwijder_kandidaat: async ({ fetch, request, locals, params }) => {
        const origineleData = await request.clone().formData();
        const form = await superValidate(request, zod(VerwijderKandidaatSchema));


        if (!form.valid) {
            return message(form, 'ID niet correct');
        }


        const verkiezing = await fetch(`/api/verkiezingen/${params.id}`).then(r => r.json())

        try {
            await locals.pb.collection('verkiezingen').update(params.id, {
                kandidaten: verkiezing.kandidaten.filter((a) => { return a.id != origineleData.get('kandidaat_id') })
            });
        } catch {
            return message(form, 'Fout bij verwijderen kandidaat', { status: 500 })
        }
        return message(form, 'ID correct', { status: 200 })
    }
}
