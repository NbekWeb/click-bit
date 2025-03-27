<script setup>
import { RouterView } from "vue-router";
import { reactive, onMounted } from "vue";
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

function getReferralCode() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("ref") || ""; // "ref" parametrini qaytaradi yoki bo'sh string qaytaradi
}

function createTelegramWidget(referralCode) {
  const script = document.createElement("script");
  script.src = "https://telegram.org/js/telegram-widget.js?7";
  script.setAttribute("data-telegram-login", "Nbekbot");
  script.setAttribute("data-size", "medium");
  script.setAttribute("data-radius", "24");
  script.setAttribute(
    "data-auth-url",
    `http://127.0.0.1:8000/api/telegram/auth/?ref=${referralCode}`
  );
  script.setAttribute("data-request-access", "write");

}

onMounted(() => {
  const referralCode = getReferralCode();
  console.log("Referral Code:", referralCode);
  createTelegramWidget(referralCode);
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
