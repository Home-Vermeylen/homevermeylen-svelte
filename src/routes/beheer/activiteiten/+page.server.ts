import { ActiviteitSchema, AugustjesSchema, VerslagSchema } from '$lib/schemas.js';
import { serializeNonPOJOs, valideerData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';

export async function load({ request, locals }: { request: any; locals: any }) {
	const huidig_academiejaar: string = (
		await locals.pb
			.collection('site_instellingen')
			.getFirstListItem("sleutel = 'huidig_academiejaar'")
	).waarde;

	const activiteiten = await locals.pb
		.collection('activiteiten')
		.getList(undefined, undefined, { filter: `praesidium.academiejaar = "${huidig_academiejaar}"` })
		.then((res: any) => {
			return res.items.map((a: any) => {
				return serializeNonPOJOs({
					...a,
					banner: locals.pb.files.getUrl(a, a.banner)
				});
			});
		});

	return { activiteiten: activiteiten.sort((a, b) => {
		return new Date(b.datum).getTime() - new Date(a.datum).getTime();
	}) };
}

export const actions = {
	update: async ({ request, locals }) => {
		const origineleData = await request.formData();

		const { formData, errors } = await valideerData(origineleData, ActiviteitSchema);

		if (errors) {
			return fail(400, {
				data: serializeNonPOJOs(formData),
				errors: errors.fieldErrors
			});
		}

		if ((origineleData.get('banner') as any).size == 0) {
			origineleData.delete('banner');
		}

		origineleData.set('inschrijven', origineleData.get('inschrijven') ? 'true' : 'false');
		origineleData.set('datum', new Date(origineleData.get('datum') as string).toISOString());

		try {
			if (formData.id) {
				await locals.pb.collection('activiteiten').update(formData.id, origineleData);
			} else {
				await locals.pb.collection('activiteiten').create(origineleData);
			}
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het opladen van de activiteit.');
		}
	},
	verwijder: async ({ request, locals }) => {
		const data = await request.formData();

		try {
			await locals.pb.collection('activiteiten').delete(data.get('id'));
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het verwijderen van de activiteit.');
		}
	}
};
