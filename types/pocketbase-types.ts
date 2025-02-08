/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Activiteiten = "activiteiten",
	Augustjes = "augustjes",
	Functies = "functies",
	Praesidia = "praesidia",
	PraesidiumLeden = "praesidium_leden",
	Verslagen = "verslagen",
	Verkiezingen = "verkiezingen"
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ActiviteitenActiviteitstypeOptions {
	"BAR" = "BAR",
	"CANTUS" = "CANTUS",
	"SPORT" = "SPORT",
	"CULTUUR" = "CULTUUR",
	"FEEST" = "FEEST",
	"ANDERE" = "ANDERE",
}

export enum VerkiezingenTypeOptions {
	"OPENBAAR" = "OPENBAAR",
	"BEPERKT" = "BEPERKT"
}

export type ActiviteitenRecord = {
  id: string,
	activiteitstype?: ActiviteitenActiviteitstypeOptions
	banner?: string
	datum?: Date,
	locatie?: string
	naam?: string
	omschrijving?: string,
  formlink?: string,
	praesidium?: RecordIdString
}

export type AugustjesRecord = {
	naam?: string
	pdf?: string
	praesidium: RecordIdString
}

export type FunctiesRecord = never

export type PraesidiaRecord = {
	academiejaar: string
}

export type PraesidiumLedenRecord = {
	avatar?: string
	bakken?: number
	fakkels?: number
	familienaam?: string
	functie?: RecordIdString
	praesidium?: RecordIdString
	studierichting?: string
	voornaam?: string
	woonplaats?: string
}

export type VerslagenRecord = {
	naam?: string
	pdf?: string
	praesidium: RecordIdString
}

export type VerkiezingenRecord = {
	naam?: string,
	type?: VerkiezingenTypeOptions,
	stemgerechtigde_functies?: RecordIdString[],
	toegangscodes?: string[],
	kandidaten?: Array<{ id: string, voornaam: string, achternaam: string, ambitie: string, opties: Array<{ titel: string, stemmen: number }>, gestemd: string[], status: "STANDBY" | "IN_STEMMING" | "GESTEMD" }>,
	praesidium?: RecordIdString,
	actief?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type ActiviteitenResponse<Texpand = unknown> = Required<ActiviteitenRecord> & BaseSystemFields<Texpand>
export type AugustjesResponse<Texpand = unknown> = Required<AugustjesRecord> & BaseSystemFields<Texpand>
export type FunctiesResponse<Texpand = unknown> = Required<FunctiesRecord> & AuthSystemFields<Texpand>
export type PraesidiaResponse<Texpand = unknown> = Required<PraesidiaRecord> & BaseSystemFields<Texpand>
export type PraesidiumLedenResponse<Texpand = unknown> = Required<PraesidiumLedenRecord> & BaseSystemFields<Texpand>
export type VerslagenResponse<Texpand = unknown> = Required<VerslagenRecord> & BaseSystemFields<Texpand>
export type VerkiezingenResponse<Texpand = unknown> = Required<VerkiezingenRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	activiteiten: ActiviteitenRecord
	augustjes: AugustjesRecord
	functies: FunctiesRecord
	praesidia: PraesidiaRecord
	praesidium_leden: PraesidiumLedenRecord
	verslagen: VerslagenRecord,
	verkiezingen: VerkiezingenRecord
}

export type CollectionResponses = {
	activiteiten: ActiviteitenResponse
	augustjes: AugustjesResponse
	functies: FunctiesResponse
	praesidia: PraesidiaResponse
	praesidium_leden: PraesidiumLedenResponse
	verslagen: VerslagenResponse,
	verkiezingen: VerkiezingenResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'activiteiten'): RecordService<ActiviteitenResponse>
	collection(idOrName: 'augustjes'): RecordService<AugustjesResponse>
	collection(idOrName: 'functies'): RecordService<FunctiesResponse>
	collection(idOrName: 'praesidia'): RecordService<PraesidiaResponse>
	collection(idOrName: 'praesidium_leden'): RecordService<PraesidiumLedenResponse>
	collection(idOrName: 'verslagen'): RecordService<VerslagenResponse>
	collection(idOrName: 'verkiezingen'): RecordService<VerkiezingenResponse>
}
