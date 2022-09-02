<template>
  <div
    class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 cursor-pointer"
    @click="openDetailsHandler"
  >
    <div class="flex-shrink-0">
      <img class="h-14 w-14 rounded-full" :src="model.img" :alt="model.id" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-l font-medium text-gray-700 capitalize">
        {{ model.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, defineProps, computed } from "vue";

defineComponent({
  name: "ResultCard",
});

// Props
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

// Emits
const emits = defineEmits(["open-details"]);

// Aux
const IMG_URL =
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/{0}.png";

const getPokemonImg = (id: number) => {
  let img = null;

  if (id.toString().length === 1) {
    img = IMG_URL.replace("{0}", `00${id}`);
  } else if (id.toString().length === 2) {
    img = IMG_URL.replace("{0}", `0${id}`);
  } else {
    img = IMG_URL.replace("{0}", `${id}`);
  }

  return img;
};

// Computed
const model = computed(() => {
  const result = {
    id: props.data.id,
    img: getPokemonImg(props.data.id),
    name: props.data.name,
    details: props.data.details,
  };

  return result;
});

// Handlers
const openDetailsHandler = () => {
  emits("open-details", props.data.id);
};
</script>
