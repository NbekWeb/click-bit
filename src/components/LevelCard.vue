<script setup>
import { RouterLink } from "vue-router";
import useLevel from "@/stores/level.pinia";
import useProfile from "@/stores/user.pinia";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue";

const levelPinia = useLevel();
const profilePinia = useProfile();

const { profile } = storeToRefs(profilePinia);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

function formatNumberWithDot(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function buy() {
  if (!props.data?.is_active) {
    levelPinia.buyLevel({ level_number: props.data.number }, () => {
      levelPinia.getLevels();
      profilePinia.getProfile()
    });
  }
}
</script>
<template>
  <div>
    <div class="px-3.5">
      <button
        class="flex justify-center bg-dark-200 items-center h-7 w-full btn-orange"
      >
        <span class="uppercase text-sm font-semibold">
          LeveL {{ data?.number }}
        </span>
      </button>
    </div>
    <div class="w-full bg-dark-200 rounded-xl -mt-3.5 py-3 px-2.5">
      <div class="px-7">
        <img :src="data?.image" class="w-full" />
      </div>
      <div class="mt-1">
        <div class="relative bg-dark-100 w-full h-1 rounded">
          <div
            class="flex rounded btn-primary h-full absolute top-0 left-0"
            :style="`width: calc(${data?.earn_rate || 0} / 100 * 100%)`"
          ></div>
        </div>
        <div class="mt-3 text-xs flex flex-col items-center text-center">
          <span class="text-sm font-bold mb-1 flex"
            >Mint: {{ formatNumberWithDot(data?.mint) }} BIT</span
          >
          <span>
            Earn Rate:
            <span class="text-primary font-semibold">
              +{{ data?.earn_rate }}%
            </span>
          </span>
          <span class="mb-2.5"
            >Conversion Rate:
            <span class="text-primary font-semibold">
              {{ data?.conversion_rate }}%</span
            >
          </span>
          <button
            @click="buy"
            :class="[
              'h-8 rounded-lg w-full text-sm font-semibold',
              data?.is_active
                ? 'btn-primary flex items-center justify-center opacity-60 cursor-not-allowed'
                : 'btn-primary hover:opacity-80',
            ]"
            :disabled="data?.is_active"
          >
            {{ data?.is_active ? "Purchased" : "Buy" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
