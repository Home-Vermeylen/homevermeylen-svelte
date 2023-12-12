import { BakkenSchema, FakkelSchema } from '$lib/schemas.js';
import { serializeNonPOJOs, valideerData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from "sveltekit-superforms/server";

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

	const BakkenForm = superValidate(BakkenSchema, { id: "bakken" });
	const FakkelsForm = superValidate(FakkelSchema, { id: "fakkels" });

	return { bakken: serializeNonPOJOs(bakken.items), fakkels: serializeNonPOJOs(fakkels.items), praesidium_leden: serializeNonPOJOs(praesidium_leden), BakkenForm, FakkelsForm };
}

export const actions = {
	update_bakken: async ({ request, locals }) => {
		const origineleData = await request.clone().formData();

		const form = await superValidate(request, BakkenSchema);
		// const { formData, errors } = await valideerData(origineleData, BakkenSchema);

		if (!form.valid) {
			return fail(400, form);
		}

		if (Number(form.data.aantal) < 0) {
			return setError(form, 'aantal', 'Aantal bakken mag niet negatief zijn.')
		}

		try {
			if (form.data.id) {
				await locals.pb.collection('bakken').update(form.data.id, origineleData);
			} else {
				await locals.pb.collection('bakken').create(origineleData);
			}
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het opladen van de bakken.');
		}

		return { form };
	},
	update_fakkels: async ({ request, locals }) => {
		const origineleData = await request.clone().formData();

		const form = await superValidate(request, FakkelSchema);
		// const { formData, errors } = await valideerData(origineleData, BakkenSchema);

		if (!form.valid) {
			return fail(400, form);
		}

		if (Number(form.data.aantal) < 0) {
			return setError(form, 'aantal', 'Aantal fakkels mag niet negatief zijn.')
		}

		try {
			if (form.data.id) {
				await locals.pb.collection('fakkels').update(form.data.id, origineleData);
			} else {
				await locals.pb.collection('fakkels').create(origineleData);
			}
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het opladen van de fakkels.');
		}

		return { form };
	}
};
