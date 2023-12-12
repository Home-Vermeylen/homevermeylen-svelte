export type ACTIVITEITSTYPE = "BAR" | "CANTUS" | "SPORT" | "CULTUUR" | "FEEST" | "ANDERE";
export type PRAESIDIUMFUNCTIE = "Praeses" | "Vice-Praeses" | "Penning" | "Cultuur" | "Sport" | "Feest" | "Bar" | "Secretaris"| "ICT" | "Schachtentemmer" | "Internationaal" | "VM" | "Peter" | "Meter" | "Zeden" | "Cantor" | "Milieu" | "PR-Intern" | "PR-Extern" | "Scriptor" | "Lustrum";
export type PRAESIDIUM = string;
export type ACADEMIEJAAR = string;

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

export type VERKIEZINGSTYPE = "HOMERAAD" | "HK" | "ANDERE";

export interface Verkiezing {
    id: string,
    praesidium: PRAESIDIUM,
    type: VERKIEZINGSTYPE,
    academiejaar: ACADEMIEJAAR,
    voltooid: boolean,
    codes: string[],
    rondes: VerkiezingsRonde[]
}

export interface VerkiezingsRonde {
    rondegetal: number,
    datum: Date,
    kandidaten: Kandidaat[],
    statistiek: VerkiezingsStatistiek
}

export interface Kandidaat {
    voornaam: string,
    familienaam: string,
    functie: PRAESIDIUMFUNCTIE | string,
    poging: number,
    voor: number,
    tegen: number,
    onthouding: number
}

export interface VerkiezingsStatistiek {
    tijd: number,
    stemmers: number
}