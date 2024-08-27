import { actionResult } from 'sveltekit-superforms/client';

export async function POST({ request, locals }) {
    if (!locals.pb.authStore.isValid) {
		return actionResult('failure');
	}

	const data = await request.formData();
	const netwerk = await locals.pb
		.collection('vriendschapsnetwerk')
		.getFirstListItem(`praesidium = "${locals.praesidium?.id}"`);

	const gebruikers = netwerk.gebruikers.filter((g) => {
		return g.id != data.get('id');
	});
	const datamap = netwerk.datamap.filter((c) => {
		return c.id1 != data.get('id') && c.id2 != data.get('id');
	});

	try {
		await locals.pb.collection('vriendschapsnetwerk').update(netwerk.id, { gebruikers, datamap });
		return actionResult('success');
	} catch (err) {
		return actionResult('error');
	}
}
