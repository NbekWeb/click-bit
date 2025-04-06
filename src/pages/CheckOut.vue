<script setup>
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import useBrand from "@/stores/brand.pinia";
import { useRoute, useRouter } from "vue-router";
import { RightOutlined } from "@ant-design/icons-vue";
import useProfile from "@/stores/user.pinia";
import { message } from "ant-design-vue";

const brandPinia = useBrand();
const profilePinia = useProfile();
const route = useRoute();
const router = useRouter();
const { brand } = storeToRefs(brandPinia);
const { profile } = storeToRefs(profilePinia);

const open = ref(false);
const placement = ref("bottom");
const email = ref(profile.value.email);
const count = ref(route.query.count);
const type = ref(route.query.type);
const currentPrice = computed(() => {
  if (!brand.value?.prices || !type.value) return null;
  const found = brand.value.prices.find((p) => p.id == type.value);
  return found ? found.price : null;
});
const onClose = () => {
  open.value = false;
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

function changeEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value) {
    message.error("Email is required!");
    return;
  }

  if (!emailRegex.test(email.value)) {
    message.error("Please enter a valid email address!");
    return;
  }

  profilePinia.changeEmail({ email: email.value }, () => {
    message.success("Email updated successfully");
    profilePinia.getProfile();
  });
}

function goBuy() {
  if (
    currentPrice.value * count.value >
    profile.value.user_level?.[0]?.bit_balance
  ) {
    message.error("Insufficient balance!");
  } else {
    brandPinia.buyBrand(
      { quantity: count.value, price_id: type.value },
      brand.value.id,
      () => {
        profilePinia.getProfile();
        open.value = true;
      }
    );
  }
}

function goInbox(){
    onClose()
    router.push({name:'Earn'})
}

onMounted(() => {
  if (!brand.value.id) {
    brandPinia.getBrand(route.params.id);
  }
});
</script>
<template>
  <div class="text-nova overflow-x-hidden">
    <h3 class="uppercase text-base font-semibold pt-4 pb-3">Checkout</h3>
    <div class="flex gap-5 h-auto">
      <img :src="brand.image" class="w-30 rounded" />
      <div class="flex flex-col gap-1 text-xs">
        <span class="font-semibold">
          {{ brand.name }} {{ currentPrice }} BIT
        </span>
        <span class="opacity-60 min-h-4 truncate pr-4 max-w-[90%]">{{
          brand.description
        }}</span>
        <div class="bg-black h-full p-0.5 rounded-lg max-w-max">
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
    </div>
    <div class="mt-5 mb-5">
      <h4 class="text-base font-semibold !mb-0">Email address</h4>
      <p class="text-sm opacity-60">
        We’ll send your digital gift card to you.
      </p>
      <div
        class="mt-2 flex justify-between items-center gap-4 px-4 h-10 bg-dark-200 rounded-lg"
      >
        <input
          type="email"
          placeholder="example@yandex.ru"
          v-model="email"
          class="text-sm outline-none border-none"
        />
        <button
          @click="changeEmail"
          class="bg-transparent btn-orange-rounded w-6 h-6 rounded-full text-sm"
        >
          <RightOutlined class="!text-sm" />
        </button>
      </div>
    </div>
    <div class="mb-5">
      <h4 class="font-semibold text-base">Select Utility Token</h4>
      <div class="w-1/2 flex flex-col gap-1 py-4 px-4.5 rounded-lg bg-gray-500">
        <div
          class="w-10 font-semibold text-base h-10 flex items-center justify-center rounded-full bg-dark-200"
        >
          BIT
        </div>
        <span class="font-sm opacity-80">CLICKBIT (BIT)</span>
        <span class="text-sm font-semibold">
          <span class="text-green-500">
            {{ currentPrice * count }}
          </span>
          BIT
        </span>
      </div>
    </div>
    <button
      @click="goBuy"
      class="h-12 btn-primary rounded-xl w-full hover:opacity-80"
    >
      <span class="text-sm font-semibold"> Place order and pay </span>
    </button>
    <a-drawer
      class="required"
      height="auto"
      title=""
      :placement="placement"
      :open="open"
      @close="onClose"
    >
      <div
        class="h-full w-full text-white flex flex-col items-center text-center"
      >
        <span
          @click="onClose"
          class="flex hover:cursor-pointer min-h-1.5 w-16 bg-dark-300 rounded justify-center mx-auto"
        ></span>

        <h5 class="text-lg font-bold pt-3 !mb-0">Thank you</h5>
        <h5 class="text-base font-semibold pt-5 !mb-6">ORDER CONFIRMED!</h5>
        <p
          class="bg-dark-100 py-1.5 px-3 !mb-7 rounded-lg text-center text-base"
        >
          Your digital Gift Card has been successfully delivered to your email
          address.
        </p>
        <button
          @click="goInbox"
          class="h-12 btn-primary rounded-xl w-full hover:opacity-80"
        >
          <span class="text-sm font-semibold"> Go to inbox</span>
        </button>
      </div>
    </a-drawer>
  </div>
</template>
