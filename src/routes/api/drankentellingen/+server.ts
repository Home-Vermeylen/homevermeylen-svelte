import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.pb.authStore.isValid) {
		return json({ error: 'Niet gemachtigd.' }, { status: 403 });
	}

	const isTablet = locals.pb.authStore.model?.username === 'Tablet';

	try {
		const data = await request.json();

		const { baravond, drankje, praesidium_lid, verschil, actie_id } = data;

		// Controleer de algemene gegevens.
		if (
			typeof baravond !== 'string' ||
			typeof drankje !== 'string' ||
			typeof verschil !== 'number' ||
			!Number.isInteger(verschil) ||
			(verschil !== -1 && (verschil < 1 || verschil > 100)) ||
			typeof actie_id !== 'string' ||
			actie_id.length < 10 ||
			actie_id.length > 100
		) {
			return json({ error: 'Ongeldige gegevens.' }, { status: 400 });
		}

		// Tablet mag geen praesidiumlid meesturen.
		if (
			isTablet
				? praesidium_lid !== undefined &&
					praesidium_lid !== null &&
					praesidium_lid !== ''
				: typeof praesidium_lid !== 'string' || !praesidium_lid
		) {
			return json({ error: 'Ongeldige praesidiumlid-koppeling.' }, { status: 400 });
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

		// Controleer bij gewone gebruikers of het lid bij hun account
		// en bij het praesidium van deze baravond hoort.
		if (!isTablet) {
			const accountId = locals.pb.authStore.model?.id;

			if (!accountId) {
				return json({ error: 'Niet gemachtigd.' }, { status: 403 });
			}

			try {
				const praesidiumLid = await locals.pb
					.collection('praesidium_leden')
					.getOne(praesidium_lid);

				if (
					praesidiumLid.functie !== accountId ||
					praesidiumLid.praesidium !== huidigeBaravond.praesidium
				) {
					return json(
						{ error: 'Je bent niet gemachtigd om deze telling op te slaan.' },
						{ status: 403 }
					);
				}
			} catch (err: any) {
				if (err?.status === 404) {
					return json(
						{ error: 'Dit praesidiumlid kon niet worden gevonden.' },
						{ status: 403 }
					);
				}

				throw err;
			}
		}

		try {
			const actieData = {
    baravond,
    drankje,
    ...(isTablet ? {} : { praesidium_lid }),
    verschil,
    actie_id
};

console.log('Telactie naar PocketBase:', actieData);

const actie = await locals.pb
    .collection('drankentelling_acties')
    .create(actieData);

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
		console.error('PocketBase volledige fout:', err);
console.error('PocketBase response data:', err?.response?.data);
console.error('PocketBase response status:', err?.status);
console.error('PocketBase response message:', err?.response?.message);

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