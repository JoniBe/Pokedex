<template>
  <div :class="['w-full', { 'has-error': hasError }]" @click="focusInput">
    <label
      :for="name"
      :class="[
        'custom-label block text-sm',
        { 'is-focus': isFocus },
        { 'has-value': hasValue}
      ]"
      @click="focusInput"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      ref="inputRef"
      v-model="value"
      :type="computedType"
      :name="name"
      autocomplete="off"
      class="custom-input w-full border-b border-solid border-white bg-transparent text-sm text-white outline-none focus:border-b-2 focus:border-light-blue"
      @focus="onFocus"
      @blur="onBlur"
    />

    <template v-if="hasError">
      <span class="text-xs font-semibold text-red">{{ error }}</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineComponent,
  defineProps,
  ref,
  defineEmits,
} from "@vue/runtime-core";

defineComponent({
  name: "CustomInput",
});

const props = defineProps({
  label: { type: String, required: true, default: "" },
  name: { type: String, required: false, default: "" },
  id: { type: String, required: false, default: "" },
  type: { type: String, required: false, default: "" },
  modelValue: {
    type: [String, Number, Array],
    required: true,
    default: "",
  },
  error: { type: String, required: false, default: "" },
});

const computedType = computed(() => {
  let type = "text" as HTMLInputElement["type"];

  if (props.type) {
    type = props.type as HTMLInputElement["type"];
  }

  return type;
});

const hasError = computed(() => {
  return Boolean(props.error);
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  // getter
  get() {
    return props.modelValue as String | Number;
  },

  //  setter
  set(val) {
    emit("update:modelValue", val);
  },
});

const isFocus = ref(false);

const onFocus = () => {
  isFocus.value = true;
};

const onBlur = () => {
  isFocus.value = false;
};

const hasValue = computed(() => {
  return Boolean(value.value);
});

const inputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
  const input = inputRef.value as HTMLInputElement;
  input.focus();
};
</script>

<style scoped>
.custom-label {
  transition: ease-in 0.1s;
  transition-delay: 0.1s;
  position: relative;
  top: 20px;
  color: #fff;
}

.custom-label.is-focus {
  top: 0px;
  font-size: 10px;
  color: #5DB9FF !important;
}

.custom-label.has-value {
  top: 0px;
  font-size: 10px;
  color: #FFF;
}

.has-error .custom-label {
  color: red !important;
}

.has-error .custom-input {
  border-color: red;
  color: red;
}
</style>
