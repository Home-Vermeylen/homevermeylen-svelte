import { serializeNonPOJOs } from "$lib/utils";

export async function load({request, locals}) {
    const huidig_academiejaar: string = (
		await locals.pb
			.collection('site_instellingen')
			.getFirstListItem("sleutel = 'huidig_academiejaar'")
	).waarde;

    const augustjes = await locals.pb
    .collection('augustjes')
    .getList(undefined, undefined, { filter: `praesidium.academiejaar = "${huidig_academiejaar}"` })
    .then((res: any) => {
      return res.items.map((a: any) => {
        return serializeNonPOJOs({
            ...a,
            augustje: locals.pb.files.getUrl(a, a.augustje),
          }
        );
      });
    });

    return {augustjes};
}

export const actions = {
  updateAugustje: async ({request, locals}) => {
    let data: any = await request.formData();

    try {
      await locals.pb.collection('augustjes').update(data.id, data);
    } catch (e) {
      console.log(e);
    }
  }
}