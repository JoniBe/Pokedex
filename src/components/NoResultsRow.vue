<template>
  <div
    class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
  >
    <div class="flex-1 min-w-0">
      <p class="text-l font-medium text-gray-700 capitalize">
        No results found...
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

defineComponent({
  name: "NoResultsRow",
});
</script>
