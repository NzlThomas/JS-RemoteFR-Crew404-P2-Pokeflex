export interface IndexType {
  id: string;
  name: string;
  url: string;
}

export interface IndexPokemonType {
  pokemon: IndexType;
  slot: number;
}

export interface PokemonTypeListResponse {
  id: number;
  pokemon: IndexPokemonType[];
}

const PokemonType: IndexType[] = [
  {
    id: "1",
    name: "Normal",
    url: "https://pokeapi.co/api/v2/type/1/",
  },
  {
    id: "2",
    name: "Combat",
    url: "https://pokeapi.co/api/v2/type/2/",
  },
  {
    id: "3",
    name: "Vol",
    url: "https://pokeapi.co/api/v2/type/3/",
  },
  {
    id: "4",
    name: "Poison",
    url: "https://pokeapi.co/api/v2/type/4/",
  },
  {
    id: "5",
    name: "Sol",
    url: "https://pokeapi.co/api/v2/type/5/",
  },
  {
    id: "6",
    name: "Roche",
    url: "https://pokeapi.co/api/v2/type/6/",
  },
  {
    id: "7",
    name: "Insecte",
    url: "https://pokeapi.co/api/v2/type/7/",
  },
  {
    id: "8",
    name: "Spectre",
    url: "https://pokeapi.co/api/v2/type/8/",
  },
  {
    id: "9",
    name: "Acier",
    url: "https://pokeapi.co/api/v2/type/9/",
  },
  {
    id: "10",
    name: "Feu",
    url: "https://pokeapi.co/api/v2/type/10/",
  },
  {
    id: "11",
    name: "Eau",
    url: "https://pokeapi.co/api/v2/type/11/",
  },
  {
    id: "12",
    name: "Plante",
    url: "https://pokeapi.co/api/v2/type/12/",
  },
  {
    id: "13",
    name: "Electrik",
    url: "https://pokeapi.co/api/v2/type/13/",
  },
  {
    id: "14",
    name: "Psy",
    url: "https://pokeapi.co/api/v2/type/14/",
  },
  {
    id: "15",
    name: "Glace",
    url: "https://pokeapi.co/api/v2/type/15/",
  },
  {
    id: "16",
    name: "Dragon",
    url: "https://pokeapi.co/api/v2/type/16/",
  },
  {
    id: "17",
    name: "Ténèbres",
    url: "https://pokeapi.co/api/v2/type/17/",
  },
  {
    id: "18",
    name: "Fée",
    url: "https://pokeapi.co/api/v2/type/18/",
  },
  {
    id: "19",
    name: "Stellaire",
    url: "https://pokeapi.co/api/v2/type/19/",
  },
  {
    id: "20",
    name: "Inconnu",
    url: "https://pokeapi.co/api/v2/type/10001/",
  },
];

export default PokemonType;
