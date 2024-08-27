export async function load({ locals, url }) {
	const academiejaar_query = new URL(url).searchParams.get('aj');

	const api_url = new URL("/api/verslagen", url.origin);
	if (academiejaar_query) {
		api_url.searchParams.set("aj", academiejaar_query);
	}
	
	const academiejaren = await locals.pb
		.collection('praesidia')
		.getFullList({ fields: 'academiejaar', sort: '-academiejaar' }).then(r => r.map(a => a.academiejaar));

	return { verslagen: fetch(api_url, {method: "GET"}).then(async (data) => { return data.json()}), academiejaar: locals.praesidium?.academiejaar, academiejaren, academiejaar_query }
}
