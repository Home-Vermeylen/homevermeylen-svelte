import type { PubliekeActiviteit } from '$lib/types.js';
import type { Record } from 'pocketbase';

export async function load({ request, locals }) {
	return {
		activiteiten: (await locals.pb
			.collection('activiteiten_openbaar')
			.getList()
			.then((res: Record) => {
				return res.items.map((a: any) => {
					return {
						...a,
						banner: locals.pb.files.getUrl(a, a.banner),
						datum: new Date(a.datum)
					} as PubliekeActiviteit;
				});
			})) as PubliekeActiviteit[]
	};
}
