export async function load({ fetch }) {
	return { netwerk: fetch("/api/vriendschapsnetwerk").then(async (data) => { return data.json()}) }
}

