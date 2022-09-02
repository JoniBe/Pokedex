<template>
  <div class="h-screen grid grid-cols-1 justify-items-center gap-y-6 py-6">
    <div class="md:w-1/4 sm:w-auto">
      <CustomInput
        v-model="searchValue"
        :error="errorValue"
        label="Enter search value..."
        @keypress.enter="fetchPokemonByName"
      />

      <div class="text-center flex flex-row justify-center gap-x-2">
        <CustomButton
          label="Search"
          :loading="loading"
          primary
          @click="onSearchHandler"
        />

        <CustomButton
          label="Reset"
          :loading="loading"
          primary
          @click="onResetHandler"
        />
      </div>
    </div>

    <div class="md:w-3/4">
        <ResultTable :data="data" @open-details="onOpenDetailsHandler" />
    </div>

    <template v-if="showPagination">
      <div class="w-3/4">
        <CustomPagination />
      </div>
    </template>
  </div>

  <DetailsModal v-model="selectedItem" v-model:show="open" />
</template>

<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";

import CustomInput from "/src/components/CustomInput.vue";
import CustomButton from "/src/components/CustomButton.vue";
import CustomPagination from "/src/components/CustomPagination.vue";
import ResultTable from "./components/ResultTable.vue";
import DetailsModal from './components/DetailsModal.vue';

import { getPokemonById } from '/src/core/services/search.services';

import { useMainStore } from "/src/store/main";

const { getPokemonByName, getAllPokemon, resetList, $state } = useMainStore();

defineComponent({
  name: "HomeView",
  components: {
    CustomInput,
    CustomButton,
    CustomPagination,
    ResultTable,
    DetailsModal
  },
});

// Refs
const searchValue = ref("");
const errorValue = ref("");
const loading = ref(false);
const open = ref(false);
const selectedItem = ref({});

// Computed
const data = computed(() => {
  if($state.filteredPokemons.length > 0)
    return $state.filteredPokemons;
  
  return $state.paginatedPokemons;
});
const showPagination = computed(() => data.value.length > 1);
const pagination = computed(() => $state.pagination);

// Fetchs
const fetchPokemonByName = async () => {
  errorValue.value = "";

  loading.value = true;

  const { value } = searchValue;

  if (value) {
    getPokemonByName(value);
  } else {
    errorValue.value = "Please, write a Pokemon name.";
  }

  loading.value = false;
};

const fetchPokemons = async () => {
  loading.value = true;

  await getAllPokemon();

  loading.value = false;
};

// Handlers
const onSearchHandler = async () => {
  await fetchPokemonByName();
};

const onResetHandler = async() => {
  errorValue.value = "";
  searchValue.value = ""
  
  resetList();
}

const onOpenDetailsHandler = async (id: number) => {
  const data = await getPokemonById(id);

  const item = {
    id: data.id,
    name: data.name,
    abilities: data.abilities.map((x: any) => ({
      name: x.ability.name,
    })),
    types: data.types.map((x: any) => ({
      name: x.type.name,
    })),
  };

  selectedItem.value = { ...item };
  open.value = true;
};

// Lifecycle
onMounted(async () => {
  fetchPokemons();
});
</script>
