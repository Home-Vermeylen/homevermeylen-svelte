import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    if (!locals.pb.authStore.isValid || !locals.user) {
		return json(undefined, { status: 403 });
	}

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
		return json(err, {status: 500});
	}
}
