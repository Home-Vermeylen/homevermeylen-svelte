import { StemSchema } from "$lib/schemas.js";
import { actionResult, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export async function POST(event) {
    const origineleData = await event.request.clone().formData();

    const form = await superValidate(event, zod(StemSchema));

    if (!form.valid) {
        form.message = { type: 'error', text: 'Stemmen mislukt!' };

        return actionResult('failure', { form }, 400);
    }

    try {
        const verkiezing = await event.locals.pb.collection('verkiezingen').getOne(form.data.verkiezing_id);;

        const stemmingen = verkiezing.stemmingen.map((a) => {
            if (a.id == form.data.stemming_id) {
                return {
                    ...a, 
                    opties: a.opties.map((b) => {
                        if (b.id === form.data.optie) {    
                            return { ...b, stemmen: b.stemmen + 1 }
                        }

                        return b;
                    }
                    ), 
                    gestemd: [...a.gestemd, form.data.stemmer_id]
                }
            }

            return a;
        })

        await event.locals.pb.collection('verkiezingen').update(form.data.verkiezing_id, {stemmingen});
    } catch (err) {
        form.message = { type: 'error', text: 'Stemmen mislukt!' };
        return actionResult('error', { form }, 500);
    }

    form.message = { type: 'success', text: 'Stemmen gelukt!' };
    return actionResult('success', { form }, 200);
}
