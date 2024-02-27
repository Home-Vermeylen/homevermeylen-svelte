import { json } from "@sveltejs/kit";

const vis_opties = {
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
		dragView: true,
		hideEdgesOnDrag: true,
		hideEdgesOnZoom: true
	}
};

export async function GET({ locals }) {
	if (!locals.pb.authStore.isValid || !locals.user) {
		return json("Geen toegang.", { status: 403 });
	}

	const netwerk = await locals.pb
		.collection('vriendschapsnetwerk')
		.getFirstListItem(`praesidium = "${locals.user?.expand?.praesidiumlid?.praesidium}"`);

	const { gebruikers, datamap } = netwerk;

	const data = {
		nodes: gebruikers.map((v: any) => {
			return { id: v.id, label: v.naam, group: v.club };
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
				commentaar: v.commentaar,
				locatie: v.locatie
			};
		})
	};

	return json({
		gebruiker: locals.user,
		netwerk_data: data,
		opties: vis_opties
	});
}
