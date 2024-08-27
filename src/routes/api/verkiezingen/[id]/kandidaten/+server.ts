import { KandidaatSchema } from "$lib/schemas.js";
import { actionResult, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const POST = async (event) => {

    const origineleData = await event.request.clone().formData();

    const form = await superValidate(event, zod(KandidaatSchema));

    if (!form.valid) {
        return actionResult('failure', { form }, 400);
    }


    let opties_object = [
        { titel: 'Voor', stemmen: 0 },
        { titel: 'Tegen', stemmen: 0 }
    ]

    if (origineleData.get('opties') == 'standaard') {
        opties_object = [
            { titel: 'Voor', stemmen: 0 },
            { titel: 'Tegen', stemmen: 0 },
            { titel: 'Onthouden', stemmen: 0 }
        ];
    }

    try {
        const verkiezing = await event.fetch(`/api/verkiezingen/${event.params.id}`).then(async (r) => await r.json());

        const kandidaten = [...verkiezing.kandidaten, {
            id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }),
            voornaam: origineleData.get('voornaam'),
            familienaam: origineleData.get('familienaam'),
            ambitie: origineleData.get('ambitie'),
            opties: opties_object,
            status: 'onzichtbaar',
            gestemd: []
        }];

        await event.locals.pb.collection('verkiezingen').update(event.params.id, { ...verkiezing, kandidaten });
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

        const kandidaten = verkiezing.kandidaten.filter(n => n.id != id);

        await event.locals.pb.collection('verkiezingen').update(event.params.id, { ...verkiezing, kandidaten });
    } catch (err) {
        return actionResult('error', { status: 500 });
    }

    return actionResult('success', { status: 200 });

}