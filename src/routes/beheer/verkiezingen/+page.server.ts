import { VerkiezingenSchema } from '$lib/schemas.js';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({fetch}) => {
    return {
        verkiezingen: fetch('/api/verkiezingen').then(async (data) => data.json()),
        form: await superValidate(zod(VerkiezingenSchema))
    }
};