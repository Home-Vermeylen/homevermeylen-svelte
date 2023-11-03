export type ACTIVITEITSTYPE = "BAR" | "CANTUS" | "SPORT" | "CULTUUR" | "FEEST" | "ANDERE";
export type PRAESIDIUM = string;

/// Mapping met ´activiteiten_openbaar´ in de database
export interface PubliekeActiviteit {
    id: string,
    naam: string,
    omschrijving: string,
    locatie: string,
    datum: Date,
    activiteitstype: ACTIVITEITSTYPE,
    banner: string,
    inschrijven: boolean,
    formlink: string
}

/// Mapping met ´activiteiten´ in de database
export interface Activiteit {
    id: string,
    naam: string,
    omschrijving: string,
    locatie: string,
    datum: Date,
    activiteitstype: ACTIVITEITSTYPE,
    banner: string,
    inschrijven: boolean,
    formlink: string,
    praesidium: PRAESIDIUM,
    gepubliceerd: boolean,
    created: Date,
    updated: Date
}

/// Mapping met ´augustjes´ in de database
export interface Augustje {
    id: string,
    naam: string,
    bestand: string,
    praesidium: PRAESIDIUM,
    created: Date,
    updated: Date
}

/// Mapping met ´verslagen´ in de database
export interface Verslag {
    id: string,
    naam: string,
    bestand: string,
    praesidium: PRAESIDIUM,
    created: Date,
    updated: Date
}