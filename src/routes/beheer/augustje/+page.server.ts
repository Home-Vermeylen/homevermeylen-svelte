import { AugustjesSchema, VerslagSchema } from '$lib/schemas.js';
import { serializeNonPOJOs, valideerData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';

export async function load({ request, locals }: { request: any; locals: any }) {
	const huidig_academiejaar: string = (
		await locals.pb
			.collection('site_instellingen')
			.getFirstListItem("sleutel = 'huidig_academiejaar'")
	).waarde;

	const augustjes = await locals.pb
		.collection('augustjes')
		.getList(undefined, undefined, { filter: `praesidium.academiejaar = "${huidig_academiejaar}"` })
		.then((res: any) => {
			return res.items.map((a: any) => {
				return serializeNonPOJOs({
					...a,
					augustje: locals.pb.files.getUrl(a, a.augustje)
				});
			});
		});

	return { augustjes };
}

export const actions = {
	update: async ({ request, locals }) => {
		const origineleData = await request.formData();

		const { formData, errors } = await valideerData(origineleData, AugustjesSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		if ((origineleData.get('augustje') as any).size == 0) {
			origineleData.delete('augustje');
		}

		try {
			if (formData.id) {
				await locals.pb.collection('augustjes').update(formData.id, origineleData);
			} else {
				await locals.pb.collection('augustjes').create(origineleData);
			}
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het publiceren van het Augustje.');
		}
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
