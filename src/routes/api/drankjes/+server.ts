import { DrankjeSchema } from '$lib/schemas';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { zod4 } from 'sveltekit-superforms/adapters';
import { actionResult, superValidate } from 'sveltekit-superforms/server';

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.pb.authStore.isValid) {
		error(403, 'Je bent niet gemachtigd om deze gegevens te bekijken.');
	}

	const id = url.searchParams.get('id');

	if (id) {
		const drankje = await locals.pb.collection('drankjes').getOne(id);

		return json({
			...drankje,
			foto: drankje.foto ? locals.pb.files.getUrl(drankje, drankje.foto) : null
		});
	}

	const drankjes = await locals.pb.collection('drankjes').getFullList({
		sort: 'volgorde,naam'
	});

	return json(
		drankjes.map((drankje) => ({
			...drankje,
			foto: drankje.foto ? locals.pb.files.getUrl(drankje, drankje.foto) : null
		}))
	);
};

export const POST: RequestHandler = async (event) => {
	if (!event.locals.pb.authStore.isValid) {
		error(403, 'Je bent niet gemachtigd om drankjes aan te passen.');
	}

	const origineleData = await event.request.clone().formData();

	const foto = origineleData.get('foto') as File | null;

	if (!foto || foto.size === 0) {
		origineleData.delete('foto');
	}

	const form = await superValidate(event, zod4(DrankjeSchema));

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	const id = form.data.id;

	if (!id) {
		origineleData.delete('id');
	}

	try {
		if (id) {
	        await event.locals.pb.collection('drankjes').update(id, origineleData);
        } else {
	        const bestaandeDrankjes = await event.locals.pb.collection('drankjes').getList(1, 1, {
		        sort: '-volgorde'
	        });

	        const hoogsteVolgorde = bestaandeDrankjes.items[0]?.volgorde ?? 0;
	        origineleData.set('volgorde', String(hoogsteVolgorde + 1));

	        await event.locals.pb.collection('drankjes').create(origineleData);
        }
	} catch (err) {
		console.error('Fout bij opslaan drankje:', err);
		return actionResult('error', { form }, 500);
	}

	return actionResult('success', { form }, 200);
};

export const PATCH: RequestHandler = async ({ locals, request }) => {
	if (!locals.pb.authStore.isValid) {
		error(403, 'Je bent niet gemachtigd om de volgorde aan te passen.');
	}

	const data = await request.json();

	if (!data.volgorde || !Array.isArray(data.volgorde)) {
		error(400, 'Ongeldige volgorde.');
	}

	for (const drankje of data.volgorde) {
		if (
			typeof drankje.id !== 'string' ||
			typeof drankje.volgorde !== 'number' ||
			!Number.isInteger(drankje.volgorde) ||
			drankje.volgorde < 1
		) {
			error(400, 'Ongeldige gegevens voor een drankje.');
		}
	}

	try {
		for (const drankje of data.volgorde) {
			await locals.pb.collection('drankjes').update(drankje.id, {
				volgorde: drankje.volgorde
			});
		}
	} catch (err) {
		console.error('Fout bij opslaan van de drankjesvolgorde:', err);
		error(500, 'De nieuwe volgorde kon niet worden opgeslagen.');
	}

	return json({ success: true });
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
	if (!locals.pb.authStore.isValid) {
		error(403, 'Je bent niet gemachtigd om drankjes te verwijderen.');
	}

	const data = await request.json();

	if (!data.id || typeof data.id !== 'string') {
		error(400, 'Ongeldig drankje-ID.');
	}

	try {
		await locals.pb.collection('drankjes').update(data.id, {
			actief: false
		});
	} catch (err) {
		console.error('Fout bij deactiveren drankje:', err);
		error(500, 'Er is een probleem opgetreden bij het deactiveren van het drankje.');
	}

	return new Response(null, { status: 200 });
};