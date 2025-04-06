<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useBrand from "@/stores/brand.pinia";
import { useRoute,useRouter } from "vue-router";

const brandPinia = useBrand();
const route = useRoute();
const router = useRouter();
const { brand } = storeToRefs(brandPinia);

const count = ref(1);
const current = ref(0);

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

function checkOut() {
  router.push({
    name: "CheckOut",
    params: { id: route.params.id },
    query: {
      type: current.value,
      count: count.value,
    },
  });
}

onMounted(() => {
  brandPinia.getBrand(route.params.id, (data) => {
    if (data.prices.length % 2 == 0) {
      current.value = data.prices[1]?.id;
    } else if (data.prices.length > 1) {
      current.value = data.prices[(data.prices.length - 1) / 2]?.id;
    } else {
      current.value = data.prices[0]?.id;
    }
  });
});
</script>
<template>
  <div>
    <img src="@/assets/img/amazon.svg" class="w-full" />
    <div class="mt-5 py-3.5 px-4 bg-dark-200 rounded-3xl">
      <span class="pl-3.5 font-semibold font-nova uppercase text-sm">
        Select gift card value
      </span>
      <div
        class="mt-5 h-7.5 text-sm flex items-center justify-between rounded-lg bg-dark-100"
      >
        <span class="flex pl-4 opacity-90 font-semibold">Select quantity</span>
        <div class="bg-black h-full p-0.5 rounded-lg">
          <div
            class="bg-dark-200 h-full flex items-center gap-2.5 px-4 rounded-lg text-base"
          >
            <span class="hover:cursor-pointer" @click="increase">-</span>
            <span class="flex min-w-5 justify-center font-semibold">{{
              count
            }}</span>
            <span class="hover:cursor-pointer" @click="decrease">+</span>
          </div>
        </div>
      </div>
      <div class="mt-10 text-xs flex flex-col gap-4">
        <div
          class="flex justify-between hover:cursor-pointer"
          v-for="item in brand?.prices"
          :key="item.id"
          @click="changeCurrent(item.id)"
        >
          <div class="flex gap-4 items-center">
            <span
              class="flex w-3.5 h-3.5 rounded-full"
              :class="current == item.id ? 'bg-orange-500' : 'bg-white'"
            ></span>
            <div class="flex flex-col">
              <span class="text-sm font-semibold">{{ brand.name }}</span>
              <span class="opacity-80">{{ brand.description }}</span>
            </div>
          </div>
          <span class="font-semibold text-sm">{{ item.price }} BIT</span>
        </div>
      </div>
    </div>
    <div class="mt-3.5 flex flex-col gap-2">
      <span class="text-xs">Terms and Conditions*</span>
      <button
        @click="checkOut"
        class="h-12 btn-primary rounded-xl w-full hover:opacity-80"
      >
        <span class="text-sm font-semibold"> Proceed to check out </span>
      </button>
    </div>
  </div>
</template>
