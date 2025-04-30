import { StemmingSchema, VerwijderStemmingSchema } from "$lib/schemas"
import { message, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async ({ params, fetch }) => {
    return {
        verkiezing: fetch(`/api/verkiezingen/${params.id}`).then(r => r.json()),
        form: await superValidate(zod(StemmingSchema)),
        verwijder_stemming_form: await superValidate(zod(VerwijderStemmingSchema))
    }
}

export const actions = {
    verwijder_stemming: async ({ fetch, request, locals, params}) => {
        const origineleData = await request.clone().formData();
        const form = await superValidate(request, zod(VerwijderStemmingSchema));
        const verkiezing = await fetch(`/api/verkiezingen/${params.id}`).then(r => r.json());

        if (!form.valid) {
            return message(form, 'ID niet correct');
        }

        try {
            await locals.pb.collection('verkiezingen').update(params.id, {
                stemmingen: verkiezing.stemmingen.filter((a) => { return a.id != origineleData.get('stemming_id') })
            });

        } catch {
            return message(form, 'Fout bij verwijderen stemming', { status: 500 })
        }
        return message(form, 'ID correct', { status: 200 })
    }
}
