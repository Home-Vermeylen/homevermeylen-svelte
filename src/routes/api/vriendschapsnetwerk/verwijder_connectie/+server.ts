import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	if (!locals.pb.authStore.isValid || !locals.user) {
		return json(undefined, { status: 403 });
	}

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
		return json(err, { status: 500 });
	}
}
