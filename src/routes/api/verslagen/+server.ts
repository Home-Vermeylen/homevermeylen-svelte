import { VerslagSchema } from '$lib/schemas';
import type { PRAESIDIUM } from '$lib/types';
import { serializeNonPOJOs } from '$lib/utils.js';
import { error, fail, json } from '@sveltejs/kit';
import { actionResult, superValidate } from 'sveltekit-superforms/server';

/// Mapping met ´verslagen´ in de database
export interface Verslag {
    id: string,
    naam: string,
    bestand: string,
    praesidium: PRAESIDIUM,
    created: Date,
    updated: Date
}

export async function GET({ locals, url }) {
	const academiejaar_query = new URL(url).searchParams.get('aj');

	const verslagen = await locals.pb
		.collection('verslagen')
		.getFullList({
			filter: `praesidium.academiejaar = "${academiejaar_query ?? locals.academiejaar}"`
		})
		.then((r) => {
            return r.map((a) => {
                return serializeNonPOJOs({
                    ...a,
                    created: new Date(a.created),
                    bestand: locals.pb.files.getUrl(a, a.bestand)
                }) as Verslag
            }).sort((a, b) => {
				return b.created.getTime() - a.created.getTime();
			})
		});

	return json(verslagen);
}

export async function POST({ locals, request }) {
    const origineleData = await request.clone().formData();

		const form = await superValidate(origineleData, VerslagSchema);

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
				await locals.pb.collection('verslagen').update(form.data.id, origineleData);
			} else {
				await locals.pb.collection('verslagen').create(origineleData);
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
		await locals.pb.collection('verslagen').delete(data.id);
	} catch (err) {
		error(500, 'Er is een probleem opgetreden bij het verwijderen van het verslag.');
	}

    return new Response(undefined, { status: 200 });
}
