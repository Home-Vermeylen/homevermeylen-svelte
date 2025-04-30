import { z } from 'zod';

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
export const VerwijderVerslagSchema = z.object({
	id: z.string()
});

export const AugustjesSchema = z.object({
	id: z.string().optional(),
	pdf: z.instanceof(File).optional(),
	naam: z.string({ required_error: 'Naam is een verplicht veld.' })
});
export const VerwijderAugustjeSchema = z.object({
	id: z.string()
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

export const VerwijderActiviteitSchema = z.object({
	id: z.string()
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



export const VerwijderVerkiezingenSchema = z.object({
	id: z.string()
})

export const StemmingSchema = z.object({
	id: z.string(),
	ambitie: z.string(),
	status: z.string(),
	opties: z.array(
		z.object({
			id: z.string(),
			naam: z.string(),
			stemmen: z.number()
		})
	),
	gestemd: z.array(z.string())
});

export const VerwijderStemmingSchema = z.object({
	stemming_id: z.string()
})

export const VerkiezingenSchema = z.object({
	id: z.string(),
	naam: z.string(),
	stemgerechtigde_homeraadsleden: z.array(z.string()),
	toegangscodes: z.array(z.string()),
	stemmingen: z.array(StemmingSchema),
	praesidium: z.string(),
	actief: z.boolean()
});

export const StemSchema = z.object({
	stemmer_id: z.string(),
	verkiezing_id: z.string(),
	stemming_id: z.string(),
	optie: z.string()
});
