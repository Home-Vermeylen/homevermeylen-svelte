import { z } from 'zod';
import { type DateValue } from '@internationalized/date';

export const gebruikersnamen = [
	'Lustrum2',
	'Lustrum1',
	'Scriptor',
	'PR-Extern',
	'PR-Intern',
	'Milieu',
	'Cantor',
	'Zeden',
	'Meter2',
	'Meter1',
	'Peter2',
	'Peter1',
	'VM3',
	'VM2',
	'VM1',
	'Internationaal',
	'Schachtentemmer',
	'ICT',
	'Secretaris',
	'Bar2',
	'Bar1',
	'Feest2',
	'Feest1',
	'Sport2',
	'Sport1',
	'Cultuur2',
	'Cultuur1',
	'Penning',
	'Praeses',
	'Vice-Praeses'
] as const;

export const LoginGebruikerSchema = z.object({
	gebruikersnaam: z
		.enum(gebruikersnamen, { required_error: 'Selecteer een gebruiker.' })
		.default('Praeses'),
	wachtwoord: z.string({ required_error: 'Wachtwoord is een verplicht veld.' })
});

export const VerslagSchema = z.object({
	id: z.string().optional(),
	pdf: z.instanceof(File).optional(),
	naam: z.string({ required_error: 'Naam is een verplicht veld.' })
});
export const VerwijderVerslagenSchema = z.object({
	ids: z.array(z.string())
});

export const AugustjesSchema = z.object({
	id: z.string().optional(),
	pdf: z.instanceof(File).optional(),
	naam: z.string({ required_error: 'Naam is een verplicht veld.' })
});
export const VerwijderAugustjesSchema = z.object({
	ids: z.array(z.string())
});

export const ActiviteitSchema = z.object({
	id: z.string(),
	naam: z.string({ required_error: 'Naam is een verplicht veld.' }),
	omschrijving: z.string({ required_error: 'Omschrijving is een verplicht veld.' }),
	locatie: z.string().optional(),
	datum: z.any({ required_error: 'Datum is een verplicht veld.' }),
	activiteitstype: z.string({ required_error: 'Activiteitstype is een verplicht veld.' }),
	banner: z.instanceof(File).optional(),
	formlink: z.string().optional()
});

export const VerwijderActiviteitenSchema = z.object({
	ids: z.array(z.string())
});

export const ProfielSchema = z.object({
	id: z.string(),
	voornaam: z.string({ required_error: 'Voornaam is een verplicht veld.' }),
	familienaam: z.string({ required_error: 'Familienaam is een verplicht veld.' }),
	avatar: z.instanceof(File).optional(),
	studierichting: z.string().optional(),
	woonplaats: z.string().optional(),
	oud_wachtwoord: z.string().optional(),
	nieuw_wachtwoord: z.string().optional()
});

export const WachtwoordSchema = z.object({
	id: z.string(),
	oldPassword: z.string(),
	password: z.string(),
	passwordConfirm: z.string()
});

export const FakkelsBakkenSchema = z.object({
	id: z.string(),
	fakkels: z.number({ coerce: true }),
	bakken: z.number({ coerce: true })
});

export const NieuweConnectieSchema = z.object({
	id1: z.string(),
	id2: z.string(),
	type: z.enum(['GEMUILD', 'SEKS', 'RELATIE']),
	locatie: z.string().optional(),
	commentaar: z.string().optional()
});

export const NieuwePersoonSchema = z.object({
	naam: z.string(),
	club: z.string()
});

export const VerkiezingenSchema = z.object({
	id: z.string(),
	naam: z.string(),
	type: z.string(),
	stemgerechtigde_homeraadsleden: z.array(z.string()).optional(),
	toegangscodes: z.array(z.string()),
	kandidaten: z.array(
		z.object({
			id: z.string(),
			voornaam: z.string(),
			familienaam: z.string(),
			ambitie: z.string(),
			opties: z.array(
				z.object({
					titel: z.string(),
					stemmen: z.number()
				})
			),
			gestemd: z.array(z.string())
		})
	),
	praesidium: z.string(),
	actief: z.boolean()
});

export const KandidaatSchema = z.object({
	voornaam: z.string(),
	familienaam: z.string(),
	ambitie: z.string(),
	opties: z.string(),
	id: z.string(),
	status: z.string()
});

export const StemSchema = z.object({
	stemmer_id: z.string(),
	verkiezing_id: z.string(),
	kandidaat_id: z.string(),
	optie_titel: z.string()
});
