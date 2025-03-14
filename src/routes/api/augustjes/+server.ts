import { AugustjesSchema } from '$lib/schemas';
import type { PRAESIDIUM } from '$lib/types';
import { error, fail, json } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult, superValidate } from 'sveltekit-superforms/server';

/// Mapping met ´augustje´ in de database
export interface Augustje {
	id: string;
	naam: string;
	bestand: string;
	praesidium: PRAESIDIUM;
	created: Date;
	updated: Date;
}

export async function GET({ locals, url }) {
	const academiejaar_query = new URL(url).searchParams.get('aj');

	const augustjes = await locals.pb
		.collection('augustjes')
		.getFullList({
			filter: `praesidium.academiejaar = "${academiejaar_query ?? locals.praesidium?.academiejaar}"`,
			sort: '-created'
		})
		.then((r) =>
			r.map((a) => ({ ...a, created: new Date(a.created), pdf: locals.pb.files.getUrl(a, a.pdf) }))
		);

	return json(augustjes);
}

export async function POST(event) {
	const origineleData = await event.request.clone().formData();

	if ((origineleData.get('pdf') as File).size == 0) {
		origineleData.delete('pdf');
	}

	const form = await superValidate(event, zod(AugustjesSchema));
	form.data.pdf = undefined;

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	if (form.data.id) {
		try {
			await event.locals.pb.collection('augustjes').update(form.data.id, origineleData);
		} catch (err) {
			return actionResult('error', { form }, 500);
		}
	} else {
		origineleData.set('praesidium', event.locals.praesidium?.id ?? '');
		try {
			await event.locals.pb.collection('augustjes').create(origineleData);
		} catch (err) {
			return actionResult('error', { form }, 500);
		}
	}

	return actionResult('success', { form }, 200);
}

export async function DELETE({ locals, request }) {
	const data = await request.json();

	if (!locals.pb.authStore.isValid) {
		fail(403);
	}

	try {
		await locals.pb.collection('augustjes').delete(data.id);
	} catch (err) {
		error(500, 'Er is een probleem opgetreden bij het verwijderen van het augustje.');
	}

	return new Response(undefined, { status: 200 });
}
