<template>
  <div
    class="text-white px-4 py-3 flex items-center justify-between border-t"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        class="bg-blue relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md"
      >
        Previous
      </a>
      <a
        href="#"
        class="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-blue"
      >
        Next
      </a>
    </div>

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-white">
          Showing
          {{ " " }}
          <span class="font-medium">{{ offset }}</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">{{ toOffset }}</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">{{ total }}</span>
          {{ " " }}
          results
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            href="#"
            :class="['relative inline-flex items-center px-2 py-2 rounded-l-md border border-white bg-blue text-sm font-medium hover:bg-light-blue', {'btn-disabled': goToPrevDisabled}]"
            @click="goToPreviousPageHandler"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>

          <template v-for="(page, index) in pagesToRender" :key="index">
            <a
              href="#"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                {
                  'bg-blue border-white hover:bg-light-blue':
                    page != currentPage,
                },
                {
                  'z-10 bg-light-blue':
                    page == currentPage,
                },
              ]"
              @click="goToPageHandler(page)"
            >
              {{ page }}
            </a>
          </template>

          <a
            href="#"
            :class="['relative inline-flex items-center px-2 py-2 rounded-r-md border border-white bg-blue text-sm font-medium text-white hover:bg-light-blue', {'btn-disabled': goToNextDisabled}]"
            @click="goToNextPageHandler"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from "vue";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

import { useMainStore } from "/src/store/main";

const {  goToPage, $state } = useMainStore();

defineComponent({
  name: "CustomPagination",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
});

// Computed
const pagination = computed(() => $state.pagination);

const currentPage = computed(() => pagination.value.currentPage);

const offset = computed(() => {
  return pagination.value.offset + 1;
});

const toOffset = computed(() => {
  return offset.value + perPage.value;
});

const perPage = computed(() => {
  return pagination.value.perPage;
});

const total = computed(() => {
  return pagination.value.total;
});

const pagesToRender = computed(() => {
  if (currentPage.value == 1) {
    return [
      currentPage.value,
      currentPage.value + 1,
      currentPage.value + 2,
      currentPage.value + 3,
      currentPage.value + 4,
    ];
  } else if (currentPage.value == 2) {
    return [
      currentPage.value - 1,
      currentPage.value,
      currentPage.value + 1,
      currentPage.value + 2,
      currentPage.value + 3,
    ];
  } else {
    return [
      currentPage.value - 2,
      currentPage.value - 1,
      currentPage.value,
      currentPage.value + 1,
      currentPage.value + 2,
    ];
  }
});

const goToPrevDisabled = computed(() => {
    return currentPage.value == 1;
});

const goToNextDisabled = computed(() => {
    return currentPage.value == total.value;
});

// Handlers
const goToPreviousPageHandler = () => {
    goToPage(pagination.value.previousPage);
};

const goToNextPageHandler = () => {
    goToPage(pagination.value.nextPage)
};

const goToPageHandler = (page: number) => {
    goToPage(page);
};
</script>

<scoped lang="scss" scoped>
    .btn-disabled {
        opacity: .5;
        pointer-events: none;
    }
</scoped>