import { BakkenSchema, FakkelSchema } from '$lib/schemas.js';
import { serializeNonPOJOs, valideerData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';

export async function load({ request, locals }) {
	const huidig_academiejaar: string = (
		await locals.pb
			.collection('site_instellingen')
			.getFirstListItem("sleutel = 'huidig_academiejaar'")
	).waarde;

	const praesidium_leden = await locals.pb
		.collection('praesidium')
		.getOne(locals.user?.expand?.praesidiumlid?.praesidium, {
			expand: 'praesidium_leden, praesidium_leden.gebruiker'
		})
		.then((p: any) => {
			return p.expand.praesidium_leden;
		});

	const bakken = await locals.pb
		.collection('bakken')
		.getList(undefined, undefined, {
			filter: `praesidium.academiejaar = "${huidig_academiejaar}"`,
			expand: 'gebruiker'
		});

	const fakkels = await locals.pb
		.collection('fakkels')
		.getList(undefined, undefined, {
			filter: `praesidium.academiejaar = "${huidig_academiejaar}"`,
			expand: 'gebruiker'
		});

	return { bakken: serializeNonPOJOs(bakken.items), fakkels: serializeNonPOJOs(fakkels.items), praesidium_leden: serializeNonPOJOs(praesidium_leden) };
}

export const actions = {
	update_bakken: async ({ request, locals }) => {
		const origineleData = await request.formData();

		const { formData, errors } = await valideerData(origineleData, BakkenSchema);

		if (errors) {
			return fail(400, {
				data: serializeNonPOJOs(formData),
				errors: errors.fieldErrors
			});
		}

		try {
			if (formData.id) {
				await locals.pb.collection('bakken').update(formData.id, origineleData);
			} else {
				await locals.pb.collection('bakken').create(origineleData);
			}
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het opladen van de bakken.');
		}
	},
	update_fakkels: async ({ request, locals }) => {
		const origineleData = await request.formData();

		const { formData, errors } = await valideerData(origineleData, FakkelSchema);

		if (errors) {
			return fail(400, {
				data: serializeNonPOJOs(formData),
				errors: errors.fieldErrors
			});
		}

		try {
			if (formData.id) {
				await locals.pb.collection('fakkels').update(formData.id, origineleData);
			} else {
				await locals.pb.collection('fakkels').create(origineleData);
			}
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het opladen van de fakkels.');
		}
	}
};
