import { json } from '@sveltejs/kit';

export async function POST({ locals }) {
	if (!locals.pb.authStore.isValid) {
		return json({ error: 'Niet gemachtigd' }, { status: 403 });
	}

	const praesidiumId = locals.praesidium?.id;

	if (!praesidiumId) {
		return json({ error: 'Geen praesidium gevonden' }, { status: 400 });
	}

	try {
		const bestaandNetwerk = await locals.pb
			.collection('vriendschapsnetwerk')
			.getFirstListItem(`praesidium = "${praesidiumId}"`);

		return json({
			netwerk: bestaandNetwerk,
			nieuw: false
		});
	} catch {
		const netwerk = await locals.pb.collection('vriendschapsnetwerk').create({
			praesidium: praesidiumId
		});

		return json({
			netwerk,
			nieuw: true
		});
	}
}