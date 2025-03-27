<script setup>
import { RouterView } from "vue-router";
import { reactive ,onMounted } from "vue";
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

onMounted(() => {
  // Check if running inside Telegram WebApp
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand(); // Expand WebApp to full screen
    console.log("User Data:", tg.initDataUnsafe?.user);
  } else {
    // Use Telegram Login Widget for external sites
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", "YOUR_BOT_USERNAME");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "https://your-backend.com/auth/telegram");
    script.setAttribute("data-request-access", "write");
    document.body.appendChild(script);
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
