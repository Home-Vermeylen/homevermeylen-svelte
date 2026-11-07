import { BaravondSchema } from '$lib/schemas';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { zod4 } from 'sveltekit-superforms/adapters';
import { actionResult, superValidate } from 'sveltekit-superforms/server';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		error(403, 'Je bent niet gemachtigd om deze gegevens te bekijken.');
	}

	try {
		const baravonden = await locals.pb.collection('baravonden').getFullList({
			sort: '-datum',
			expand: 'praesidium'
		});

        console.log('Opgehaalde baravonden:', baravonden);
		return json(baravonden);
	} catch (err) {
		console.error('Fout bij ophalen baravonden:', err);
		error(500, 'De baravonden konden niet worden opgehaald.');
	}
};

export const POST: RequestHandler = async (event) => {
	if (!event.locals.pb.authStore.isValid) {
		error(403, 'Je bent niet gemachtigd om baravonden aan te passen.');
	}

	const form = await superValidate(event, zod4(BaravondSchema));

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	const praesidiumId = event.locals.praesidium?.id;

	if (!praesidiumId) {
		error(400, 'Er is geen huidig praesidium ingesteld.');
	}

	try {
		if (form.data.id) {
			await event.locals.pb.collection('baravonden').update(form.data.id, {
				naam: form.data.naam,
				datum: form.data.datum
			});
		} else {
			await event.locals.pb.collection('baravonden').create({
				naam: form.data.naam,
				datum: form.data.datum,
				praesidium: praesidiumId
			});
		}
	} catch (err) {
		console.error('Fout bij opslaan baravond:', err);
		return actionResult('error', { form }, 500);
	}

	return actionResult('success', { form }, 200);
};