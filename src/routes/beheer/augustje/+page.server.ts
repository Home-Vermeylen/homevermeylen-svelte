import { AugustjesSchema, VerslagSchema } from '$lib/schemas.js';
import type { Augustje } from '$lib/types.js';
import { serializeNonPOJOs, valideerData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';
import type { ListResult } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ request, locals }: { request: any; locals: any }) {
	const huidig_academiejaar: string = (
		await locals.pb
			.collection('site_instellingen')
			.getFirstListItem("sleutel = 'huidig_academiejaar'")
	).waarde;

	const augustjes = await locals.pb
		.collection('augustjes')
		.getList(undefined, undefined, { filter: `praesidium.academiejaar = "${huidig_academiejaar}"` })
		.then((res: ListResult<Augustje>) => {
			return res.items.map((a) => {
				return serializeNonPOJOs({
					...a,
					bestand: locals.pb.files.getUrl(a, a.bestand)
				});
			});
		});

	const form = superValidate(AugustjesSchema);
	return { augustjes, form };
}

export const actions = {
	update: async ({ request, locals }) => {
		const origineleData = await request.clone().formData();

		const form = await superValidate(origineleData, AugustjesSchema);

		if (!form.valid) {
			return fail(400, {form});
		}

		if ((origineleData.get('bestand') as any).size == 0) {
			origineleData.delete('bestand');
		}


		try {
			if (form.data.id) {
				await locals.pb.collection('augustjes').update(form.data.id, origineleData);
			} else {
				await locals.pb.collection('augustjes').create(origineleData);
			}
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het publiceren van het Augustje.');
		}

		return { form };
	},
	verwijder: async ({ request, locals }) => {
		const data = await request.formData();

		try {
			await locals.pb.collection('augustjes').delete(data.get('id'));
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het verwijderen van het Augustje.');
		}
	}
};
