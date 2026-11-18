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

	// Authenticatiecookie inlezen
	const authCookie = event.request.headers.get('cookie') || '';

	console.log('PocketBase cookie:', {
		aanwezig: authCookie.includes('pb_auth='),
		lengte: authCookie.length,
		authStoreValid: event.locals.pb.authStore.isValid
	});

	event.locals.pb.authStore.loadFromCookie(authCookie);

	console.log('AuthStore na inlezen:', {
		isValid: event.locals.pb.authStore.isValid,
		username: event.locals.pb.authStore.model?.username
	});

	console.log('Authcontrole vóór refresh:', {
		isValid: event.locals.pb.authStore.isValid,
		username: event.locals.pb.authStore.model?.username,
		id: event.locals.pb.authStore.model?.id
	});

	const username = event.locals.pb.authStore.model?.username;
	const isTablet = username === 'Tablet';

	// Bij telacties is een authRefresh onnodig.
	const isDrankentellingApi =
		event.url.pathname === '/api/drankentellingen';

	try {
		if (
			event.locals.pb.authStore.isValid &&
			!isTablet &&
			!isDrankentellingApi
		) {
			await event.locals.pb.collection('functies').authRefresh({
				expand: 'praesidiumleden_via_functies'
			});
		}
	} catch (err) {
		console.error('Fout bij authRefresh:', err);
		event.locals.pb.authStore.clear();
	}

	console.log('Authcontrole na refresh:', {
		isValid: event.locals.pb.authStore.isValid,
		username: event.locals.pb.authStore.model?.username,
		id: event.locals.pb.authStore.model?.id
	});

	// Beheerpagina's vereisen een geldige login.
	if (
		event.url.pathname.startsWith('/beheer') &&
		!event.locals.pb.authStore.isValid
	) {
		throw redirect(303, '/login');
	}

	// Beperk de Tablet-account tot de toegestane pagina's.
if (isTablet) {
	const isTabletStartpagina =
		event.url.pathname === '/beheer/tablet';

	const isOpenBaravondPagina =
		/^\/beheer\/baravonden\/[^/]+$/.test(event.url.pathname);

	const isLogoutPagina = event.url.pathname === '/logout';

const isToegestaneTabletPagina =
	isTabletStartpagina ||
	isOpenBaravondPagina ||
	isLogoutPagina ||
	isDrankentellingApi;

if (!isToegestaneTabletPagina) {
	throw redirect(303, '/beheer/tablet');
}
}

	// Nieuwste praesidium ophalen met cache
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

	// Authenticatiecookie terugsturen
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		})
	);

	return response;
};