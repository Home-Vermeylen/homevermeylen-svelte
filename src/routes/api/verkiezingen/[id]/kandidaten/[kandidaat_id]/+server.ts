import { actionResult } from "sveltekit-superforms";

export const POST = async (event) => {
    const origineleData = await event.request.clone().formData();

    console.log(origineleData);
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

        const kandidaten = verkiezing.kandidaten.map((n) => {
            if (n.id === event.params.kandidaat_id) {
                if (origineleData.get('status')) {
                    console.log(event.params.id, origineleData)
                    return { ...n, status: origineleData.get('status') }
                } else {
                    return { ...n, naam: origineleData.get('naam') ?? n.naam, ambitie: origineleData.get('ambitie') ?? n.ambitie };
                }

            } else {
                return n;
            }
        })

        await event.locals.pb.collection('verkiezingen').update(event.params.id, { ...verkiezing, kandidaten });
    } catch (err) {
        return actionResult('error');
    }

    return actionResult('success');

}
