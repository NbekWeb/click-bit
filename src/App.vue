<script setup>
import { RouterView } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { init, getLaunchParams } from "@telegram-apps/sdk-vue";

const initData = ref(null);

onMounted(() => {
  try {
    init(); // Initialize Telegram SDK
    initData.value = getLaunchParams();
    console.log("initData:", initData.value);
  } catch (error) {
    console.error("Error initializing Telegram SDK:", error);
  }
});

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
</script>

<template>
  <ConfigProvider :theme="theme">
    <div class="bg-dark-100 min-h-screen px-3 text-white">
      <router-view />
    </div>
  </ConfigProvider>
</template>

<style scoped></style>
