import {
  PokemonResult,
  PokemonDetails,
  Pagination,
} from "src/core/models/index";
import { defineStore } from "pinia";

import {
  getPokemonById,
  getPokemonEntries,
} from "/src/core/services/search.services";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      allPokemons: [] as Array<any>,
      paginatedPokemons: [] as Array<any>,
      filteredPokemons: [] as Array<any>,
      pagination: {
        perPage: 15,
        currentPage: 1,
        nextPage: 0,
        previousPage: 0,
        totalPages: 0,
        total: 0,
        offset: 0,
        pages: 0,
      } as Pagination,
    };
  },

  getters: {},

  actions: {
    setPaginatedPokemons(pokemons?: Array<any> | undefined) {
      this.$state.filteredPokemons = [];

      if (pokemons && pokemons.length == 1) {
        this.$state.filteredPokemons = [...pokemons];
      } else {
        const items = [...this.$state.allPokemons];

        const { currentPage, perPage } = this.$state.pagination;
        const offset = (currentPage - 1) * perPage;

        // Paginated items
        this.$state.paginatedPokemons = items.slice(offset).slice(0, perPage);

        // Pagination config
        this.$state.pagination.offset = offset;
        this.$state.pagination.totalPages = Math.ceil(items.length / perPage);
        this.$state.pagination.previousPage =
          currentPage - 1 ? currentPage - 1 : 0;
        this.$state.pagination.nextPage =
          currentPage + 1 ? currentPage + 1 : 0;
        this.$state.pagination.total = items.length;
      }
    },

    setCurrentPage(page: number) {
      this.$state.pagination.currentPage = page;
    },

    async getAllPokemon() {
      if (this.$state.allPokemons.length === 0) {
        const { pokemon_entries } = await getPokemonEntries();

        const pokemons = pokemon_entries.map((x: PokemonResult) => ({
          id: x.entry_number,
          name: x.pokemon_species.name,
          details: x.pokemon_species.url,
        }));

        this.$state.allPokemons = [...pokemons];

        this.setPaginatedPokemons();
      }
    },

    async goToPage(page: number) {
      this.setCurrentPage(page);
      this.setPaginatedPokemons();
    },

    async resetList() {
      this.setPaginatedPokemons();
    },

    async getPokemonByName(name: string) {
      if (name) {
        const pokemons = this.$state.allPokemons.filter((x: any) =>
          x.name.toLowerCase().includes(name.toLowerCase())
        );

        if (pokemons) {
          this.setPaginatedPokemons(pokemons);
        }
      } else {
        this.resetList();
      }
    },
  },
});
