import type { Augustje } from '$lib/types.js';
import type { ListResult, Record } from 'pocketbase';

export async function load({ request, locals }) {
	const academiejaar_query = new URL(request.url).searchParams.get('aj');

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

	const augustjes = locals.pb
		.collection('augustjes')
		.getList(undefined, undefined, {
			filter: `praesidium.academiejaar =  "${academiejaar_query ?? huidig_academiejaar}"`
		})
		.then((res: ListResult<Augustje>) => {
			return [].slice.call(res.items.map((a) => {
				return {
					...a,
					created: new Date(a.created),
					bestand: locals.pb.files.getUrl(a, a.bestand)
				};
			})).sort((a: Augustje, b: Augustje) => {
				return b.created.getTime() - a.created.getTime();
			});
		});

	return {
		huidig_academiejaar,
		academiejaar_query,
		academiejaren,
		augustjes
	};
}
