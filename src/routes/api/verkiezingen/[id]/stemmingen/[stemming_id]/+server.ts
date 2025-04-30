import { actionResult } from "sveltekit-superforms";

export const POST = async (event) => {
    const origineleData = await event.request.clone().formData();

    try {
        const verkiezing = await event.fetch(`/api/verkiezingen/${event.params.id}`).then(async (r) => await r.json());

        const stemmingen = verkiezing.stemmingen.map((n) => {
            if (n.id === event.params.stemming_id) {
                if (origineleData.get('status')) {
                    return { ...n, status: origineleData.get('status') }
                } else {
                    return { ...n, naam: origineleData.get('naam') ?? n.naam };
                }

            } else {
                return n;
            }
        })

        await event.locals.pb.collection('verkiezingen').update(event.params.id, { ...verkiezing, stemmingen });
    } catch (err) {
        return actionResult('error');
    }

    return actionResult('success');

}
