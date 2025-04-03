<script setup>
import { RouterView } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { ConfigProvider } from "ant-design-vue";
import useProfile from "@/stores/user.pinia";
import { storeToRefs } from "pinia";

const profilePinia = useProfile();

const { profile } = storeToRefs(profilePinia);

const theme = reactive({
  token: {
    borderRadius: 8,
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#f5222d",
    colorInfo: "#1890ff",
  },
});

onMounted(() => {
  profilePinia.deleteProfile();
  // profilePinia.getProfile();
});
</script>

<template>
  <ConfigProvider :theme="theme">
    <div class="bg-dark-100 min-h-screen  text-white">
      <router-view />
    </div>
  </ConfigProvider>
</template>

<style scoped></style>
