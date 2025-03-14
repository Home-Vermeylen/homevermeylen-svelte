import { VerkiezingenSchema } from '$lib/schemas';
import { json } from '@sveltejs/kit';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
    try {
        return json(await locals.pb.collection('verkiezingen').getOne(params.id));
    } catch {
        return actionResult('error', undefined, { status: 404 });
    }
};

export const POST: RequestHandler = async (event) => {
    const origineleData = await event.request.clone().formData();

    const form = await superValidate(event, zod(VerkiezingenSchema));

    if (!form.valid) {
        return actionResult('failure', { form }, 400);
    }

    try {
        const verkiezing = await event.fetch(`/api/verkiezingen/${event.params.id}`).then(async (r) => await r.json());

        console.log(origineleData)
        await event.locals.pb.collection('verkiezingen').update(event.params.id, { ...verkiezing, naam: origineleData.has('naam') ? origineleData.get('naam') : verkiezing.naam, actief: origineleData.has('actief') ? (origineleData.get('actief') == 'on' ? true : false) : false, stemgerechtigde_functies: origineleData.get('geselecteerde_functies')?.toString().split(',') });
    } catch (err) {
        return actionResult('error', { form }, 500);
    }

    return actionResult('success', { form }, 200);
};


