<script setup>
import FormatInput from "./FormatInput.vue";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div>
    <div class="w-full h-53 rounded-3xl bg-dark-200 relative">
      <span
        class="justify-center flex pt-1 text-lg uppercase font-bold font-nove"
        >Level {{ data?.number }}</span
      >
      <img
        :src="data?.image"
        class="h-50 absolute top-0 left-1/2 -translate-x-1/2"
      />
    </div>
  </div>
</template>
<style scoped>
.h-53 {
  height: 212px;
}
</style>
