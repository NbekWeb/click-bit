<script setup>
import useProfile from "@/stores/user.pinia";
import useTask from "@/stores/task.pinia";
import Friend from "@/components/Friend.vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";

import copy from "@/components/icons/copy.vue";
import Task from "@/components/Task.vue";

import tg from "@/assets/img/tg.svg";
import discord from "@/assets/img/discord.svg";
import x from "@/assets/img/x.svg";
import yt from "@/assets/img/yt.svg";
import tiktok from "@/assets/img/tiktok.svg";

const profilePinia = useProfile();
const taskPinia = useTask();

const { profile, bonus } = storeToRefs(profilePinia);
const { dailyTasks,friends } = storeToRefs(taskPinia);
const tasks = ref([]);

const referall = computed(
  () =>
    `https://t.me/ibosh_tehdddbot/salom?startapp=${profile.value.referral_code}`
);

const share = async () => {
  const shareData = {
    title: "ClickBit Invite",
    text: `Join ClickBit and earn ${bonus.value} BITs! 🎉`,
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

onMounted(() => {
  taskPinia.getTasksDaily((data) => {
    const platforms = ["telegram", "youtube", "discord", "tiktok", "x"];
    const platformIcons = {
      telegram: tg,
      youtube: yt,
      discord: discord,
      tiktok: tiktok,
      x: x,
    };
    tasks.value = [];
    platforms.forEach((key) => {
      if (data[key]) {
        tasks.value.push({
          ...data[key],
          icon: platformIcons[key] || null,
        });
      }
    });
  });
  taskPinia.checkTask("youtube", "3");
  taskPinia.getFriends();
});
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
        >BIT </span
      >
      <div class="flex flex-col gap-0">
        <span class="text-base font-semibold"> Invite a friend </span>
        <p class="text-xs !mb-0">
          <span class="text-primary">+{{ bonus }} BITs</span> For every referral
          you make
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
      <h3 class="font-nova !font-semibold !mb-3 text-2xl">
        Daily Tasks {{ tasks.length || "" }}
      </h3>
      <div class="flex flex-col gap-3" v-if="tasks.length">
        <Task v-for="(task, i) of tasks" :key="i" :data="task" />
      </div>
      <span v-else class="mx-auto flex justify-center opacity-60 text-base"
        >All tasks done for today!</span
      >
      <h3 class="font-nova !font-semibold !my-3 text-2xl">
        List of Friends (20)
      </h3>
      <div v-if="tasks.length" class="flex flex-col gap-3">
        <Friend v-for="(task, i) of tasks" :key="i" :data="task" />
      </div>
      <span v-else class="mx-auto flex justify-center opacity-60 text-base"
        >You haven't referred any friends yet!</span
      >
    </div>
  </div>
</template>
