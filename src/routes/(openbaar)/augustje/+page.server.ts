export async function load({ fetch, locals, url }) {
	const academiejaar_query = new URL(url).searchParams.get('aj');

	let api_url = new URL("/api/augustjes", url.origin);
	if (academiejaar_query) {
		api_url.searchParams.set("aj", academiejaar_query);
	}
	
	const academiejaren = locals.pb
		.collection('praesidium_openbaar')
		.getFullList()
		.then((res: any) =>
			res.map((val: any) => {
				return val.academiejaar;
			})
		);

	return { augustjes: fetch(api_url, {method: "GET"}).then(async (data) => { return data.json()}), academiejaar: locals.academiejaar, academiejaren, academiejaar_query }
}
