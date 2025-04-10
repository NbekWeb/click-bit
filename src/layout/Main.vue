<script setup>
import { TonConnectUI } from "@tonconnect/ui";
import { onMounted, ref } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import profileIcon from "../components/icons/profile.vue";
import ton from "../components/icons/ton.vue";
import send from "../components/icons/send.vue";
import wallet from "../components/icons/wallet.vue";
import Navbar from "@/components/Navbar.vue";
import useCore from "@/stores/core.pinia";
import useProfile from "@/stores/user.pinia";
import useLevel from "@/stores/level.pinia";
import useBrand from "@/stores/brand.pinia.js";
import useVideo from "@/stores/video.pinia";
import { storeToRefs } from "pinia";

const open = ref(false);
const profilePinia = useProfile();
const corePinia = useCore();
const levelPinia = useLevel();
const brandPinia = useBrand();
const videoPinia = useVideo();

const route = useRoute();
const router = useRouter();

const { profile } = storeToRefs(profilePinia);
const { loadingUrl } = storeToRefs(corePinia);

const goProfile = () => {
  router.push({ name: "Profile" });
};
function formatNumber(num) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
}

const connectWallet = () => {
  const tonConnectUI = new TonConnectUI({
    manifestUrl: "https://click-bit.vercel.app/tonconnect-manifest.json",
    buttonRootId: "ton-connect-button", // This is where the TonConnect button will be injected
  });

  tonConnectUI.connector
    .connect()
    .then((wallet) => {
      console.log("Connected wallet:", wallet);
    })
    .catch((err) => {
      console.log("Wallet connection failed:", err);
    });
};

onMounted(() => {
  profilePinia.getProfile();
  profilePinia.getCurrency();
  profilePinia.getReferalAmount();
  levelPinia.getLevels();
  videoPinia.getVideo();
});
</script>

<template>
  <a-spin
    :spinning="
      loadingUrl.has('profile/') ||
      loadingUrl.has('brands/') ||
      loadingUrl.has('brand/') ||
      loadingUrl.has('buy/level/') ||
      loadingUrl.has('tasks/daily/') ||
      loadingUrl.has('profile/referral/user/') ||
      loadingUrl.has('complete/task/') ||
      loadingUrl.has('all/levels/')
    "
  >
    <div class="px-3 w-full min-h-screen">
      <div class="pb-2 pt-3 flex justify-end">
        <div id="ton-connect-button"></div>
      </div>
      <div class="flex justify-center pt-3 pb-5">
        <img src="@/assets/img/logo.png" class="h-6" />
      </div>

      <div class="h-10 flex items-center gap-3">
        <div
          @click="goProfile"
          v-if="!profile?.avatar_url"
          class="bg-dark-200 rounded-full h-10 flex items-center justify-center w-10 text-2xl"
        >
          <profileIcon />
        </div>
        <img
          @click="goProfile"
          v-else
          :src="profile?.avatar_url"
          class="w-10 h-full rounded-full"
        />
        <div
          class="flex items-center gap-3 flex-grow h-full bg-dark-200 rounded-xl px-2"
        >
          <div
            class="flex text-base justify-between items-center flex-grow my-2 border-r border-gray-400 pr-1.5"
          >
            <div class="flex items-center gap-1">
              <span
                class="btn-orange-rounded text-min w-6 h-6 flex items-center justify-center font-bold"
              >
                BIT
              </span>
              <span class="">
                {{ formatNumber(profile?.user_level?.[0]?.bit_balance) }}</span
              >
            </div>
            <div class="flex items-center gap-1">
              <span
                class="btn-orange-rounded text-min w-6 h-6 flex items-center justify-center font-bold"
              >
                <send class="text-sm" />
              </span>
              <span class="">
                {{ formatNumber(profile?.user_level?.[0]?.click_balance) }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <span
                class="btn-orange-rounded text-min w-6 h-6 flex items-center justify-center font-bold"
              >
                <ton class="text-xl" />
              </span>
              <span class="">
                {{ formatNumber(profile?.user_level?.[0]?.ton_balance) }}</span
              >
            </div>
          </div>
          <div @click="connectWallet" class="cursor-pointer">
            <wallet class="text-2xl" />
          </div>
        </div>
      </div>
      <div class="pb-22 pt-3">
        <router-view />
      </div>
      <div class="w-full h-22 fixed bottom-0 left-0 px-3 pt-4 bg-dark-100">
        <Navbar />
      </div>
    </div>
  </a-spin>
</template>
