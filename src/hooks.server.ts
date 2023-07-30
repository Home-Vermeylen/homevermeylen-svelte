import PocketBase, { Record } from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';

export const handle = async ({event, resolve }) => {
    event.locals.pb = new PocketBase(import.meta.env.VITE_PUBLIC_POCKETBASE_URL);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    if (event.locals.pb.authStore.isValid) {
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model) as Record;
    } else {
        event.locals.user = undefined;
    }

    const response = await resolve(event);

    // TODO: Veilig maken
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure : false }));

    return response;
}