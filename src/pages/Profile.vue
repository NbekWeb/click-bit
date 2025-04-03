<script setup>
import { LeftOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import Profile from "@/components/icons/profile.vue";
import { ref } from "vue";
import useProfile from "@/stores/user.pinia";
import { storeToRefs } from "pinia";

const profilePinia = useProfile();

const { profile } = storeToRefs(profilePinia);

const checked = ref(false);

const router = useRouter();

function goBack() {
  if (!!window.history?.state?.back) {
    router.push(window.history.state.back);
    console.log(window.history?.state?.back);
  } else {
    router.push({ name: "Earn" });
  }
}
</script>
<template>
  <div class="text-white px-3 font-nova">
    <div class="relative pt-5 px-1 pb-8">
      <span
        @click="goBack"
        class="text-base flex items-center gap-1 font-semibold hover:cursor-pointer"
      >
        <LeftOutlined class="text-xs" />
        Back
      </span>
      <router-link :to="{ name: 'Earn' }">
        <img
          src="@/assets/img/logo.png"
          class="h-6 absolute left-1/2 -translate-x-1/2 top-4"
        />
      </router-link>
    </div>
    <div
      class="bg-dark-200 rounded-full h-17 flex items-center justify-center w-17 text-3xl mx-auto"
    >
      <Profile />
    </div>
    <h2 class="font-bold text-2xl text-center pt-1 !mb-10">
      @{{ profile?.username || "Not username" }}
    </h2>
    <div class="flex flex-col gap-2 w-full font-semibold text-base">
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Total BITs earned
        <span class="flex h-6.5 items-center px-4 btn-orange"> 1.000.000 </span>
      </div>
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Language
        <span class="flex h-6.5 items-center px-4 btn-orange uppercase"
          >en
        </span>
      </div>
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Language
        <a-switch v-model:checked="checked" />
      </div>
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Push Notifications
        <a-switch v-model:checked="checked" />
      </div>
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Terms of Use
      </div>
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Privacy Policy
      </div>
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Support
      </div>
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Log Out
      </div>
    </div>
  </div>
</template>
