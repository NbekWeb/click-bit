<script setup>
import { RouterLink } from "vue-router";
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div>
    <div class="px-3.5">
      <button
        class="flex justify-center bg-dark-200 items-center h-7 w-full btn-orange"
      >
        <span class="uppercase text-sm font-semibold">
          LeveL {{ data?.level }}
        </span>
      </button>
    </div>
    <div class="w-full bg-dark-200 rounded-xl -mt-3.5 py-3 px-2.5">
      <div class="px-7">
        <img src="@/assets/img/level1.png" class="w-full" />
      </div>
      <div class="mt-1">
        <div class="relative bg-dark-100 w-full h-1 rounded">
          <div
            class="flex rounded btn-primary w-5 h-full absolute top-0 left-0"
          ></div>
        </div>
        <div class="mt-3 text-xs flex flex-col items-center text-center">
          <span class="text-sm font-bold mb-1 flex">Mint: 5,000 BIT</span>
          <span>
            Earn Rate:
            <span class="text-primary font-semibold"> +1% </span>
          </span>
          <span class="mb-2.5"
            >Conversion Rate:
            <span class="text-primary font-semibold"> 50%</span>
          </span>
          <button class="btn-primary h-8 rounded-lg w-full hover:opacity-80">
            <span class="text-sm font-semibold"> Buy </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
