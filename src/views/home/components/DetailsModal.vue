<template>
  <TransitionRoot as="template" :show="show">
    <Dialog
      as="div"
      static
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="closeModal"
      :open="show"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-white bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            :class="[
              'inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 pokemon-card',
              classType,
            ]"
          >
            <div class="flex-1 flex flex-col p-8">
              <img
                class="w-32 h-32 flex-shrink-0 mx-auto border border-solid border-black rounded-full bg-white"
                :src="model.img"
                alt=""
              />

              <h3
                class="mt-6 mb-4 text-black text-xl font-semibold capitalize border-b border-black"
              >
                {{ model.name }}
              </h3>

              <div class="mt-1 grid grid-cols-2">
                <div class="text-left flex flex-col">
                  <span class="font-semibold mr-1">Abilities:</span>

                  <div v-for="(item, index) in model.abilities" :key="index">
                    <span class="italic capitalize">
                      {{ item.name }}
                    </span>
                  </div>
                </div>

                <div class="text-left flex flex-col">
                  <span class="font-semibold mr-1">Types:</span>

                  <div v-for="(item, index) in model.types" :key="index">
                    <span class="italic capitalize">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5 sm:mt-6 text-center">
              <CustomButton label="Close" primary @click="closeModal" block />
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { defineComponent, computed } from "vue";

import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import CustomButton from '/src/components/CustomButton.vue';

import colorTypesDef from "/src/core/constants/colorTypesDef";

defineComponent({
  name: "DetailsModal",
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    CustomButton
  },
});

const IMG_URL =
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/{0}.png";

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      id: 0,
      img: null,
      name: null,
      details: null,
      types: [],
      abilities: [],
    }),
  },
  show: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emits = defineEmits(["update:show"]);

// Computed
const model = computed(() => ({
  id: props.modelValue.id,
  img: getPokemonImg(props.modelValue.id),
  name: props.modelValue.name,
  details: props.modelValue.details,
  types: props.modelValue.types,
  abilities: props.modelValue.abilities,
}));

const classType = computed(() => {
  let classType = "";

  const item = colorTypesDef.find((x) => x.type === model.value.types[0].name);

  if (item) {
    classType = item.class;
  }

  return classType;
});

const closeModal = () => {
  emits("update:show", false);
};

const getPokemonImg = (val: string) => {
  const id = val ? val.toString() : "";

  let img = null;

  if (id.length === 1) {
    img = IMG_URL.replace("{0}", `00${id}`);
  } else if (id.length === 2) {
    img = IMG_URL.replace("{0}", `0${id}`);
  } else {
    img = IMG_URL.replace("{0}", `${id}`);
  }

  return img;
};
</script>

<style scoped lang="scss">
@import "src/assets/css/color-types.scss";

.pokemon-card {
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
}
</style>
