<script setup>
import { ref } from "vue";

const inputValue = ref("");

const formatNumber = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const handleInput = (event) => {
  let rawValue = event.target.value.replace(/\D/g, "");
  inputValue.value = formatNumber(rawValue);
};
</script>

<template>
  <input
    type="text"
    class="border-none w-full flex font-nova text-right text-base outline-none shadow-none"
    placeholder="1,000"
    v-model="inputValue"
    @input="handleInput"
  />
</template>
