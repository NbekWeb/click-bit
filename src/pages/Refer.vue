<script setup>
import useProfile from "@/stores/user.pinia";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { message } from "ant-design-vue";

import copy from "@/components/icons/copy.vue";
import Task from "@/components/Task.vue";

import tg from "@/assets/img/tg.svg";
import discord from "@/assets/img/discord.svg";
import x from "@/assets/img/x.svg";
import yt from "@/assets/img/yt.svg";
import tiktok from "@/assets/img/tiktok.svg";

const profilePinia = useProfile();

const { profile } = storeToRefs(profilePinia);

const tasks = [
  {
    icon: tg,
    title: "Join ClickBit Channel",
    count: 10,
  },
  {
    icon: discord,
    title: "Join ClickBit Server",
    count: 10,
  },
  {
    icon: x,
    title: "Follow us on X",
    count: 10,
  },
  {
    icon: yt,
    title: "Subscribe to our Youtube",
    count: 10,
  },
  {
    icon: tiktok,
    title: "Follow us on TikTok",
    count: 10,
  },
];

const referall = computed(
  () =>
    `https://t.me/ibosh_tehdddbot/salom?startapp=${profile.value.referral_code}`
);

const share = async () => {
  const shareData = {
    title: "ClickBit Invite",
    text: "Join ClickBit and earn 100 BITs! 🎉",
    url: referall.value,
    customText: "Exclusive offer just for you! Click here to start earning!",
  };

  try {
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
        shareData.url
      )}&text=${encodeURIComponent(shareData.customText)}`;
      window.open(telegramUrl, "_blank");
    } else {
      message.error("Your browser doesn't support sharing with Telegram.");
    }
  } catch (err) {
    message.error("An error occurred while sharing.");
  }
};

const copyReferral = async () => {
  try {
    await navigator.clipboard.writeText(referall.value);
    message.success("Referral link copied to clipboard!");
  } catch (err) {
    message.error("Failed to copy referral link.");
  }
};
</script>
<template>
  <div>
    <h2 class="text-2xl text-center !mb-1 !font-bold">Invite Friends</h2>
    <span class="text-xs font-medium flex justify-center opacity-80"
      >You and your friend will receive referral bonuses</span
    >
    <div
      class="mt-5 rounded-lg bg-dark-200 h-15 px-3 flex gap-2.5 items-center"
    >
      <span
        class="w-6 h-6 rounded-full btn-orange-rounded text-min flex items-center justify-center"
        >BIT</span
      >
      <div class="flex flex-col gap-0">
        <span class="text-base font-semibold"> Invite a friend </span>
        <p class="text-xs !mb-0">
          <span class="text-primary">+100 BITs</span> For every referral you
          make
        </p>
      </div>
    </div>
    <div class="flex gap-2 items-center text-base mt-3 h-10 mb-5">
      <button
        @click="share"
        class="flex-grow hover:opacity-80 flex items-center justify-center h-full btn-primary rounded-lg"
      >
        <span class="text-sm font-semibold capitalize"> invite friends </span>
      </button>
      <button
        @click="copyReferral"
        class="px-4 flex gap-2 items-center justify-center h-full btn-primary rounded-lg hover:opacity-80"
      >
        <span class="text-sm font-semibold capitalize"> Copy </span>
        <copy class="text-lg" />
      </button>
    </div>
    <div>
      <h3 class="font-nova !font-semibold !mb-3 text-2xl">Daily Tasks 5</h3>
      <div class="flex flex-col gap-3">
        <Task v-for="(task, i) of tasks" :key="i" :data="task" />
      </div>
    </div>
  </div>
</template>
