<template>
  <div
    :class="[
      'grid',
      { 'grid-cols-1 justify-items-center': data.length == 1 },
      { 'md:grid-cols-3 sm:grid-cols-1 md:gap-4': data.length > 1 },
    ]"
  >
  <template v-if="data.length > 0">
    <template v-for="(item, i) in results" :key="i">
      <ResultCard :data="item" @open-details="openDetailsHandler" />
    </template>
  </template>

  <template v-else>
    <NoResultsRow class="pt-5" />
  </template>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, defineProps, defineEmits, computed } from "vue";

import NoResultsRow from "/src/components/NoResultsRow.vue";
import ResultCard from "./ResultCard.vue";

defineComponent({
  name: "ResultsWrapper",
  components: {
    ResultCard,
    NoResultsRow
  },
});

// Props
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

// Emits
const emits = defineEmits(["open-details"]);

// Computed
const results = computed(() => {
  return props.data as Array<any>;
});

// Handlers
const openDetailsHandler = (id: number) => {
  emits("open-details", id);
};
</script>
