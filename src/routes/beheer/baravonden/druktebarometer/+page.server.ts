import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const baravonden = await locals.pb.collection('baravonden').getFullList({
		sort: 'datum'
	});

	const drankjes = await locals.pb.collection('drankjes').getFullList({
		filter: 'actief = true',
		sort: 'volgorde,naam'
	});

	const acties = await locals.pb.collection('drankentelling_acties').getFullList({
		sort: 'created'
	});

	const bestaandeTellingen = await locals.pb
		.collection('drankentellingen')
		.getFullList();

	const tellingenPerBaravond = new Map<string, Map<string, number>>();

	for (const telling of bestaandeTellingen) {
		if (!telling.baravond || !telling.drankje) continue;

		if (!tellingenPerBaravond.has(telling.baravond)) {
			tellingenPerBaravond.set(telling.baravond, new Map());
		}

		const perDrankje = tellingenPerBaravond.get(telling.baravond)!;

		perDrankje.set(
			telling.drankje,
			(perDrankje.get(telling.drankje) ?? 0) + telling.aantal
		);
	}

	for (const actie of acties) {
		if (!actie.baravond || !actie.drankje) continue;

		if (!tellingenPerBaravond.has(actie.baravond)) {
			tellingenPerBaravond.set(actie.baravond, new Map());
		}

		const perDrankje = tellingenPerBaravond.get(actie.baravond)!;

		perDrankje.set(
			actie.drankje,
			(perDrankje.get(actie.drankje) ?? 0) + actie.verschil
		);
	}

	const data = baravonden.map((baravond) => {
		const perDrankje =
			tellingenPerBaravond.get(baravond.id) ?? new Map<string, number>();

		const drankjesData = drankjes.map((drankje) => ({
			id: drankje.id,
			naam: drankje.naam,
			aantal: Math.max(0, perDrankje.get(drankje.id) ?? 0)
		}));

		const totaal = drankjesData.reduce(
			(som, drankje) => som + drankje.aantal,
			0
		);

		return {
			id: baravond.id,
			naam: baravond.naam,
			datum: baravond.datum,
			totaal,
			drankjes: drankjesData
		};
	});

	return {
		baravonden: data,
		drankjes: drankjes.map((drankje) => ({
			id: drankje.id,
			naam: drankje.naam
		})),
		breadcrumb: {
			label: 'Druktebarometer'
		}
	};
};