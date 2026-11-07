import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	let baravond;

	try {
		baravond = await locals.pb.collection('baravonden').getOne(params.id, {
			expand: 'praesidium'
		});
	} catch (err) {
		console.error('Fout bij ophalen baravond:', err);
		throw error(404, 'Deze baravond kon niet worden gevonden.');
	}

	// Een afgesloten baravond mag niet meer geteld worden.
	if (baravond.afgesloten === true) {
		throw redirect(
			303,
			`/beheer/baravonden/${params.id}/overzicht`
		);
	}

	const accountId = locals.pb.authStore.model?.id;

	if (!accountId) {
		throw error(403, 'Je bent niet ingelogd.');
	}

	let praesidiumLid;

	try {
		praesidiumLid = await locals.pb
			.collection('praesidium_leden')
			.getFirstListItem(
				`functie = "${accountId}" && praesidium = "${baravond.praesidium}"`
			);
	} catch (err) {
		console.error('Praesidiumlid niet gevonden:', err);
		throw error(403, 'Je account is niet gekoppeld aan dit praesidium.');
	}

	const drankjes = await locals.pb.collection('drankjes').getFullList({
		filter: 'actief = true',
		sort: 'volgorde,naam'
	});

	const drankjesMetFoto = drankjes.map((drankje) => ({
		...drankje,
		fotoUrl: drankje.foto
			? locals.pb.files.getUrl(drankje, drankje.foto)
			: null
	}));

	// Haal de bestaande tellingen op
	const bestaandeTellingen = await locals.pb
		.collection('drankentellingen')
		.getFullList({
			filter: `baravond = "${params.id}" && praesidium_lid = "${praesidiumLid.id}"`
		});

	// Haal de nieuwe acties van dit praesidiumlid op
	const acties = await locals.pb
		.collection('drankentelling_acties')
		.getFullList({
			filter: `baravond = "${params.id}" && praesidium_lid = "${praesidiumLid.id}"`
		});

	// Combineer de oude aantallen met de nieuwe acties
	const aantallenPerDrankje: Record<string, number> = {};

	for (const telling of bestaandeTellingen) {
		aantallenPerDrankje[telling.drankje] =
			(aantallenPerDrankje[telling.drankje] ?? 0) + telling.aantal;
	}

	for (const actie of acties) {
		aantallenPerDrankje[actie.drankje] =
			(aantallenPerDrankje[actie.drankje] ?? 0) + actie.verschil;
	}

	// Zet de berekende aantallen om naar het bestaande formaat
	const tellingen = Object.entries(aantallenPerDrankje).map(
		([drankje, aantal]) => ({
			drankje,
			aantal: Math.max(0, aantal),
			praesidium_lid: praesidiumLid.id
		})
	);

	return {
		breadcrumb: {
			label: 'Baravonden',
			href: '/beheer/baravonden'
		},
		baravond,
		drankjes: drankjesMetFoto,
		tellingen,
		praesidiumLidId: praesidiumLid.id
	};
};