import { DrankjeSchema, VerwijderDrankjeSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		breadcrumb: {
			label: 'Drankjes',
			href: '/beheer/drankjes'
		},
		drankjes_promise: fetch('/api/drankjes').then(async (response) => {
			return await response.json();
		}),
		drankjes_form: await superValidate(zod4(DrankjeSchema)),
		deactiveer_drankje_form: await superValidate(zod4(VerwijderDrankjeSchema))
	};
};

export const actions: Actions = {
	opslaan_drankje: async ({ request, locals }) => {
		const origineleData = await request.clone().formData();

		const foto = origineleData.get('foto') as File | null;

		if (!foto || foto.size === 0) {
			origineleData.delete('foto');
		}

		const form = await superValidate(request, zod4(DrankjeSchema));

		if (!form.valid) {
			return message(
				form,
				{
					text: 'Controleer de ingevoerde gegevens.',
					type: 'error'
				},
				{ status: 400 }
			);
		}

		const id = form.data.id;

		if (!id) {
			origineleData.delete('id');
		}

		try {
			if (id) {
				await locals.pb.collection('drankjes').update(id, origineleData);
			} else {
				const bestaandeDrankjes = await locals.pb
					.collection('drankjes')
					.getList(1, 1, {
						sort: '-volgorde'
					});

				const hoogsteVolgorde = bestaandeDrankjes.items[0]?.volgorde ?? 0;

				origineleData.set('volgorde', String(hoogsteVolgorde + 1));

				await locals.pb
					.collection('drankjes')
					.create(origineleData);
			}
		} catch (err) {
			console.error('Fout bij opslaan drankje:', err);

			return message(
				form,
				{
					text: 'Fout bij opslaan drankje.',
					type: 'error'
				},
				{ status: 500 }
			);
		}

		return message(form, {
			text: 'Drankje succesvol opgeslagen.',
			type: 'success'
		});
	},

	deactiveer_drankje: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(VerwijderDrankjeSchema));

		if (!form.valid) {
			return message(form, {
				text: 'ID niet correct',
				type: 'error'
			});
		}

		try {
			await locals.pb.collection('drankjes').update(form.data.id, {
				actief: false
			});
		} catch (err) {
			console.error('Fout bij deactiveren drankje:', err);

			return message(
				form,
				{
					text: 'Fout bij deactiveren drankje',
					type: 'error'
				},
				{ status: 500 }
			);
		}

		return message(form, {
			text: 'Drankje succesvol gedeactiveerd',
			type: 'success'
		});
	}
};