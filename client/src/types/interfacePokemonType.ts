export interface IndexType {
    name: string;
    url: string;
}


export interface IndexPokemonType {
    pokemon: IndexType;
    slot: string;
}

export interface PokemonTypeListResponse {
    pokemon: IndexPokemonType[]; 
    id: number;
}