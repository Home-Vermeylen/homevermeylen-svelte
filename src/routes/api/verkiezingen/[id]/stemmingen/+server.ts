import { StemmingSchema } from "$lib/schemas.js";
import { actionResult, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { v4 } from "uuid";

export const POST = async (event) => {
    
    const origineleData = await event.request.clone().formData();
    const form = await superValidate(event, zod(StemmingSchema));

    if (!form.valid) {
        return actionResult('failure', { form }, 400);
    }

    let opties = origineleData.get('opties_str').split(', ');

    if (opties.length == 0) {
        return actionResult('failure', { form }, 400);
    } else {
        opties = opties.map(optie => ({
            id: v4(),
            naam: optie.trim(),
            stemmen: 0
        }))
    }

    try {
        const verkiezing = await event.fetch(`/api/verkiezingen/${event.params.id}`).then(async (r) => await r.json());

        const stemmingen = [...verkiezing.stemmingen, {
            id: v4(),
            naam: origineleData.get('naam'),
            opties: opties,
            status: 'onzichtbaar',
            gestemd: []
        }];

        await event.locals.pb.collection('verkiezingen').update(event.params.id, { ...verkiezing, stemmingen });
    } catch (err) {
        return actionResult('error', { form }, 500);
    }

    return actionResult('success', { form }, 200);

}

export const DELETE = async (event) => {
    const origineleData = event.request.clone();

    const id = (await event.request.clone().json()).id;

    try {
        const verkiezing = await event.fetch(`/api/verkiezingen/${event.params.id}`).then(async (r) => await r.json());

        const stemmingen = verkiezing.stemmingen.filter(n => n.id != id);

        await event.locals.pb.collection('verkiezingen').update(event.params.id, { ...verkiezing, stemmingen });
    } catch (err) {
        return actionResult('error', { status: 500 });
    }

    return actionResult('success', { status: 200 });

}
