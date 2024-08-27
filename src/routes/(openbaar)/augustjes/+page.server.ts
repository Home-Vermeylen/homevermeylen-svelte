export async function load({ fetch, locals, url }) {
	const academiejaar_query = new URL(url).searchParams.get('aj');

	const api_url = new URL("/api/augustjes", url.origin);
	if (academiejaar_query) {
		api_url.searchParams.set("aj", academiejaar_query);
	}
	
	const academiejaren = locals.pb
		.collection('praesidia')
		.getFullList({ fields: 'academiejaar', sort: '-academiejaar' }).then(r => r.map(p => p.academiejaar));

	return { augustjes: fetch(api_url, {method: "GET"}).then(async (data) => { return data.json()}), academiejaar: locals.praesidium?.academiejaar, academiejaren, academiejaar_query }
}
