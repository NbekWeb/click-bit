<script setup>
import { RouterView, useRouter } from "vue-router";
import profile from "../components/icons/profile.vue";
import ton from "../components/icons/ton.vue";
import send from "../components/icons/send.vue";
import wallet from "../components/icons/wallet.vue";
import Navbar from "@/components/Navbar.vue";

const router = useRouter();

const goProfile = () => {
  router.push({ name: "Profile" });
};
</script>

<template>
  <a-spin :spinning="false">
    <div class="px-3 w-full">
      <div class="flex justify-center pt-3 pb-5">
        <img src="@/assets/img/logo.png" class="h-6" />
      </div>
      <div class="h-10 flex items-center gap-3">
        <div
          @click="goProfile"
          class="bg-dark-200 rounded-full h-full flex items-center justify-center w-10 text-2xl"
        >
          <profile />
        </div>
        <div
          class="flex items-center gap-3 flex-grow h-full bg-dark-200 rounded-xl px-2"
        >
          <div
            class="flex text-base justify-between items-center flex-grow my-2 border-r border-gray-400 pr-1.5"
          >
            <div class="flex items-center gap-0.5">
              <span
                class="btn-orange-rounded text-min w-6 h-6 flex items-center justify-center font-bold"
              >
                BIT
              </span>
              <span class="">10,000</span>
            </div>
            <div class="flex items-center gap-0.5">
              <span
                class="btn-orange-rounded text-min w-6 h-6 flex items-center justify-center font-bold"
              >
                <send class="text-sm" />
              </span>
              <span class="">10,000</span>
            </div>
            <div class="flex items-center gap-0.5">
              <span
                class="btn-orange-rounded text-min w-6 h-6 flex items-center justify-center font-bold"
              >
                <ton class="text-xl" />
              </span>
              <span class="">10,000</span>
            </div>
          </div>
          <wallet class="text-2xl" />
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
