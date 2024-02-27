
export type PRAESIDIUMFUNCTIE = "Praeses" | "Vice-Praeses" | "Penning" | "Cultuur" | "Sport" | "Feest" | "Bar" | "Secretaris"| "ICT" | "Schachtentemmer" | "Internationaal" | "VM" | "Peter" | "Meter" | "Zeden" | "Cantor" | "Milieu" | "PR-Intern" | "PR-Extern" | "Scriptor" | "Lustrum";
export type PRAESIDIUM = string;
export type ACADEMIEJAAR = string;







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