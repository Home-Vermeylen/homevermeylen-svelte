import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '../types/pocketbase-types';

let gecachedPraesidium: any = null;
let laatstePraesidiumUpdate = 0;

const PRAESIDIUM_CACHE_DUUR = 5 * 60 * 1000;

export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(
		import.meta.env.VITE_PUBLIC_POCKETBASE_URL
	) as TypedPocketBase;

	event.locals.pb.autoCancellation(false);

	event.locals.pb.authStore.loadFromCookie(
		event.request.headers.get('cookie') || ''
	);

	// Bij telacties is een authRefresh onnodig en zorgt dit
	// voor een extra PocketBase-request per telactie.
	const isDrankentellingApi =
		event.url.pathname === '/api/drankentellingen';

	try {
		if (event.locals.pb.authStore.isValid && !isDrankentellingApi) {
			await event.locals.pb.collection('functies').authRefresh({
				expand: 'praesidiumleden_via_functies'
			});
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
	}

	if (
		event.url.pathname.startsWith('/beheer') &&
		!event.locals.pb.authStore.isValid
	) {
		redirect(303, '/login');
	}

	const nu = Date.now();

	if (
		gecachedPraesidium === null ||
		nu - laatstePraesidiumUpdate >= PRAESIDIUM_CACHE_DUUR
	) {
		try {
			gecachedPraesidium = await event.locals.pb
				.collection('praesidia')
				.getList(1, 1, {
					sort: '-academiejaar'
				})
				.then((r) => r.items[0]);

			laatstePraesidiumUpdate = nu;
				} catch (err: any) {
			console.error('Fout bij ophalen nieuwste praesidium:', err);

			// Een tijdelijke PocketHost rate limit mag de volledige app
			// niet laten crashen.
			if (err?.status === 429 || err?.response?.status === 429) {
				console.warn(
					'PocketHost rate limit bij ophalen praesidium. Bestaande cache behouden.'
				);
			} else if (gecachedPraesidium === null) {
				throw err;
			}
		}
	}

	event.locals.praesidium = gecachedPraesidium;

	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		})
	);

	return response;
};