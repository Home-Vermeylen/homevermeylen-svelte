import { StemmingSchema, VerwijderStemmingSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';

type Stemming = {
	id: string;
	naam: string;
	[key: string]: unknown;
};

type Verkiezing = {
	stemmingen: Stemming[];
};

export const load: PageServerLoad = async ({ params, fetch }) => {
	return {
		breadcrumb: {
			label: 'Verkiezingen',
			href: '/beheer/verkiezingen'
		},
		verkiezing: fetch(`/api/verkiezingen/${params.id}`).then((r) => r.json()),
		form: await superValidate(zod4(StemmingSchema)),
		verwijder_stemming_form: await superValidate(zod4(VerwijderStemmingSchema))
	};
};

export const actions: Actions = {
	verwijder_stemming: async ({ request, locals, params, fetch }) => {
		const origineleData = await request.clone().formData();
		const form = await superValidate(request, zod4(VerwijderStemmingSchema));
		const verkiezing = (await fetch(`/api/verkiezingen/${params.id}`).then((r) =>
			r.json()
		)) as Verkiezing;

		if (!form.valid) {
			return message(form, {
				text: 'ID niet correct',
				type: 'error'
			});
		}

		try {
			await locals.pb.collection('verkiezingen').update(params.id, {
				stemmingen: verkiezing.stemmingen.filter(
					(stemming) => stemming.id !== origineleData.get('stemming_id')
				)
			});
		} catch {
			return message(
				form,
				{
					text: 'Fout bij verwijderen stemming',
					type: 'error'
				},
				{ status: 500 }
			);
		}

		return message(form, {
			text: 'ID correct',
			type: 'success'
		});
	}
};