import { sorteer_door_functie } from '$lib/utils/functieSort';

export async function load({ locals, url }) {
	const academiejaar_query = url.searchParams.get('aj');

	// Academiejaren ophalen
	const academiejaren = await locals.pb
		.collection('praesidia')
		.getFullList({ fields: 'academiejaar', sort: '-academiejaar' })
		.then(r => r.map(a => a.academiejaar));

	// Leden ophalen en sorteren
	const praesidium_leden = await locals.pb
		.collection('praesidium_leden')
		.getFullList({
			filter: `praesidium.academiejaar = '${academiejaar_query ?? locals.praesidium?.academiejaar}'`,
			expand: 'functie'
		})
		.then(r =>
			r
				.sort((a, b) =>
					sorteer_door_functie(
						a.expand?.functie?.username.replace(/[0-9]/g, ''),
						b.expand?.functie?.username.replace(/[0-9]/g, '')
					)
				)
				.map(a => ({
					...a,
					avatar: locals.pb.files.getUrl(a, a.avatar)
				}))
		);

	return {
		praesidium_leden,
		academiejaar: locals.praesidium?.academiejaar,
		academiejaar_query,
		academiejaren
	};
}
