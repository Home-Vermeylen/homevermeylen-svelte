import { VerslagSchema } from '$lib/schemas.js';
import type { Augustje } from '$lib/types.js';
import { serializeNonPOJOs, valideerData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';
import type { ListResult } from 'pocketbase';

export async function load({ request, locals }: { request: any; locals: any }) {
	const huidig_academiejaar: string = (
		await locals.pb
			.collection('site_instellingen')
			.getFirstListItem("sleutel = 'huidig_academiejaar'")
	).waarde;

	const verslagen = await locals.pb
		.collection('verslagen')
		.getList(undefined, undefined, { filter: `praesidium.academiejaar = "${huidig_academiejaar}"` })
		.then((res: ListResult<Augustje>) => {
			return res.items.map((v) => {
				return serializeNonPOJOs({
					...v,
					bestand: locals.pb.files.getUrl(v, v.bestand)
				});
			});
		});

	return { verslagen };
}

export const actions = {
	update: async ({ request, locals }) => {
		const origineleData = await request.formData();

		const { formData, errors } = await valideerData(origineleData, VerslagSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		if ((origineleData.get('bestand') as any).size == 0) {
			origineleData.delete('bestand');
		}

		try {
			if (formData.id) {
				await locals.pb.collection('verslagen').update(formData.id, origineleData);
			} else {
				await locals.pb.collection('verslagen').create(origineleData);
			}
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het publiceren van het verslag');
		}
	},
	verwijder: async ({ request, locals }) => {
		const data = await request.formData();

		try {
			await locals.pb.collection('verslagen').delete(data.get('id'));
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het verwijderen van het verslag');
		}
	}
};
