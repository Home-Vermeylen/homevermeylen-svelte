import { StemSchema } from '$lib/schemas.js';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async ({ locals, fetch }) => {
    if (locals.pb.authStore.isValid) {
        let verkiezingen = await fetch('/api/verkiezingen').then(
            a => a.json()
                .then(
                    b => b.filter(
                        c => c.stemgerechtigde_functies.find((d) => d == locals.pb.authStore.model?.id) && c.actief == true
                    )
                )
            );

        return {
            functie_id: locals.pb.authStore.isValid ? locals.pb.authStore.model?.id : '',
            verkiezingen,
            stem_form: await superValidate(zod(StemSchema))
        }
    } else {
        redirect(307, '/');
    }

}