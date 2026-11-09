import { actionResult } from 'sveltekit-superforms/client';

export async function POST({ request, locals }) {
	if (!locals.pb.authStore.isValid) {
		return actionResult('failure');
	}

	try {
		const data = await request.formData();
		const persoonId = data.get('id');

		if (typeof persoonId !== 'string' || !persoonId) {
			return actionResult('failure');
		}

		const netwerk = await locals.pb
			.collection('vriendschapsnetwerk')
			.getFirstListItem(`praesidium = "${locals.praesidium?.id}"`);

		const persoon = await locals.pb
			.collection('vriendschapsnetwerk_personen')
			.getOne(persoonId);

		// Controleer of de persoon bij het huidige netwerk hoort.
		if (persoon.netwerk !== netwerk.id) {
			return actionResult('failure');
		}

		// Verwijder eerst alle connecties van deze persoon.
		const connecties = await locals.pb
			.collection('vriendschapsnetwerk_connecties')
			.getFullList({
				filter: `netwerk = "${netwerk.id}" && (persoon1 = "${persoonId}" || persoon2 = "${persoonId}")`
			});

		for (const connectie of connecties) {
			await locals.pb
				.collection('vriendschapsnetwerk_connecties')
				.delete(connectie.id);
		}

		// Verwijder daarna de persoon.
		await locals.pb
			.collection('vriendschapsnetwerk_personen')
			.delete(persoonId);

		return actionResult('success');
	} catch (error) {
		console.error('Fout bij verwijderen persoon:', error);

		return actionResult('error');
	}
}