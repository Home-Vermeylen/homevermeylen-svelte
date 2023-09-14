export async function load({ request, locals }) {
	return {
		activiteiten: await locals.pb
			.collection('activiteiten_openbaar')
			.getList()
			.then((res: any) => {
				return res.items.map((a: any) => {
					return {
						...a,
						banner: locals.pb.files.getUrl(a, a.banner)
					};
				});
			})
	};
}
