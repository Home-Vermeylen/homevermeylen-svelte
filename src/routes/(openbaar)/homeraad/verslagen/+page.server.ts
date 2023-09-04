export async function load({request, locals}) {
    const academiejaar_query = (new URL(request.url)).searchParams.get('aj');

	const huidig_academiejaar: string = (
		await locals.pb
			.collection('site_instellingen')
			.getFirstListItem("sleutel = 'huidig_academiejaar'")
	).waarde;

	const academiejaren = await locals.pb
		.collection('praesidium_openbaar')
		.getFullList()
		.then((res: any) =>
			res.map((val: any) => {
				return val.academiejaar;
			})
		);
    
    const verslagen =  locals.pb
    .collection('verslagen')
    .getList(undefined, undefined, {
      filter: `praesidium.academiejaar =  "${academiejaar_query ?? huidig_academiejaar}"`,
    })
    .then((res: any) => {
      return res.items.map((a: any) => {
        return {
            ...a,
            created: new Date(a.created),
            verslag: locals.pb.files.getUrl(a, a.verslag),
          };
        });
    });

    return {
        huidig_academiejaar,
        academiejaar_query,
        academiejaren,
        verslagen
    }
}