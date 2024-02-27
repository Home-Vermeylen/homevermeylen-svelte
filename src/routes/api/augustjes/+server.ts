import { AugustjesSchema } from '$lib/schemas';
import type { PRAESIDIUM } from '$lib/types';
import { serializeNonPOJOs } from '$lib/utils.js';
import { error, fail, json } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';
import { actionResult, superValidate } from 'sveltekit-superforms/server';

/// Mapping met ´augustjes´ in de database
export interface Augustje {
    id: string,
    naam: string,
    bestand: string,
    praesidium: PRAESIDIUM,
    created: Date,
    updated: Date
}

export async function GET({ locals, url }) {
	const academiejaar_query = undefined;

	const augustjes = await locals.pb
		.collection('augustjes')
		.getFullList({
			filter: `praesidium.academiejaar = "${academiejaar_query ?? locals.academiejaar}"`
		})
		.then((r) => {
            return r.map((a) => {
                return {
                    ...a,
                    created: new Date(a.created),
                    bestand: locals.pb.files.getUrl(a, a.bestand)
                } as any as Augustje
            }).toSorted((a, b) => {
				return b.created.getTime() - a.created.getTime();
			})
		});

	return json(augustjes);
}

export async function POST({ locals, request }) {
    const origineleData = await request.clone().formData();

		const form = await superValidate(origineleData, AugustjesSchema);

		if (!locals.pb.authStore.isValid) {
            return actionResult('failure', {form}, 403)
        }
    
        if (!form.valid) {
            return actionResult('failure', { form }, 400);
        }

		if ((origineleData.get('bestand') as any).size == 0) {
			origineleData.delete('bestand');
		}


		try {
			if (form.data.id) {
				await locals.pb.collection('augustjes').update(form.data.id, origineleData);
			} else {
				await locals.pb.collection('augustjes').create(origineleData);
			}
		} catch (err) {
			return actionResult('error', {form}, 500);
		}

		return actionResult('success', {form}, 200);
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
