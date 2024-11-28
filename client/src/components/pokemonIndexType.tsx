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
    name: "Fighting",
    url: "https://pokeapi.co/api/v2/type/2/",
  },
  {
    id: "3",
    name: "Flying",
    url: "https://pokeapi.co/api/v2/type/3/",
  },
  {
    id: "4",
    name: "Poison",
    url: "https://pokeapi.co/api/v2/type/4/",
  },
  {
    id: "5",
    name: "Ground",
    url: "https://pokeapi.co/api/v2/type/5/",
  },
  {
    id: "6",
    name: "Rock",
    url: "https://pokeapi.co/api/v2/type/6/",
  },
  {
    id: "7",
    name: "Bug",
    url: "https://pokeapi.co/api/v2/type/7/",
  },
  {
    id: "8",
    name: "Ghost",
    url: "https://pokeapi.co/api/v2/type/8/",
  },
  {
    id: "9",
    name: "Steel",
    url: "https://pokeapi.co/api/v2/type/9/",
  },
  {
    id: "10",
    name: "Fire",
    url: "https://pokeapi.co/api/v2/type/10/",
  },
  {
    id: "11",
    name: "Water",
    url: "https://pokeapi.co/api/v2/type/11/",
  },
  {
    id: "12",
    name: "Grass",
    url: "https://pokeapi.co/api/v2/type/12/",
  },
  {
    id: "13",
    name: "Electric",
    url: "https://pokeapi.co/api/v2/type/13/",
  },
  {
    id: "14",
    name: "Psychic",
    url: "https://pokeapi.co/api/v2/type/14/",
  },
  {
    id: "15",
    name: "Ice",
    url: "https://pokeapi.co/api/v2/type/15/",
  },
  {
    id: "16",
    name: "Dragon",
    url: "https://pokeapi.co/api/v2/type/16/",
  },
  {
    id: "17",
    name: "Dark",
    url: "https://pokeapi.co/api/v2/type/17/",
  },
  {
    id: "18",
    name: "Fairy",
    url: "https://pokeapi.co/api/v2/type/18/",
  },
];

export default PokemonType;
