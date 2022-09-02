interface PokemonResult {
    entry_number: string;
    pokemon_species: {
        name: string
        url: string
    };
}

export type { PokemonResult };