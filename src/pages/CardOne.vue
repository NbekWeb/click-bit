<script setup>
import { ref } from "vue";

const count = ref(1);
const current = ref(2);

const changeCurrent = (val) => {
  current.value = val;
};

const increase = () => {
  if (count.value > 1) {
    return count.value--;
  }
};
const decrease = () => {
  if (count.value < 1000) {
    return count.value++;
  }
};
</script>
<template>
  <div>
    <img src="@/assets/img/amazon.svg" class="w-full" />
    <div class="mt-5 py-3.5 px-4 bg-dark-200 rounded-3xl">
      <span class="pl-3.5 font-semibold font-nova uppercase text-xs">
        Select gift card value
      </span>
      <div
        class="mt-5 h-6 flex items-center justify-between rounded-lg bg-dark-100"
      >
        <span class="flex pl-4 text-xs opacity-70">Select quantity</span>
        <div class="bg-black h-full p-0.5 rounded-lg">
          <div
            class="bg-dark-200 h-full flex items-center gap-2.5 px-4 text-xs rounded-lg"
          >
            <span class="hover:cursor-pointer" @click="increase">-</span>
            <span class="flex min-w-5 justify-center">{{ count }}</span>
            <span class="hover:cursor-pointer" @click="decrease">+</span>
          </div>
        </div>
      </div>
      <div class="mt-10 text-xs flex flex-col gap-4">
        <div
          class="flex justify-between hover:cursor-pointer"
          v-for="i in 3"
          :key="i"
          @click="changeCurrent(i)"
        >
          <div class="flex gap-4">
            <span
              class="flex w-3.5 h-3.5 rounded-full"
              :class="current == i ? 'bg-orange-500' : 'bg-white'"
            ></span>
            <div class="flex flex-col gap-1 opacity-80">
              <span>Amazon</span>
              <span>Digital gift card</span>
            </div>
          </div>
          <span class="font-semibold text-sm"
            >{{ i == 1 ? 5 : i == 2 ? 25 : 50 }}$</span
          >
        </div>
      </div>
    </div>
    <div class="mt-3.5 flex flex-col gap-2">
      <span class="text-xs">Terms and Conditions*</span>
      <button
        class="text-sm h-12 btn-primary rounded-xl w-full hover:opacity-80"
      >
        Proceed to check out
      </button>
    </div>
  </div>
</template>
