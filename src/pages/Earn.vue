<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import LevelSlide from "@/components/LevelSilde.vue";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import FormatInput from "@/components/FormatInput.vue";
import swap from "@/components/icons/swap.vue";
import send from "@/components/icons/send.vue";

const modules = [Navigation];
const swiperInstance = ref(null);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const slidePrev = () => {
  swiperInstance.value?.slidePrev();
};

const slideNext = () => {
  swiperInstance.value?.slideNext();
};
</script>

<template>
  <div>
    <div class="relative">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
        :loop="true"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="i in 5" :key="i">
          <level-slide />
        </SwiperSlide>
      </Swiper>

      <button
        @click="slidePrev"
        class="absolute top-1/2 left-3 z-10 bg-transparent w-8 h-8 rounded-full"
      >
        <span
          class="btn-orange-rounded w-full h-full flex items-center justify-center text-base"
        >
          <LeftOutlined />
        </span>
      </button>
      <button
        @click="slideNext"
        class="absolute top-1/2 right-3 z-10 bg-transparent w-8 h-8 rounded-full"
      >
        <span
          class="btn-orange-rounded w-full h-full flex items-center justify-center text-base"
        >
          <RightOutlined />
        </span>
      </button>
    </div>
    <div class="mt-3 rounded-3xl bg-dark-200 px-4 py-3">
      <span class="uppercase text-base font-bold font-nova flex justify-center"
        >swap</span
      >
      <div class="mt-1 mb-5 flex flex-col gap-6 relative">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-1">
            <span
              class="font-bold font-nova text-min w-6 h-6 flex items-center justify-center btn-orange-rounded"
              >BIT</span
            >
            <span class="font-thin"> BIT </span>
          </div>
          <div
            class="h-13 rounded-lg bg-dark-100 w-full px-3 flex items-center justify-end"
          >
            <format-input />
          </div>
        </div>
        <div
          class="flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3.5"
        >
          <swap />
        </div>
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-1">
            <span
              class="font-bold font-nova text-min w-6 h-6 flex items-center justify-center btn-orange-rounded"
              >
              <send class="text-sm"/>
              </span
            >
            <span class="font-thin uppercase"> Click </span>
          </div>
          <div
            class="h-13 rounded-lg bg-dark-100 w-full px-3 flex items-center justify-end"
          >
            <format-input />
          </div>
        </div>
      </div>
      <button
        class="font-nova font-bold h-12 flex w-full justify-center items-center btn-orange"
      >
        SWAP
      </button>
    </div>
    <div class="mt-4">
      <button
        class="btn-primary w-full text-base font-semibold hover:opacity-80 font-nova h-15 rounded-xl flex items-center justify-center"
      >
        CLICK TO EARN
      </button>
    </div>
  </div>
</template>

<style scoped></style>
