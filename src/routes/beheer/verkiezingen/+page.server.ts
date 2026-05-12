import { VerkiezingenSchema, VerwijderVerkiezingenSchema } from '$lib/schemas.js';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult, message, superValidate } from 'sveltekit-superforms/server';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, locals }) => {
    const user = locals.pb.authStore.model;

    if (!user) {
        redirect(303, '/login');
    }

    const recentsteAcademiejaar = await locals.pb
    .collection('praesidia')
    .getFirstListItem('', { sort: '-academiejaar' });

    const praesidiumLid = await locals.pb
    .collection('praesidium_leden')
    .getFirstListItem(`functie = "${user.id}" && praesidium = "${recentsteAcademiejaar.id}"`);

    if (!praesidiumLid?.kiescomite) {
        redirect(303, '/');
    }

    return {
        verkiezingen_promise: fetch('/api/verkiezingen').then(async (data) => data.json()),
        form: await superValidate(zod(VerkiezingenSchema)),
        verwijder_form: await superValidate(zod(VerwijderVerkiezingenSchema))
    }
};

export const actions = {
    verwijder_verkiezing: async ({ fetch, request, locals }) => {
        const origineleData = await request.clone().formData();
        const form = await superValidate(request, zod(VerwijderVerkiezingenSchema));


        if (!form.valid) {
            return message(form, 'ID niet correct');
        }

        try {
            await locals.pb.collection('verkiezingen').delete(origineleData.get('id'));
        } catch {
            return message(form, 'Fout bij verwijderen verkiezing', { status: 500 })
        }
        return message(form, 'ID correct', { status: 200 })
    }
}
