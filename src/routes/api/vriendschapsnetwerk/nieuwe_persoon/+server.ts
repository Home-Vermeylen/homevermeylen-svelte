import { NieuwePersoonSchema } from '$lib/schemas';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import * as uuid from 'uuid';

export async function POST(event) {
	const origineleData = await event.request.clone().formData();

	const form = await superValidate(event, zod(NieuwePersoonSchema));
	
	if (!event.locals.pb.authStore.isValid) {
		return actionResult("failure", { form }, { status: 403 })
	}

	const netwerk = await event.locals.pb
		.collection('vriendschapsnetwerk')
		.getFirstListItem(`praesidium = "${event.locals.praesidium?.id}"`);

	netwerk.gebruikers.push({
		naam: origineleData.get('naam'),
		club: origineleData.get('club'),
		id: uuid.v4()
	});

	try {
		await event.locals.pb
			.collection('vriendschapsnetwerk')
			.update(netwerk.id, { gebruikers: netwerk.gebruikers, datamap: netwerk.datamap });

		return actionResult("success", { form }, { status: 200 })
	} catch (err) {
		return actionResult("error", { form }, { status: 500 })
	}
}
