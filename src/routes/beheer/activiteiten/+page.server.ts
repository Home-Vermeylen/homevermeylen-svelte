import { serializeNonPOJOs } from '$lib/utils.js';

export async function load({request, locals}) {
    const huidig_academiejaar: string = (
		await locals.pb
			.collection('site_instellingen')
			.getFirstListItem("sleutel = 'huidig_academiejaar'")
	).waarde;

    const activiteiten = await locals.pb
    .collection('activiteiten')
    .getList(undefined, undefined, { filter: `praesidium.academiejaar = "${huidig_academiejaar}"` })
    .then((res: any) => {
      return res.items.map((a: any) => {
        return serializeNonPOJOs({
            ...a,
            banner: locals.pb.files.getUrl(a, a.banner),
          }
        );
      });
    });

    return {activiteiten};
}