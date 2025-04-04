<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref("");

const formatNumber = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const handleInput = (event) => {
  if (props.readonly) return;
  const rawValue = event.target.value.replace(/\D/g, ""); // keep only digits
  inputValue.value = formatNumber(rawValue);
  emit("update:modelValue", rawValue);
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal > 0) {
      inputValue.value = formatNumber(String(newVal));
    } else {
      inputValue.value = "";
    }
  },
  { immediate: true }
);
</script>
<template>
  <input
    type="text"
    class="border-none w-full flex font-nova text-right text-base outline-none shadow-none"
    :placeholder="placeholder"
    :value="inputValue"
    :readonly="readonly"
    @input="handleInput"
  />
</template>
