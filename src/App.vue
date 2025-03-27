<script setup>
import { RouterView } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { useLaunchParams } from "@telegram-apps/sdk-vue";

const launchParams = useLaunchParams();

console.log(launchParams.initData);

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
