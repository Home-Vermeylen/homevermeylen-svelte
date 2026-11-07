import { actionResult } from 'sveltekit-superforms/client';

type Connectie = {
	id1: string;
	id2: string;
	type: string;
};

export async function POST({ request, locals }) {
	if (!locals.pb.authStore.isValid) {
		return actionResult('failure');
	}

	const data = await request.formData();

	const netwerk = await locals.pb
		.collection('vriendschapsnetwerk')
		.getFirstListItem(`praesidium = "${locals.praesidium?.id}"`);

	const datamap = (netwerk.datamap as Connectie[]).filter((c) => {
		if (
			c.id1 == data.get('id1') &&
			c.id2 == data.get('id2') &&
			c.type == data.get('type')
		) {
			return false;
		} else {
			return true;
		}
	});

	try {
		await locals.pb
			.collection('vriendschapsnetwerk')
			.update(netwerk.id, {
				gebruikers: netwerk.gebruikers,
				datamap
			});

		return actionResult('success');
	} catch (err) {
		return actionResult('error');
	}
}