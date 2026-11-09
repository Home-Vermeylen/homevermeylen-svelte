import { NieuweConnectieSchema, NieuwePersoonSchema } from '$lib/schemas.js';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';

function normaliseerNaam(naam: string) {
	return naam.trim().replace(/\s+/g, ' ').toLowerCase();
}

function formatteerNaam(naam: string) {
	return naam
		.trim()
		.replace(/\s+/g, ' ')
		.toLowerCase()
		.replace(/\b\w/g, (letter: string) => letter.toUpperCase());
}

function formatteerClub(club: string) {
	const naam = club
		.trim()
		.replace(/\s+/g, ' ')
		.toLowerCase();

	if (naam === 'vermeylen' || naam === 'home vermeylen') {
		return 'Vermeylen';
	}

	return naam.replace(/\b\w/g, (letter: string) => letter.toUpperCase());
}

async function vindOfMaakPersoon(
	pb: App.Locals['pb'],
	netwerkId: string,
	naam: string,
	club: string
) {
	const personen = await pb.collection('vriendschapsnetwerk_personen').getFullList({
		filter: `netwerk = "${netwerkId}"`
	});

	const genormaliseerdeNaam = normaliseerNaam(naam);
	const genormaliseerdeClub = normaliseerNaam(formatteerClub(club));

	const bestaand = personen.find(
		(persoon) =>
			normaliseerNaam(persoon.naam) === genormaliseerdeNaam &&
			normaliseerNaam(formatteerClub(persoon.club)) === genormaliseerdeClub
	);

	if (bestaand) {
		// Bestaande persoon hergebruiken en eventueel de clubnaam corrigeren
		if (bestaand.club !== formatteerClub(club)) {
			return await pb.collection('vriendschapsnetwerk_personen').update(bestaand.id, {
				club: formatteerClub(club)
			});
		}

		return bestaand;
	}

	return await pb.collection('vriendschapsnetwerk_personen').create({
		netwerk: netwerkId,
		naam: formatteerNaam(naam),
		club: formatteerClub(club)
	});
}

export const load: PageServerLoad = async ({ fetch }) => {
	const netwerk = await fetch('/api/vriendschapsnetwerk').then(async (response) => {
		return await response.json();
	});

	return {
		breadcrumb: {
			label: 'Vriendschapsnetwerk',
			href: '/beheer/vriendschapsnetwerk'
		},
		netwerk,
		nieuwe_connectie_form: await superValidate(zod4(NieuweConnectieSchema)),
		nieuwe_persoon_form: await superValidate(zod4(NieuwePersoonSchema))
	};
};

export const actions = {
	nieuwe_connectie: async ({ request, locals }) => {
		if (!locals.pb.authStore.isValid) {
			return fail(403, { error: 'Niet gemachtigd' });
		}

		const form = await superValidate(request, zod4(NieuweConnectieSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const praesidiumId = locals.praesidium?.id;

		if (!praesidiumId) {
			return fail(400, { form, error: 'Geen praesidium gevonden' });
		}

		try {
			const netwerk = await locals.pb
				.collection('vriendschapsnetwerk')
				.getFirstListItem(`praesidium = "${praesidiumId}"`);

			const persoon1 = await vindOfMaakPersoon(
				locals.pb,
				netwerk.id,
				form.data.persoon1_naam,
				form.data.persoon1_club
			);

			const persoon2 = await vindOfMaakPersoon(
				locals.pb,
				netwerk.id,
				form.data.persoon2_naam,
				form.data.persoon2_club
			);

			const bestaandeConnecties = await locals.pb
	.collection('vriendschapsnetwerk_connecties')
	.getFullList({
		filter: `netwerk = "${netwerk.id}"`
	});

const bestaatAl = bestaandeConnecties.some(
	(connectie) =>
		connectie.type === form.data.type &&
		((connectie.persoon1 === persoon1.id && connectie.persoon2 === persoon2.id) ||
			(connectie.persoon1 === persoon2.id && connectie.persoon2 === persoon1.id))
);

if (bestaatAl) {
	return fail(400, {
		form,
		error: 'Deze connectie bestaat al.'
	});
}

await locals.pb.collection('vriendschapsnetwerk_connecties').create({
	netwerk: netwerk.id,
	persoon1: persoon1.id,
	persoon2: persoon2.id,
	type: form.data.type,
	extra_info: form.data.extra_info ?? ''
});

console.log('CONNECTIE SUCCESVOL TOEGEVOEGD');

return message(form, {
	type: 'success',
	text: 'Connectie succesvol toegevoegd.'
});
		} catch (error) {
			console.error('Fout bij toevoegen connectie:', error);

			return fail(500, {
				form,
				error: 'De connectie kon niet worden toegevoegd.'
			});
		}
	}
};