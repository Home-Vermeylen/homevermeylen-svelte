import { serializeNonPOJOs } from '$lib/utils';
import * as uuid from 'uuid';
import { error } from '@sveltejs/kit';

export async function load({ request, locals }: { request: any; locals: any }) {
	const netwerk = await locals.pb
		.collection('vriendschapsnetwerk')
		.getFirstListItem(`praesidium = "${locals.user?.expand?.praesidiumlid?.praesidium}"`);

	const { gebruikers, datamap } = netwerk;

	const data = {
		nodes: gebruikers.map((v: any) => {
			return { id: v.id, label: v.naam, group: v.club};
		}),
		edges: datamap.map((v: any, i: any) => {
			let color = {};
			let arrows = '';

			if (v.type == 'GEMUILD') {
				color = { color: '#a3f307', highlight: '#a3f307' };
			} else if (v.type == 'SEKS') {
				color = { color: '#05f9e2', highlight: '#05f9e2' };
				arrows = 'to;from';
			} else {
				color = { color: '#ff6f00', highlight: '#ff6f00' };
			}

			return {
				id: i,
				from: v.id1,
				to: v.id2,
				color,
				arrows,
				commentaar: v.commentaar, locatie: v.locatie 
			};
		})
	};

	const opties = {
		nodes: {
			borderWidth: 0,
			color: {
				highlight: {},
				hover: {}
			},
			font: {
				color: 'white',
				face: 'Verdana',
				background: 'black',
				size: 20
			},
			shape: 'dot',
			size: 30
		},
		edges: {
			selectionWidth: 4,
			smooth: false,
			width: 2,
			arrows: {
				to: {
					scaleFactor: 0.75
				},
				from: {
					scaleFactor: 0.75
				}
			}
		},
		layout: {
			hierarchical: {
				enabled: false,
				levelSeparation: 150,
				nodeSpacing: 200,
				treeSpacing: 80,
				sortMethod: 'directed'
			}
		},
		physics: {
			enabled: true,
			hierarchicalRepulsion: {
				centralGravity: 0.0,
				springLength: 50,
				springConstant: 0.0,
				nodeDistance: 200,
				damping: 1
			},
			minVelocity: 0.75,
			solver: 'hierarchicalRepulsion'
		},
		interaction: {
			dragView: false,
			hideEdgesOnDrag: true,
			hideEdgesOnZoom: true
		}
	};

	return {
		gebruiker: locals.user,
		netwerk_data: data,
		opties
	};
}

export const actions = {
	nieuwe_persoon: async ({ request, locals }) => {
		const data = await request.formData();
		const netwerk = await locals.pb
			.collection('vriendschapsnetwerk')
			.getFirstListItem(`praesidium = "${locals.user?.expand?.praesidiumlid?.praesidium}"`);

		netwerk.gebruikers.push({
			naam: data.get('naam'),
			club: data.get('club'),
			id: uuid.v4()
		});

		try {
			await locals.pb
				.collection('vriendschapsnetwerk')
				.update(netwerk.id, { gebruikers: netwerk.gebruikers, datamap: netwerk.datamap });
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het toevoegen van de persoon.');
		}
	},
	nieuwe_connectie: async ({ request, locals }) => {
		const data = await request.formData();
		const netwerk = await locals.pb
			.collection('vriendschapsnetwerk')
			.getFirstListItem(`praesidium = "${locals.user?.expand?.praesidiumlid?.praesidium}"`);

		netwerk.datamap.push({
			id1: data.get('id1'),
			id2: data.get('id2'),
			type: data.get('type'),
			locatie: data.get('locatie'),
			commentaar: data.get('commentaar')
		});

		try {
			await locals.pb
				.collection('vriendschapsnetwerk')
				.update(netwerk.id, { gebruikers: netwerk.gebruikers, datamap: netwerk.datamap });
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het toevoegen van de persoon.');
		}
	},
	verwijder_persoon: async ({ request, locals }) => {
		const data = await request.formData();
		const netwerk = await locals.pb
			.collection('vriendschapsnetwerk')
			.getFirstListItem(`praesidium = "${locals.user?.expand?.praesidiumlid?.praesidium}"`);

		const gebruikers = netwerk.gebruikers.filter((g) => {
			return g.id != data.get('id');
		});
		const datamap = netwerk.datamap.filter((c) => {
			return c.id1 != data.get('id') && c.id2 != data.get('id');
		});

		try {
			await locals.pb.collection('vriendschapsnetwerk').update(netwerk.id, { gebruikers, datamap });
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het verwijderen van de persoon.');
		}
	},
	verwijder_connectie: async ({ request, locals }) => {
		const data = await request.formData();
		const netwerk = await locals.pb
			.collection('vriendschapsnetwerk')
			.getFirstListItem(`praesidium = "${locals.user?.expand?.praesidiumlid?.praesidium}"`);


		const datamap = netwerk.datamap.filter((c) => {
			if (c.id1 == data.get('id1') && c.id2 == data.get('id2') && c.type == data.get('type')) {
				return false;
			} else {
				return true;
			}
		});

		try {
			await locals.pb
				.collection('vriendschapsnetwerk')
				.update(netwerk.id, { gebruikers: netwerk.gebruikers, datamap });
		} catch (err) {
			throw error(500, 'Er is een probleem opgetreden bij het verwijderen van de connectie.');
		}
	}
};
