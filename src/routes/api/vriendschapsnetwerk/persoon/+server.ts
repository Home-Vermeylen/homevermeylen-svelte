import { json } from '@sveltejs/kit';

function normaliseerNaam(naam: string) {
	return naam.trim().replace(/\s+/g, ' ').toLowerCase();
}

export async function GET({ locals, url }) {
	if (!locals.pb.authStore.isValid) {
		return json({ error: 'Niet gemachtigd' }, { status: 403 });
	}

	const netwerkId = url.searchParams.get('netwerk');
	const naam = url.searchParams.get('naam');
	const club = url.searchParams.get('club');

	if (!netwerkId || !naam || !club) {
		return json(
			{ error: 'Netwerk, naam en club zijn verplicht' },
			{ status: 400 }
		);
	}

	const normaliseer = (waarde: string) =>
		waarde.trim().replace(/\s+/g, ' ').toLowerCase();

	const afstand = (a: string, b: string) => {
		const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
			Array.from({ length: a.length + 1 }, (_, j) =>
				i === 0 ? j : j === 0 ? i : 0
			)
		);

		for (let i = 1; i <= b.length; i++) {
			for (let j = 1; j <= a.length; j++) {
				matrix[i][j] =
					b[i - 1] === a[j - 1]
						? matrix[i - 1][j - 1]
						: Math.min(
								matrix[i - 1][j] + 1,
								matrix[i][j - 1] + 1,
								matrix[i - 1][j - 1] + 1
							);
			}
		}

		return matrix[b.length][a.length];
	};

	const overeenkomst = (a: string, b: string) => {
		const lengte = Math.max(a.length, b.length);

		if (lengte === 0) return 1;

		return 1 - afstand(a, b) / lengte;
	};

	try {
		const personen = await locals.pb
			.collection('vriendschapsnetwerk_personen')
			.getFullList({
				filter: `netwerk = "${netwerkId}"`
			});

		const zoekNaam = normaliseer(naam);
		const zoekClub = normaliseer(club);

		const exact = personen.find(
			(persoon) =>
				normaliseer(persoon.naam) === zoekNaam &&
				normaliseer(persoon.club) === zoekClub
		);

		if (exact) {
			return json({
				gevonden: true,
				persoon: exact,
				suggestie: null,
				suggesties: []
			});
		}

		const suggesties = personen
			.map((persoon) => {
				const naamScore = overeenkomst(
					zoekNaam,
					normaliseer(persoon.naam)
				);

				const clubScore = overeenkomst(
					zoekClub,
					normaliseer(persoon.club)
				);

				return {
					persoon,
					naamScore,
					clubScore,
					score: (naamScore + clubScore) / 2
				};
			})
			.filter(
				(item) =>
					// Exact dezelfde naam, ongeacht de club
					item.naamScore === 1 ||
					// Gelijkaardige naam én gelijkaardige club
					(item.naamScore >= 0.7 && item.clubScore >= 0.5) ||
					// Exact dezelfde club met een gelijkaardige naam
					(item.clubScore === 1 && item.naamScore >= 0.6)
			)
			.sort((a, b) => b.score - a.score)
			.slice(0, 5)
			.map((item) => item.persoon);

		return json({
			gevonden: false,
			persoon: null,
			suggestie: suggesties[0] ?? null,
			suggesties
		});
	} catch (error) {
		console.error('Fout bij zoeken naar persoon:', error);

		return json(
			{ error: 'Persoon kon niet worden opgezocht' },
			{ status: 500 }
		);
	}
}

export async function POST({ locals, request }) {
	if (!locals.pb.authStore.isValid) {
		return json({ error: 'Niet gemachtigd' }, { status: 403 });
	}

	const data = await request.json();

	if (!data.netwerk || !data.naam || !data.club) {
		return json(
			{ error: 'Netwerk, naam en club zijn verplicht' },
			{ status: 400 }
		);
	}

	const normaliseerNaam = (naam: string) =>
		naam.trim().replace(/\s+/g, ' ').toLowerCase();

	const formatteerNaam = (naam: string) =>
		naam
			.trim()
			.replace(/\s+/g, ' ')
			.toLowerCase()
			.replace(/\b\w/g, (letter: string) => letter.toUpperCase());

	try {
		const personen = await locals.pb
			.collection('vriendschapsnetwerk_personen')
			.getFullList({
				filter: `netwerk = "${data.netwerk}"`
			});

		const genormaliseerdeNaam = normaliseerNaam(data.naam);

		const bestaandPersoon = personen.find(
			(persoon) => normaliseerNaam(persoon.naam) === genormaliseerdeNaam
		);

		if (bestaandPersoon) {
			return json({
				nieuw: false,
				persoon: bestaandPersoon
			});
		}

		const persoon = await locals.pb
			.collection('vriendschapsnetwerk_personen')
			.create({
				netwerk: data.netwerk,
				naam: formatteerNaam(data.naam),
				club: data.club.trim()
			});

		return json({
			nieuw: true,
			persoon
		});
	} catch (error) {
		console.error('Fout bij aanmaken persoon:', error);

		return json(
			{ error: 'Persoon kon niet worden aangemaakt' },
			{ status: 500 }
		);
	}
}