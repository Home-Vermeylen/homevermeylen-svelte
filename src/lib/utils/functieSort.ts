// Functie-rangorde definiëren
export const functie_rank = (functie: string) => {
  if (!functie) return -1;
  const f = functie.toLowerCase().replace(/[0-9]/g, '').replace(/_/g, '-').trim();
  switch (f) {
    case 'praeses': return 21;
    case 'vice-praeses': return 20;
    case 'penning': return 19;
    case 'secretaris': return 18;
    case 'ict': return 17;
    case 'milieu': return 16;
    case 'keizer-sport': return 15;
    case 'sport': return 14;
    case 'bar': return 13;
    case 'cultuur': return 12;
    case 'feest': return 11;
    case 'pr-extern': return 10;
    case 'pr-intern': return 9;
    case 'scriptor': return 8;
    case 'internationaal': return 7;
    case 'schachtentemmer': return 6;
    case 'zeden': return 5;
    case 'cantor': return 4;
    case 'lustrum': return 3;
    case 'meter': return 2;
    case 'peter': return 1;
    case 'vm': return 0;
    default: return -1;
  }
};

// Sorteerfunctie voor arrays van leden
export const sorteer_door_functie = (functieA: string, functieB: string) => {
  return functie_rank(functieB) - functie_rank(functieA);
};
