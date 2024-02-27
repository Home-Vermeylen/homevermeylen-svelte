import { ActiviteitSchema } from '$lib/schemas';
import { error, fail, json } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';
import { actionResult, superValidate } from 'sveltekit-superforms/server';

export type ACTIVITEITSTYPE = 'BAR' | 'CANTUS' | 'SPORT' | 'CULTUUR' | 'FEEST' | 'ANDERE';

/// Mapping met ´activiteiten_openbaar´ in de database
export interface PubliekeActiviteit {
	id: string;
	naam: string;
	omschrijving: string;
	locatie: string;
	datum: Date;
	activiteitstype: ACTIVITEITSTYPE;
	banner: string;
	inschrijven: boolean;
	formlink: string;
}

/// Mapping met ´activiteiten´ in de database
export interface Activiteit {
	id: string;
	naam: string;
	omschrijving: string;
	locatie: string;
	datum: Date;
	activiteitstype: ACTIVITEITSTYPE;
	banner: string;
	inschrijven: boolean;
	formlink: string;
	praesidium: PRAESIDIUM;
	gepubliceerd: boolean;
	created: Date;
	updated: Date;
}

export async function GET({ locals }) {
	const a = await locals.pb
		.collection('activiteiten_openbaar')
		.getFullList()
		.then((r: RecordModel[]) => {
			return r.map((a: RecordModel) => {
				return {
					...a,
					banner: locals.pb.files.getUrl(a, a.banner),
					datum: new Date(a.datum)
				} as any as PubliekeActiviteit;
			});
		});

	const opkomende_activiteiten = a
		.filter((a: Activiteit) => {
			return a.datum.getTime() >= new Date().getTime();
		})
		.sort((a: Activiteit, b: Activiteit) => a.datum.getTime() - b.datum.getTime());
	const afgelopen_activiteiten = a
		.filter((a: Activiteit) => {
			return a.datum.getTime() < new Date().getTime();
		})
		.sort((a: Activiteit, b: Activiteit) => b.datum.getTime() - a.datum.getTime());
	return json({ opkomende_activiteiten, afgelopen_activiteiten });
}

export async function POST({ locals, request }) {
	const origineleData = await request.clone().formData();

	const form = await superValidate(request, ActiviteitSchema);

    if (!locals.pb.authStore.isValid) {
        return actionResult('failure', {form}, 403)
    }

	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	if ((origineleData.get('banner') as any).size == 0) {
		origineleData.delete('banner');
	}

	origineleData.set('inschrijven', origineleData.get('inschrijven') ? 'true' : 'false');
	origineleData.set('datum', new Date(origineleData.get('datum') as string).toISOString());

	try {
		if (form.data.id) {
			await locals.pb.collection('activiteiten').update(form.data.id, origineleData);
		} else {
			await locals.pb.collection('activiteiten').create(origineleData);
		}
	} catch (err) {
		return actionResult('error', { form }, 500);
	}

	return actionResult('success', { form }, 200);
}

export async function DELETE({ locals, request }) {
	const data = await request.json();

    if (!locals.pb.authStore.isValid) {
        fail(403);
    }

	try {
		await locals.pb.collection('activiteiten').delete(data.id);
	} catch (err) {
		error(500, 'Er is een probleem opgetreden bij het verwijderen van de activiteit.');
	}

    return new Response(undefined, { status: 200 });
}
