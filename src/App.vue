<script setup>
import { RouterView } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { ConfigProvider } from "ant-design-vue";
import useProfile from "@/stores/user.pinia";
import { storeToRefs } from "pinia";

const profilePinia = useProfile();

const { profile, sound } = storeToRefs(profilePinia);

const theme = reactive({
  token: {
    borderRadius: 8,
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#f5222d",
    colorInfo: "#1890ff",
  },
});

const open = ref(false);
// let audio = null;

// const playSound = () => {
//   if (!sound.value?.files) return;

//   if (audio && !audio.paused) return;

//   audio = new Audio(sound.value.files);
//   audio.loop = true; // 🔁 Instant replay when it ends
//   audio.play().catch((err) => {
//     console.warn("Audio play failed:", err);
//   });
// };

onMounted(() => {
  profilePinia.getProfile();
  profilePinia.getCurrency();
  // profilePinia.getSounds();
});
</script>

<template>
  <ConfigProvider :theme="theme">
    <div class="bg-dark-100 min-h-screen text-white">
      <router-view />
    </div>
    <!-- <a-modal v-model:open="open">
      <h3 class="text-xl font-semibold pt-5">Play Sound?</h3>
      <template #footer>
        <div class="flex items-center gap-2 justify-end">
          <button
            class="btn-orange rounded py-1 px-4 font-semibold hover:opacity-80"
          >
            Cancel
          </button>
          <button
            @click="
              () => {
                playSound();
                open = false;
              }
            "
            class="btn-primary rounded py-1 px-4 font-semibold hover:opacity-80"
          >
            Ok
          </button>
        </div>
      </template>
    </a-modal> -->
  </ConfigProvider>
</template>

<style scoped></style>
