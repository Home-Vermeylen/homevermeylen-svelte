import { StemmingSchema } from '$lib/schemas.js';
import { json } from '@sveltejs/kit';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { v4 } from 'uuid';
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
	const form = await superValidate(event, zod4(StemmingSchema));

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	const optiesTekst = origineleData.get('opties_str');

	if (typeof optiesTekst !== 'string' || !optiesTekst.trim()) {
		return actionResult('failure', { form }, 400);
	}

	const opties = optiesTekst.split(',').map((optie) => ({
		id: v4(),
		naam: optie.trim(),
		stemmen: 0
	}));

	if (opties.some((optie) => !optie.naam)) {
		return actionResult('failure', { form }, 400);
	}

	try {
		const verkiezing = (await event.locals.pb
	.collection('verkiezingen')
	.getOne(event.params.id)) as Verkiezing;

		const bestaandId = origineleData.get('id');
		let stemmingen;

		if (typeof bestaandId === 'string' && bestaandId) {
	const bestaandeStemming = verkiezing.stemmingen.find(
		(n) => n.id === bestaandId
	);

	if (!bestaandeStemming) {
		return json({ error: 'Stemming niet gevonden.' }, { status: 404 });
	}

	stemmingen = verkiezing.stemmingen.map((n) => {
				if (n.id === bestaandId) {
					return {
						...n,
						naam: origineleData.get('naam'),
						opties
					};
				}

				return n;
			});
		} else {
			stemmingen = [
				...verkiezing.stemmingen,
				{
					id: v4(),
					naam: origineleData.get('naam'),
					opties,
					status: 'onzichtbaar',
					gestemd: []
				}
			];
		}

		await event.locals.pb
			.collection('verkiezingen')
			.update(event.params.id, { stemmingen });
	} catch (err) {
		console.error('Fout bij opslaan stemming:', err);
		return actionResult('error', { form }, 500);
	}

	return actionResult('success', { form }, 200);
};

export const DELETE: RequestHandler = async (event) => {
	if (!(await controleerKiescomite(event.locals))) {
		return json({ error: 'Geen toegang.' }, { status: 403 });
	}

	try {
		const { id } = await event.request.json();

		if (typeof id !== 'string' || !id) {
			return json({ error: 'Ongeldig stemming-ID.' }, { status: 400 });
		}

		const verkiezing = (await event.locals.pb
	.collection('verkiezingen')
	.getOne(event.params.id)) as Verkiezing;

		const stemmingen = verkiezing.stemmingen.filter((n) => n.id !== id);

		await event.locals.pb
			.collection('verkiezingen')
			.update(event.params.id, { stemmingen });

		return json({ success: true });
	} catch (err) {
		console.error('Fout bij verwijderen stemming:', err);
		return json({ error: 'Verwijderen mislukt.' }, { status: 500 });
	}
};