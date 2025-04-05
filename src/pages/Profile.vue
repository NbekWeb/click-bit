<script setup>
import { LeftOutlined, CloseOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import ProfileIcon from "@/components/icons/profile.vue";
import { ref } from "vue";
import useProfile from "@/stores/user.pinia";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const profilePinia = useProfile();

const { profile } = storeToRefs(profilePinia);

const checked = ref(false);
const notification = ref(true);
const open = ref(false);

function formatNumberWithDot(number) {
  return number.toLocaleString("de-DE");
}

const toggleOpen = () => {
  open.value = !open.value;
};

const router = useRouter();

watch(
  () => profile.value.send_notification,
  (newValue) => {
    notification.value = newValue;
  },
  { immediate: true }
);

function goBack() {
  if (!!window.history?.state?.back) {
    router.push(window.history.state.back);
  } else {
    router.push({ name: "Earn" });
  }
}

function changeNotification(checked) {
  profilePinia.changeNotification({ send_notification: checked }, () => {
    profilePinia.getProfile();
  });
}

function changeSound(checked) {
  profilePinia.changeSound({ send_notification: checked }, () => {
    profilePinia.getProfile();
  });
}

function logOut() {
  localStorage.removeItem("access_token");
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
}

function deleteAccount() {
  profilePinia.deleteProfile();
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
      v-if="!profile?.avatar_url"
      class="bg-dark-200 rounded-full h-17 flex items-center justify-center w-17 text-3xl mx-auto"
    >
      <ProfileIcon />
    </div>
    <img
      v-else
      :src="profile?.avatar_url"
      class="w-10 h-full rounded-full flex items-center justify-center mx-auto"
    />
    <h2 class="font-bold text-2xl text-center pt-1 !mb-10">
      @{{ profile?.username || "Not username" }}
    </h2>
    <div class="flex flex-col gap-2 w-full font-semibold text-base">
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Total BITs earned
        <span class="flex h-6.5 items-center px-4 btn-orange">
          {{ formatNumberWithDot(profile?.user_level?.[0]?.bit_balance) }}
        </span>
      </div>
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Language
        <span class="flex h-6.5 items-center px-4 btn-orange uppercase"
          >en
        </span>
      </div>
      <!-- <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Sound
        <a-switch v-model:checked="checked" @change="changeSound" />
      </div> -->
      <div
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Push Notifications
        <a-switch v-model:checked="notification" @change="changeNotification" />
      </div>
      <div
        @click="toggleOpen"
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Terms of Use
      </div>
      <div
        @click="toggleOpen"
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
        @click="logOut"
        class="h-11 bg-dark-200 rounded-xl w-full pl-5 pr-2.5 flex items-center justify-between"
      >
        Log Out
      </div>
      <span
        @click="deleteAccount"
        class="my-3 justify-center gap-2 text-sm flex !text-red-500 text-nova"
      >
        <CloseOutlined class="text-base !text-red-500" />
        Delete Account</span
      >
    </div>
    <a-modal v-model:open="open">
      <h3 class="text-base font-semibold pt-6">This page is in progress...</h3>

      <template #footer>
        <button
          @click="toggleOpen"
          class="btn-primary rounded py-1 px-4 font-semibold hover:opacity-80"
        >
          Ok
        </button>
      </template>
    </a-modal>
  </div>
</template>
