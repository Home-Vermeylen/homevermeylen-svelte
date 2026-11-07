import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		const baravond = await locals.pb.collection('baravonden').getOne(params.id);

		const [bestaandeTellingen, acties] = await Promise.all([
			locals.pb.collection('drankentellingen').getFullList({
				filter: `baravond = "${params.id}"`,
				expand: 'drankje,praesidium_lid'
			}),
			locals.pb.collection('drankentelling_acties').getFullList({
				filter: `baravond = "${params.id}"`,
				expand: 'drankje,praesidium_lid'
			})
		]);

		const tellingen = new Map<string, any>();

		for (const telling of bestaandeTellingen) {
			const sleutel = `${telling.drankje}_${telling.praesidium_lid}`;
			const huidig = tellingen.get(sleutel);

			if (huidig) {
				huidig.aantal += telling.aantal;
			} else {
				tellingen.set(sleutel, {
					...telling,
					aantal: telling.aantal
				});
			}
		}

		for (const actie of acties) {
			const sleutel = `${actie.drankje}_${actie.praesidium_lid}`;
			const huidig = tellingen.get(sleutel);

			if (huidig) {
				huidig.aantal += actie.verschil;
			} else {
				tellingen.set(sleutel, {
					...actie,
					aantal: actie.verschil
				});
			}
		}

		return {
			baravond: {
				id: baravond.id,
				naam: baravond.naam,
				datum: baravond.datum,
				afgesloten: baravond.afgesloten ?? false
			},
			tellingen: Array.from(tellingen.values())
				.map((telling) => ({
					...telling,
					aantal: Math.max(0, telling.aantal)
				}))
				.filter((telling) => telling.aantal > 0)
		};
	} catch (err) {
		console.error('DETAILFOUT VERKOOPSOVERZICHT:', err);
		throw err;
	}
};

export const actions = {
	toggleAfgesloten: async ({ locals, params }) => {
		if (!locals.pb.authStore.isValid) {
			return fail(403, {
				error: 'Je bent niet gemachtigd om deze baravond te wijzigen.'
			});
		}

		try {
			const baravond = await locals.pb
				.collection('baravonden')
				.getOne(params.id);

			const nieuweStatus = !(baravond.afgesloten ?? false);

			const bijgewerkt = await locals.pb
				.collection('baravonden')
				.update(params.id, {
					afgesloten: nieuweStatus
				});

			console.log('Baravond bijgewerkt:', {
				id: bijgewerkt.id,
				afgesloten: bijgewerkt.afgesloten
			});

			return {
				success: true,
				afgesloten: bijgewerkt.afgesloten
			};
		} catch (error) {
			console.error('Fout bij wijzigen status baravond:', error);

			return fail(500, {
				error: 'De status van de baravond kon niet gewijzigd worden.'
			});
		}
	}
};