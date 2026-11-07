import { json } from '@sveltejs/kit';
import { actionResult } from 'sveltekit-superforms';
import type { RequestHandler } from './$types';

	type Verkiezing = {
	id: string;
	stemmingen: {
		id: string;
		naam: string;
		status: string;
		opties: {
			id: string;
			naam: string;
			stemmen: number;
		}[];
		gestemd: string[];
	}[];
};

async function controleerKiescomite(locals: App.Locals): Promise<boolean> {
	const user = locals.pb.authStore.model;

	if (!user) return false;

	try {
		const recentsteAcademiejaar = await locals.pb
			.collection('praesidia')
			.getFirstListItem('', { sort: '-academiejaar' });

		const praesidiumLid = await locals.pb
			.collection('praesidium_leden')
			.getFirstListItem(
				`functie = "${user.id}" && praesidium = "${recentsteAcademiejaar.id}"`
			);

		const lidMetKiescomite = praesidiumLid as typeof praesidiumLid & {
			kiescomite?: boolean;
		};

		return lidMetKiescomite.kiescomite === true;
	} catch {
		return false;
	}
}

export const POST: RequestHandler = async (event) => {
	if (!(await controleerKiescomite(event.locals))) {
		return json({ error: 'Geen toegang.' }, { status: 403 });
	}

	const origineleData = await event.request.clone().formData();

	try {
		const verkiezing = (await event.locals.pb
	.collection('verkiezingen')
	.getOne(event.params.id)) as unknown as Verkiezing;

		const stemmingBestaat = verkiezing.stemmingen.some(
			(n) => n.id === event.params.stemming_id
		);

		if (!stemmingBestaat) {
			return json({ error: 'Stemming niet gevonden.' }, { status: 404 });
		}

		const stemmingen = verkiezing.stemmingen.map((n) => {
			if (n.id === event.params.stemming_id) {
				if (origineleData.get('status')) {
					return { ...n, status: origineleData.get('status') };
				}

				return { ...n, naam: origineleData.get('naam') ?? n.naam };
			}

			return n;
		});

		await event.locals.pb
			.collection('verkiezingen')
			.update(event.params.id, { stemmingen });
	} catch (err) {
		console.error('Fout bij aanpassen stemming:', err);
		return actionResult('error');
	}

	return actionResult('success');
};