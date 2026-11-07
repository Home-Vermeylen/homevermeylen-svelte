import { StemSchema } from '$lib/schemas.js';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const form = await superValidate(event, zod4(StemSchema));

	if (!form.valid) {
		form.message = { type: 'error', text: 'Stemmen mislukt!' };
		return actionResult('failure', { form }, 400);
	}

	try {
		// Controleer of de verkiezing overeenkomt met de URL.
		if (form.data.verkiezing_id !== event.params.id) {
			form.message = { type: 'error', text: 'Ongeldige verkiezing.' };
			return actionResult('failure', { form }, 400);
		}

		// Haal de verkiezing rechtstreeks uit PocketBase.
		const verkiezing = await event.locals.pb
			.collection('verkiezingen')
			.getOne(event.params.id) as {
				id: string;
				actief: boolean;
				stemgerechtigde_functies: string[];
				toegangscodes: string[];
				stemmingen: {
					id: string;
					naam: string;
					status: string;
					opties: {
						id: string;
						naam: string;
						stemmen: number;
					}[];
					gestemd: string[];
				}[];
			};

		// Alleen actieve verkiezingen laten stemmen.
		if (!verkiezing.actief) {
			form.message = { type: 'error', text: 'Deze verkiezing is niet actief.' };
			return actionResult('failure', { form }, 403);
		}

		// Bepaal de identiteit van de stemmer op de server.
const accountId = event.locals.pb.authStore.isValid
	? event.locals.pb.authStore.model?.id
	: undefined;

let stemmerId: string | undefined;

if (accountId) {
	// Ingelogde gebruikers moeten zelf stemgerechtigd zijn.
	if (verkiezing.stemgerechtigde_functies?.includes(accountId)) {
		stemmerId = accountId;
	}
} else {
	// Niet-ingelogde gebruikers moeten een geldige QR-code hebben.
	if (verkiezing.toegangscodes?.includes(form.data.stemmer_id)) {
		stemmerId = form.data.stemmer_id;
	}
}

		if (!stemmerId) {
			form.message = { type: 'error', text: 'Je bent niet stemgerechtigd.' };
			return actionResult('failure', { form }, 403);
		}

		// Zoek de stemming.
		const stemming = verkiezing.stemmingen.find(
			(a) => a.id === form.data.stemming_id
		);

		if (!stemming) {
			form.message = { type: 'error', text: 'Deze stemming bestaat niet.' };
			return actionResult('failure', { form }, 404);
		}

		// Alleen zichtbare stemmingen zijn toegankelijk.
		if (stemming.status !== 'zichtbaar') {
			form.message = { type: 'error', text: 'Deze stemming is niet geopend.' };
			return actionResult('failure', { form }, 403);
		}

		// Controleer of deze stemmer al gestemd heeft.
		if (stemming.gestemd?.includes(stemmerId)) {
			form.message = { type: 'error', text: 'Je hebt al gestemd.' };
			return actionResult('failure', { form }, 403);
		}

		// Controleer of de gekozen optie bestaat.
		const gekozenOptie = stemming.opties.find(
			(a) => a.id === form.data.optie
		);

		if (!gekozenOptie) {
			form.message = { type: 'error', text: 'Ongeldige stemkeuze.' };
			return actionResult('failure', { form }, 400);
		}

		// Werk de stemmen bij.
		const stemmingen = verkiezing.stemmingen.map((a) => {
			if (a.id !== stemming.id) {
				return a;
			}

			return {
				...a,
				opties: a.opties.map((b) => {
					if (b.id === gekozenOptie.id) {
						return {
							...b,
							stemmen: (b.stemmen ?? 0) + 1
						};
					}

					return b;
				}),
				gestemd: [...(a.gestemd ?? []), stemmerId]
			};
		});

		await event.locals.pb.collection('verkiezingen').update(verkiezing.id, {
			stemmingen
		});

		form.message = { type: 'success', text: 'Stemmen gelukt!' };
		return actionResult('success', { form }, 200);
	} catch (err) {
		console.error('Fout bij registreren van stem:', err);

		form.message = { type: 'error', text: 'Stemmen mislukt!' };
		return actionResult('error', { form }, 500);
	}
};