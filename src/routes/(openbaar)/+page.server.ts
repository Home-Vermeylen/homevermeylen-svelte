import { GebruikersSchema, WachtwoordSchema } from '$lib/schemas.js';
import { serializeNonPOJOs, valideerData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';

export const actions = {
	update: async ({ request, locals }) => {
		const origineleData = await request.formData();

		const { formData, errors } = await valideerData(origineleData, GebruikersSchema);

		if (errors) {
			return fail(400, {
				data: serializeNonPOJOs(formData),
				errors: errors.fieldErrors
			});
		}

		if ((origineleData.get('avatar') as any).size == 0) {
			origineleData.delete('avatar');
		}

		try {
			if (formData.id) {
				await locals.pb.collection('gebruikers').update(formData.id, origineleData);
			} else {
				await locals.pb.collection('gebruikers').create(origineleData);
			}
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het opladen van het profiel.');
		}
	},
	update_wachtwoord: async ({ request, locals }) => {
		const origineleData = await request.formData();

		const { formData, errors } = await valideerData(origineleData, WachtwoordSchema);

		if (errors) {
			return fail(400, {
				data: serializeNonPOJOs(formData),
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('gebruikers').update(formData.id, origineleData);
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het updaten van het wachtwoord.');
		}
	}
};
