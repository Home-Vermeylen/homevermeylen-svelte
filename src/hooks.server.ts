import PocketBase, { Record } from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export const handle = async ({event, resolve }) => {
    event.locals.pb = new PocketBase(import.meta.env.VITE_PUBLIC_POCKETBASE_URL);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    event.locals.pb.authStore.isValid && await event.locals.pb.collection('gebruikers').authRefresh({}, { expand: 'praesidiumlid, pro_praesidiumlid' });


    if (event.locals.pb.authStore.isValid) {
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model) as Record;
    } else {
        event.locals.user = undefined;
    }

    if (event.url.pathname.startsWith('/beheer')) {
        if (!event.locals.user?.praesidiumlid) {
            console.log(event.locals.user)
            throw redirect(303, '/login');
        }
    }

    const response = await resolve(event);
    
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ 
        secure : process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 24 * 7 // 1 week  
    }));

    return response;
}