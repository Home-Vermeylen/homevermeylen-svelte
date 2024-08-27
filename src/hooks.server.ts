import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '../types/pocketbase-types';

export const handle = async ({ event, resolve }) => {
	event.locals.pb = (new PocketBase(import.meta.env.VITE_PUBLIC_POCKETBASE_URL)) as TypedPocketBase;

	event.locals.pb.autoCancellation(false);

	event.locals.praesidium = (
		await event.locals.pb.collection('praesidia').getList(1,1, { sort: '-academiejaar' }).then(r => r.items[0])
	);

	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		event.locals.pb.authStore.isValid && await event.locals.pb.collection('functies').authRefresh({ expand: 'praesidiumleden_via_functies'});
	} catch (_) {
		event.locals.pb.authStore.clear();
	}

	if (event.url.pathname.startsWith('/beheer') && !event.locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		})
	);

	return response;
};
