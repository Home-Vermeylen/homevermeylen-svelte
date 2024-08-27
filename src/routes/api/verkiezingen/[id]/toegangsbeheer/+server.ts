import { actionResult } from "sveltekit-superforms";

export const POST = async (event) => {
    const origineleData = await event.request.clone().formData();

    try {
        const verkiezing = await event.fetch(`/api/verkiezingen/${event.params.id}`).then(async (r) => await r.json());

        verkiezing.toegangscodes.push(origineleData.get('code'));

        await event.locals.pb.collection('verkiezingen').update(event.params.id, { ...verkiezing });
    } catch (err) {
        return actionResult('error');
    }

    return actionResult('success');

}
