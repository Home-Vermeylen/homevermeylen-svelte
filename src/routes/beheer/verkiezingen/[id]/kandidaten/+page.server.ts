import { KandidaatSchema } from "$lib/schemas"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async ({ params, fetch }) => {
    return {
        verkiezing: fetch(`/api/verkiezingen/${params.id}`).then(r => r.json()),
        form: await superValidate(zod(KandidaatSchema))
    }
}