<script setup>
import { RouterView } from "vue-router";
import { reactive, onMounted,ref } from "vue";
import { ConfigProvider } from "ant-design-vue";

const theme = reactive({
  token: {
    colorPrimary: "#ff4d4f",
    borderRadius: 8,
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#f5222d",
    colorInfo: "#1890ff",
  },
});

const telegramUser = ref(null);

onMounted(() => {
  if (window.Telegram && window.Telegram.WebApp) {
    const webApp = window.Telegram.WebApp;
    webApp.expand(); // Expands the Web App UI

    // Get user data
    telegramUser.value = webApp.initDataUnsafe?.user || null;
    console.log("Telegram User:", telegramUser.value);
  } else {
    console.error("Telegram WebApp not found");
  }
});
</script>

<template>
  <ConfigProvider :theme="theme">
    <div class="bg-dark-100 min-h-screen px-3 text-white">
      <router-view />
    </div>
  </ConfigProvider>
</template>

<style scoped></style>
