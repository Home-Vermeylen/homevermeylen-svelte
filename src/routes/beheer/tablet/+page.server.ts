import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const praesidiumId = locals.praesidium?.id;

	if (!praesidiumId) {
		throw error(500, 'Het huidige praesidium kon niet worden opgehaald.');
	}

	const baravonden = await locals.pb.collection('baravonden').getFullList({
		filter: `praesidium = "${praesidiumId}" && afgesloten = false`,
		sort: '-datum'
	});

	return {
		baravonden
	};
};