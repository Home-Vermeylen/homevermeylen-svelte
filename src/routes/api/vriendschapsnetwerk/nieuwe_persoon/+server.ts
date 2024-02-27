import { json } from '@sveltejs/kit';
import * as uuid from 'uuid';

export async function POST({ request, locals }) {
	if (!locals.pb.authStore.isValid || !locals.user) {
		return json(undefined, { status: 403 });
	}

	const data = await request.formData();
	const netwerk = await locals.pb
		.collection('vriendschapsnetwerk')
		.getFirstListItem(`praesidium = "${locals.user?.expand?.praesidiumlid?.praesidium}"`);

	netwerk.gebruikers.push({
		naam: data.get('naam'),
		club: data.get('club'),
		id: uuid.v4()
	});

	try {
		await locals.pb
			.collection('vriendschapsnetwerk')
			.update(netwerk.id, { gebruikers: netwerk.gebruikers, datamap: netwerk.datamap });
	} catch (err) {
		return json(err, { status: 500 });
	}
}
