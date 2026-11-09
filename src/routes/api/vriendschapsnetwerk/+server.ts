import { json } from '@sveltejs/kit';

function kleurVoorClub(club: string) {
	const naam = club.trim().toLowerCase();

	// Vermeylen en Home Vermeylen zijn altijd blauw
	if (naam === 'vermeylen' || naam === 'home vermeylen') {
	return 'hsl(221, 83%, 85%)';
}

	let hash = 0;

	for (let i = 0; i < naam.length; i++) {
		hash = naam.charCodeAt(i) + ((hash << 5) - hash);
	}

	const hue = Math.abs(hash) % 360;

	return `hsl(${hue}, 65%, 85%)`;
}

export async function GET({ locals }) {
	if (!locals.pb.authStore.isValid) {
		return json({ netwerk: null }, { status: 403 });
	}

	const praesidiumId = locals.praesidium?.id;

	if (!praesidiumId) {
		return json({ netwerk: null });
	}

	try {
		const netwerk = await locals.pb
			.collection('vriendschapsnetwerk')
			.getFirstListItem(`praesidium = "${praesidiumId}"`);

		const personen = await locals.pb
			.collection('vriendschapsnetwerk_personen')
			.getFullList({
				filter: `netwerk = "${netwerk.id}"`,
				sort: 'naam'
			});

		const connecties = await locals.pb
			.collection('vriendschapsnetwerk_connecties')
			.getFullList({
				filter: `netwerk = "${netwerk.id}"`
			});

				const nodes = personen.map((persoon) => {
			const kleur = kleurVoorClub(persoon.club);
			const kleurRand = kleurVoorClub(persoon.club).replace('85%)', '55%)');

			return {
				id: persoon.id,
				label: persoon.naam,
				title: `${persoon.naam}\n${persoon.club}`,
				group: persoon.club,
				color: {
	background: kleur,
	border: kleurRand,
hover: {
	background: kleur,
	border: kleurRand
},
highlight: {
	background: kleur,
	border: kleurRand
}
}
			};
		});

		const legende = [...new Set(personen.map((persoon) => persoon.club))]
	.sort((a, b) => a.localeCompare(b))
	.map((club) => ({
		club,
		kleur: kleurVoorClub(club)
	}));

		const edges = connecties.map((connectie) => ({
			id: connectie.id,
			from: connectie.persoon1,
			to: connectie.persoon2,
			label: connectie.type,
			title: connectie.extra_info || connectie.type
		}));

		return json({
			netwerk,
			legende,
			nieuw_academiejaar_nodig: false,
			netwerk_data: {
				nodes,
				edges
			},
			opties: {
				nodes: {
					shape: 'dot',
					size: 20,
					font: {
						size: 16
					}
				},
				edges: {
					arrows: {
						to: {
							enabled: false
						}
					},
					font: {
						align: 'middle'
					}
				},
				physics: {
	enabled: true,
	repulsion: {
		nodeDistance: 500,
		springLength: 500,
		springConstant: 0.02,
		damping: 0.09
	}
},
				interaction: {
					hover: true,
					zoomView: true,
					dragView: true
				}
			}
		});
	} catch (error) {
		console.error('Fout bij laden vriendschapsnetwerk:', error);

		return json({
			netwerk: null,
			nieuw_academiejaar_nodig: true
		});
	}
}