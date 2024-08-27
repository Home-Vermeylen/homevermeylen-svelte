import { StemSchema } from '$lib/schemas';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ fetch, params }) => {
    let verkiezingen = await fetch('/api/verkiezingen').then(
        a => a.json()
            .then(
                b => b.filter(
                    c => c.toegangscodes.find((d) => d == params.uuid)
                )
            )
    );

    if (verkiezingen.length == 0) {
        return error(403, {message: 'Ongeldige toegangscode'})
    }

    return {
        stemmer_id: params.uuid,
        verkiezingen,
        stem_form: await superValidate(zod(StemSchema))
    }
}