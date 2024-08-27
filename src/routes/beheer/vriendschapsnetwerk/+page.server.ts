import { NieuweConnectieSchema, NieuwePersoonSchema } from '$lib/schemas.js'
import { zod } from 'sveltekit-superforms/adapters'
import { superValidate } from 'sveltekit-superforms/client'

export async function load({ fetch }) {
	return { 
		netwerk: fetch("/api/vriendschapsnetwerk").then(async (data) => { return data.json()}) ,
		nieuwe_connectie_form: await superValidate(zod(NieuweConnectieSchema)),
		nieuwe_persoon_form: await superValidate(zod(NieuwePersoonSchema))
	}
}

