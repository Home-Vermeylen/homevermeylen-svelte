import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.pb.authStore.isValid) {
		return json({ error: 'Niet gemachtigd.' }, { status: 403 });
	}

	try {
		const data = await request.json();

		const { baravond, drankje, praesidium_lid, verschil, actie_id } = data;

		if (
			typeof baravond !== 'string' ||
			typeof drankje !== 'string' ||
			typeof praesidium_lid !== 'string' ||
			typeof verschil !== 'number' ||
			!Number.isInteger(verschil) ||
			(verschil !== -1 && (verschil < 1 || verschil > 100)) ||
			typeof actie_id !== 'string' ||
			actie_id.length < 10 ||
			actie_id.length > 100
		) {
			return json({ error: 'Ongeldige gegevens.' }, { status: 400 });
		}

		// Controleer of de baravond bestaat en niet afgesloten is.
		const huidigeBaravond = await locals.pb
			.collection('baravonden')
			.getOne(baravond);

		if (huidigeBaravond.afgesloten === true) {
			return json(
				{
					error: 'Deze baravond is afgesloten. Drankjes turven is niet meer mogelijk.'
				},
				{ status: 409 }
			);
		}

		try {
			const actie = await locals.pb
				.collection('drankentelling_acties')
				.create({
					baravond,
					drankje,
					praesidium_lid,
					verschil,
					actie_id
				});

			return json({
				success: true,
				actie_id: actie.actie_id,
				verschil
			});
		} catch (err: any) {
			const actieIdFout = err?.response?.data?.actie_id;

			// De actie bestaat al: beschouw dit als succesvol.
			if (actieIdFout?.code === 'validation_not_unique') {
				return json({
					success: true,
					duplicate: true,
					actie_id: actieIdFout.value
				});
			}

			throw err;
		}
	} catch (err: any) {
		console.error('Fout bij registreren telactie:', err);
		console.error('PocketBase response:', err?.response);
		console.error(
			'PocketBase response JSON:',
			JSON.stringify(err?.response, null, 2)
		);

		if (err?.status === 429) {
			console.error('=== POCKETHOST RATE LIMIT ===');
			console.error('Retry-After:', err?.response?.headers?.['Retry-After']);
			console.error(
				'IP hourly remaining:',
				err?.response?.headers?.['X-PocketHost-RateLimit-Ip-Hourly-Remaining']
			);
			console.error(
				'Instance hourly remaining:',
				err?.response?.headers?.[
					'X-PocketHost-RateLimit-Instance-Hourly-Remaining'
				]
			);
			console.error(
				'IP concurrent remaining:',
				err?.response?.headers?.[
					'X-PocketHost-RateLimit-Ip-Concurrent-Remaining'
				]
			);
			console.error(
				'Instance concurrent remaining:',
				err?.response?.headers?.[
					'X-PocketHost-RateLimit-Instance-Concurrent-Remaining'
				]
			);
			console.error('==============================');
		}

		return json(
			{
				error: 'De telactie kon niet worden opgeslagen.',
				detail:
					err?.response?.message ??
					err?.response?.data ??
					err?.message ??
					'Onbekende fout'
			},
			{ status: 500 }
		);
	}
};