import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	if (!locals.pb.authStore.isValid || !locals.user) {
		return json(undefined, { status: 403 });
	}

	const data = await request.formData();
	const netwerk = await locals.pb
		.collection('vriendschapsnetwerk')
		.getFirstListItem(`praesidium = "${locals.user?.expand?.praesidiumlid?.praesidium}"`);

	netwerk.datamap.push({
		id1: data.get('id1'),
		id2: data.get('id2'),
		type: data.get('type'),
		locatie: data.get('locatie'),
		commentaar: data.get('commentaar')
	});

	try {
		await locals.pb
			.collection('vriendschapsnetwerk')
			.update(netwerk.id, { gebruikers: netwerk.gebruikers, datamap: netwerk.datamap });
	} catch (err) {
		return json(err, { status: 500 });
	}
}
