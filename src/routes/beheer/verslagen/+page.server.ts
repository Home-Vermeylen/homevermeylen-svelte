import { serializeNonPOJOs } from "$lib/utils";

export async function load({request, locals}) {
    const huidig_academiejaar: string = (
		await locals.pb
			.collection('site_instellingen')
			.getFirstListItem("sleutel = 'huidig_academiejaar'")
	).waarde;

    const verslagen = await locals.pb
    .collection('verslagen')
    .getList(undefined, undefined, { filter: `praesidium.academiejaar = "${huidig_academiejaar}"` })
    .then((res: any) => {
      return res.items.map((a: any) => {
        return serializeNonPOJOs({
            ...a,
            verslag: locals.pb.files.getUrl(a, a.verslag),
          }
        );
      });
    });

    return {verslagen};
}