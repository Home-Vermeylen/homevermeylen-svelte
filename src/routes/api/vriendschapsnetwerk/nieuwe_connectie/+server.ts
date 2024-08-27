import { NieuweConnectieSchema } from '$lib/schemas.js';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function POST(event) {
	const origineleData = await event.request.clone().formData();

	const form = await superValidate(event, zod(NieuweConnectieSchema));

	if (!event.locals.pb.authStore.isValid) {
		return actionResult("failure", { form }, { status: 403 })
	}

	const netwerk = await event.locals.pb
		.collection('vriendschapsnetwerk')
		.getFirstListItem(`praesidium = "${event.locals.praesidium?.id}"`);

	

	netwerk.datamap.push({
		id1: origineleData.get('id1'),
		id2: origineleData.get('id2'),
		type: origineleData.get('type'),
		locatie: origineleData.get('locatie'),
		commentaar: origineleData.get('commentaar')
	});

	try {
		await event.locals.pb
			.collection('vriendschapsnetwerk')
			.update(netwerk.id, { gebruikers: netwerk.gebruikers, datamap: netwerk.datamap });

		return actionResult("success", { form }, { status: 200 })
	} catch (err) {
		return actionResult("failure", { form }, { status: 500 })
	}
}
