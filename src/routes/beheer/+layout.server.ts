import { ActiviteitSchema, AugustjesSchema, ProfielSchema, VerslagSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load = async ({ locals }) => {
	return {
		functie_id: locals.pb.authStore.isValid ? locals.pb.authStore.model?.id : '',
		profiel_form: await superValidate(zod4(ProfielSchema)),
		augustjes_form: await superValidate(zod4(AugustjesSchema)),
		verslagen_form: await superValidate(zod4(VerslagSchema)),
		praesidium_leden: await locals.pb
			.collection('praesidium_leden')
			.getFullList({ filter: `praesidium = '${locals.praesidium?.id}'`, expand: 'functie' })
			.then((r) => r.map((l) => ({ ...l, avatar: locals.pb.files.getUrl(l, l.avatar) })))
	};
};

