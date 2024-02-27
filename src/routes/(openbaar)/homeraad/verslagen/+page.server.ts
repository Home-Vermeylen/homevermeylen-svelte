export async function load({ locals, url }) {
	const academiejaar_query = new URL(url).searchParams.get('aj');

	let api_url = new URL("/api/verslagen", url.origin);
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

	return { verslagen: fetch(api_url, {method: "GET"}).then(async (data) => { return data.json()}), academiejaar: locals.academiejaar, academiejaren, academiejaar_query }
}
