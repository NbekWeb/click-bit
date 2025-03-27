<script setup>
import { RouterView } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { ConfigProvider } from "ant-design-vue";

onMounted(() => {
  let tg = window.Telegram.WebApp;
  const initData = tg.initData;
  console.log(initData);
});
onMounted(async () => {
  const payload = {
    id: 5329246981,
    hash: "603f038d2de281cc0ea573944202328c508af9ed67e8a684189765dd0b8f93a4"
  };

  try {
    const response = await fetch("http://192.168.1.117:8000/api/telegram/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
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
