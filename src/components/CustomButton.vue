<template>
  <button
    :type="computedType"
    :class="[
      buttonType,
      { 'block w-full': block },
      'mt-4 rounded-sm border border-transparent px-6 py-3 text-center text-sm shadow-sm',
    ]"
    :disabled="loading || disabled"
  >
    <template v-if="loading">
      <svg
        class="text-white mx-auto h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </template>

    <template v-else>
      <span class="mx-auto text-center">
        {{ label }}
      </span>
    </template>
  </button>
</template>

<script lang="ts" setup>
import {
  ButtonHTMLAttributes,
  defineComponent,
  defineProps,
  computed,
} from "vue";

defineComponent({
  name: "CustomButton",
});

const computedType = computed(() => {
  let type = "button" as ButtonHTMLAttributes["type"];

  if (props.type) {
    type = props.type as ButtonHTMLAttributes["type"];
  }

  return type;
});

const props = defineProps({
  label: { type: String, default: "", required: true },
  textCenter: { type: Boolean, required: false },
  type: {
    type: String,
    required: false,
    default: "button",
  },
  loading: { type: Boolean, required: false, default: false },
  primary: {
    type: Boolean,
    default: false,
  },
  danger: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
});

const buttonType = computed(() => {
  if (props.primary) {
    return "text-white bg-blue";
  }

  if (props.danger) return "text-danger-color bg-transparent";
});
</script>
