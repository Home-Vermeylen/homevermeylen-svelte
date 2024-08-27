import { FakkelsBakkenSchema } from '$lib/schemas.js';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export async function load({ fetch }) {
    return {
        fakkels_bakken: fetch('/api/fakkels_bakken').then(r => r.json()),
        fakkels_bakken_form: await superValidate(zod(FakkelsBakkenSchema))
    }
}