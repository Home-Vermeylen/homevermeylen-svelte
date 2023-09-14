import { z } from 'zod';

export const LoginGebruikerSchema = z.object({
	gebruikersnaam: z.string({ required_error: 'Gebruikersnaam is een verplicht veld.' }),
	wachtwoord: z.string({ required_error: 'Wachtwoord is een verplicht veld.' })
});

export const VerslagSchema = z.object({
	praesidium: z.string(),
	id: z.string().optional(),
	verslag: z.any({ required_error: 'Bestand moet verplicht bijgevoegd worden.' }),
	naam: z.string({ required_error: 'Naam is een verplicht veld.' })
});

export const AugustjesSchema = z.object({
	praesidium: z.string(),
	id: z.string().optional(),
	augustje: z.any({ required_error: 'Bestand moet verplicht bijgevoegd worden.' }),
	naam: z.string({ required_error: 'Naam is een verplicht veld.' })
});

export const ActiviteitSchema = z.object({
	praesidium: z.string(),
	id: z.string().optional(),
	naam: z.string({ required_error: 'Naam is een verplicht veld.' }),
	omschrijving: z.string({ required_error: 'Omschrijving is een verplicht veld.' }),
	locatie: z.string().optional(),
	datum: z.string({ required_error: 'Datum is een verplicht veld.' }),
	activiteitstype: z.string({ required_error: 'Activiteitstype is een verplicht veld.' }),
	banner: z.any({ required_error: 'Bestand moet verplicht bijgevoegd worden.' }),
	inschrijven: z.string({ required_error: 'Inschrijving is een verplicht veld.' }).optional(),
	formlink: z.string().url('Veld moet een URL zijn.').optional().or(z.literal(''))
});

export const GebruikersSchema = z.object({
	id: z.string().optional(),
	voornaam: z.string({ required_error: 'Voornaam is een verplicht veld.' }),
	familienaam: z.string({ required_error: 'Familienaam is een verplicht veld.' }),
	quote: z.string().optional(),
	avatar: z.any({ required_error: 'Bestand moet verplicht bijgevoegd worden.' }),
	studierichting: z.string().optional(),
	woonplaats: z.string().optional(),
	instagram: z.string().url('Veld moet een URL zijn.').optional().or(z.literal(''))
});

export const WachtwoordSchema = z.object({
	id: z.string(),
	oldPassword: z.string(),
	password: z.string(),
	passwordConfirm: z.string()
});

export const FakkelSchema = z.object({
	id: z.string().optional(),
	praesidium: z.string(),
	gebruiker: z.string().optional(),
	aantal: z.string()
});

export const BakkenSchema = z.object({
	id: z.string().optional(),
	praesidium: z.string(),
	gebruiker: z.string().optional(),
	aantal: z.string()
});
