<script setup>
import { ref } from "vue";

const placement = ref("bottom");
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
defineExpose({ showDrawer });
</script>
<template>
  <a-drawer
    class="required"
    :height="240"
    title=""
    :placement="placement"
    :open="open"
    @close="onClose"
  >
    <div class="text-white relative">
      <span
        @click="onClose"
        class="flex hover:cursor-pointer h-1.5 w-16 bg-dark-300 rounded justify-center mx-auto"
      ></span>

      <h2
        class="text-lg !mb-10 pt-6 text-center font-bold uppercase px-5 leading-4"
      >
        TON wallet required to continue
      </h2>
      <button class="btn-orange w-full h-12.5">
        <span class="text-base font-semibold font-nova"> Connect Wallet </span>
      </button>
    </div>
  </a-drawer>
</template>
<style scoped></style>
