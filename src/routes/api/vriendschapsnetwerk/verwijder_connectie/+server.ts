import { actionResult } from 'sveltekit-superforms/client';

export async function POST({ request, locals }) {
	if (!locals.pb.authStore.isValid) {
		return actionResult('failure');
	}

	try {
		const data = await request.formData();

		const id1 = data.get('id1');
		const id2 = data.get('id2');
		const type = data.get('type');

		if (
			typeof id1 !== 'string' ||
			typeof id2 !== 'string' ||
			typeof type !== 'string'
		) {
			return actionResult('failure');
		}

		const netwerk = await locals.pb
			.collection('vriendschapsnetwerk')
			.getFirstListItem(`praesidium = "${locals.praesidium?.id}"`);

		const connecties = await locals.pb
			.collection('vriendschapsnetwerk_connecties')
			.getFullList({
				filter: `netwerk = "${netwerk.id}"`
			});

		const connectie = connecties.find(
			(c) =>
				c.type === type &&
				((c.persoon1 === id1 && c.persoon2 === id2) ||
					(c.persoon1 === id2 && c.persoon2 === id1))
		);

		if (!connectie) {
			return actionResult('failure');
		}

		await locals.pb
			.collection('vriendschapsnetwerk_connecties')
			.delete(connectie.id);

		return actionResult('success');
	} catch (error) {
		console.error('Fout bij verwijderen connectie:', error);

		return actionResult('error');
	}
}