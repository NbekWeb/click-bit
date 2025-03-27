<script setup>
import copy from "@/components/icons/copy.vue";
import Task from "@/components/Task.vue";

import tg from "@/assets/img/tg.svg";
import discord from "@/assets/img/discord.svg";
import x from "@/assets/img/x.svg";
import yt from "@/assets/img/yt.svg";
import tiktok from "@/assets/img/tiktok.svg";

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
        class="flex-grow flex items-center justify-center h-full btn-primary rounded-lg"
      >
        <span class="text-sm font-semibold capitalize"> invite friends </span>
      </button>
      <button
        class="px-4 flex gap-2 items-center justify-center h-full btn-primary rounded-lg"
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
