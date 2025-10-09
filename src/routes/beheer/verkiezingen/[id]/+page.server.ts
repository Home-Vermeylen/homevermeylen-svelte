import { VerkiezingenSchema } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { sorteer_door_functie } from "$lib/utils/functieSort";

export const load = async ({ params, fetch, locals }) => {
    // Leden ophalen en sorteren via de gedeelde functie
    const praesidium_leden = await locals.pb
        .collection('praesidium_leden')
        .getFullList({
            filter: `praesidium.academiejaar = '${locals.praesidium?.academiejaar}'`,
            expand: 'functie'
        })
        .then(r =>
            r
                .sort((a, b) =>
                    sorteer_door_functie(
                        a.expand?.functie?.username.replace(/[0-9]/g, ''),
                        b.expand?.functie?.username.replace(/[0-9]/g, '')
                    )
                )
                .map(a => ({ ...a }))
        );

    return {
        verkiezing_promise: fetch(`/api/verkiezingen/${params.id}`).then(r => r.json()),
        form: await superValidate(zod(VerkiezingenSchema)),
        praesidium_leden
    };
};
