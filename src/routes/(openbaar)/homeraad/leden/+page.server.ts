import { serializeNonPOJOs } from '$lib/utils.js';

export async function load({ request, locals }) {
	const sorteer_door_functie = (a: string, b: string): number => {
		return functie_rank(b) - functie_rank(a);
	};

	const functie_rank = (functie: string) => {
		switch (functie) {
			case 'Praeses':
				return 20;
			case 'Vice-Praeses':
				return 19;
			case 'Penning':
				return 18;
			case 'Secretaris':
				return 17;
			case 'ICT':
				return 16;
			case 'Milieu':
				return 15;
			case 'Sport':
				return 14;
			case 'Feest':
				return 13;
			case 'Bar':
				return 12;
			case 'PR-Intern':
				return 11;
			case 'PR-Extern':
				return 10;
			case 'Cultuur':
				return 9;
			case 'Schachtentemmer':
				return 8;
			case 'Scriptor':
				return 7;
			case 'Zeden':
				return 6;
			case 'Internationaal':
				return 5;
			case 'Cantor':
				return 4;
			case 'Meter':
				return 3;
			case 'Peter':
				return 2;
			case 'Lustrum':
				return 1;
			case 'VM':
				return 0;
			default:
				return -1;
		}
	};

	const academiejaar_query = new URL(request.url).searchParams.get('aj');

	const academiejaren = await locals.pb
		.collection('praesidium_openbaar')
		.getFullList()
		.then((res: any) =>
			res.map((val: any) => {
				return val.academiejaar;
			})
		);

	let praesidium_leden: any[] = (
		await locals.pb
			.collection('praesidium_openbaar')
			.getFirstListItem(`academiejaar = "${academiejaar_query ?? locals.academiejaar}"`, {
				expand: 'praesidium_leden, praesidium_leden.gebruiker'
			})
	).expand.praesidium_leden;

	praesidium_leden = [].sort.call(praesidium_leden, (a, b) =>
		sorteer_door_functie((a as any).functie, (b as any).functie)
	);

	return {
		praesidium_leden: serializeNonPOJOs(praesidium_leden),
		huidig_academiejaar: locals.academiejaar,
		academiejaar_query: new URL(request.url).searchParams.get('aj'),
		academiejaren
	};
}
