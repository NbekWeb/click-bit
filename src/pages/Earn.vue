<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import LevelSlide from "@/components/LevelSilde.vue";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import FormatInput from "@/components/FormatInput.vue";
import swap from "@/components/icons/swap.vue";
import send from "@/components/icons/send.vue";
import Required from "@/components/Required.vue";
import { storeToRefs } from "pinia";
import useLevel from "@/stores/level.pinia";
import useVideo from "@/stores/video.pinia";
import useProfile from "@/stores/user.pinia";
import { message } from "ant-design-vue";

const modules = [Navigation];
const swiperInstance = ref(null);
const requiredRef = ref(null);
const swapping = ref(false);
const bit = ref(0);
const click = ref(0);

const levelPinia = useLevel();
const videoPinia = useVideo();
const profilePinia = useProfile();

const { levels } = storeToRefs(levelPinia);
const { rate, profile } = storeToRefs(profilePinia);

watch(
  bit,
  (val) => {
    click.value =
      val /
      (rate.value?.bit_to_click_ratio > 0 ? rate.value?.bit_to_click_ratio : 1);
  },
  { immediate: true }
);

watch(
  click,
  (val) => {
    bit.value = val * rate.value.click_to_bit_ratio;
  },
  { immediate: true }
);

const changeSwap = () => {
  swapping.value = !swapping.value;
  bit.value = 0;
  click.value = 0;
};

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const slidePrev = () => {
  swiperInstance.value?.slidePrev();
};

const slideNext = () => {
  swiperInstance.value?.slideNext();
};

const bitBalance = computed(
  () => profile.value?.user_level?.[0]?.bit_balance || 0
);
const clickBalance = computed(
  () => profile.value?.user_level?.[0]?.click_balance || 0
);

const handleSwapClick = () => {
  if (
    !(
      (!swapping.value && bit.value > bitBalance.value) ||
      (!!swapping.value && click.value > clickBalance.value)
    )
  ) {
    if (bit.value == 0 && !swapping.value) {
      message.error("Please enter the amount of Bit to swap.");
    } else if (click.value == 0 && !!swapping.value) {
      message.error("Please enter the amount of Click to swap.");
    } else {
      profilePinia.postSwap(
        {
          type: !swapping.value ? "bit" : "click",
          amount: !swapping.value ? bit.value : click.value,
        },
        () => {
          bit.value = 0;
          click.value = 0;
          message.success("Swap successful!");
          profilePinia.getProfile();
        }
      );
    }
  }
};

const openAdd = () => {
  requiredRef.value?.showDrawer();
};

onMounted(() => {
  levelPinia.getLevels();
  videoPinia.getVideo();
  profilePinia.getCurrency();
});
</script>

<template>
  <div>
    <div class="relative min-h-15">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
        :loop="true"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="level in levels" :key="level?.id">
          <level-slide :data="level" />
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
        >swap
      </span>
      <div class="mt-1 mb-5 grid grid-cols-1 gap-6 relative">
        <div class="grid grid-cols-1 gap-1" :class="!!swapping && 'order-2'">
          <div class="flex items-center gap-1">
            <span
              class="font-bold font-nova text-min w-6 h-6 flex items-center justify-center btn-orange-rounded"
              >BIT</span
            >

            <span class=""> BIT </span>
          </div>
          <div
            class="h-13 rounded-lg bg-dark-100 w-full px-3 flex items-center justify-end"
          >
            <format-input
              :class="!swapping && bit > bitBalance && '!text-red-500'"
              :readonly="!!swapping"
              placeholder="10,000"
              v-model="bit"
            />
          </div>
        </div>
        <div
          @click="changeSwap"
          class="flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3.5"
        >
          <swap />
        </div>
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-1">
            <span
              class="font-bold font-nova text-min w-6 h-6 flex items-center justify-center btn-orange-rounded"
            >
              <send class="text-sm" />
            </span>
            <span class="uppercase"> Click </span>
          </div>
          <div
            class="h-13 rounded-lg bg-dark-100 w-full px-3 flex items-center justify-end"
          >
            <format-input
              :readonly="!swapping"
              :class="!!swapping && click > clickBalance && '!text-red-500'"
              placeholder="1,000"
              v-model="click"
            />
          </div>
        </div>
      </div>
      <button
        @click="handleSwapClick"
        class="font-nova font-bold h-12 flex w-full justify-center items-center btn-orange"
        :class="
          ((!swapping && bit > bitBalance) ||
            (!!swapping && click > clickBalance)) &&
          'opacity-70 cursor-not-allowed'
        "
      >
        {{
          !swapping && bit > bitBalance
            ? "Insufficient Bits"
            : !!swapping && click > clickBalance
            ? "Insufficient Clicks"
            : "SWAP"
        }}
      </button>
    </div>
    <div class="mt-4">
      <button
        @click="openAdd"
        class="btn-primary w-full text-base font-semibold hover:opacity-80 font-nova h-15 rounded-xl flex items-center justify-center"
      >
        CLICK TO EARN
      </button>
    </div>
    <Required ref="requiredRef" />
  </div>
</template>

<style scoped></style>
