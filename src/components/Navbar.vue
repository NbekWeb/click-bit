<script setup>
import earn from "./icons/earn.vue";
import market from "./icons/market.vue";
import send from "./icons/send.vue";
import referal from "./icons/referal.vue";
import { computed } from "vue";
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value.name);

const menuItems = [
  { icon: earn, label: "Earn", to: "Earn" },
  { icon: market, label: "Marketplace", to: "Market" },
  { icon: send, label: "Spend", to: "Spend" },
  { icon: referal, label: "Refer", to: "Refer" },
];
</script>

<template>
  <div
    class="bg-dark-200 text-sm font-nova rounded-t-2xl h-full w-full px-7.5 flex items-center justify-between"
  >
    <router-link
      v-for="(item, index) in menuItems"
      :key="index"
      :to="{ name: item.to }"
      class="flex flex-col items-center gap-1"
    >
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center"
        :class="currentRoute == item.to ? 'btn-orange-rounded' : 'bg-dark-300'"
      >
        <component
          :is="item.icon"
          class="text-2xl"
          :class="currentRoute !== item.to && 'opacity-20'"
        />
      </div>
      <span :class="currentRoute !== item.to && 'opacity-40'">{{
        item.label
      }}</span>
    </router-link>
  </div>
</template>
