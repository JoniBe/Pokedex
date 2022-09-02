interface PokemonDetails {
    id: string;
    name: string,
    abilities: Array<{name: string}>;
    types: Array<{name: string}>
}

export type { PokemonDetails };