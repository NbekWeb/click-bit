<script setup>
import { reactive, onMounted, ref } from "vue";
import useLogin from "@/stores/login.pinia";
import { useRouter } from "vue-router";

const loginPinia = useLogin();
const router = useRouter();

onMounted(() => {
  let tg = window.Telegram.WebApp;
  const initData = tg.initData;

  localStorage.setItem(
    "access_token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNTA4NDgxLCJpYXQiOjE3NDM1MDgxODEsImp0aSI6ImJlZThiYWQwZTYzNDQ0NmFhNTE5YzUyMmIwNTU4M2VmIiwidXNlcl9pZCI6MjZ9.APHj-js7Y0pqS9X5Girs7iIA_bcPHhA2Wnq4hBVeV04"
  );
  router.push({ name: "Earn" });
  // loginPinia.postLogin({ initData }, () => {
  //   router.push({ name: "Earn" });
  // });
});
</script>

<template>
  <div class="flex items-center justify-center h-screen overflow-hidden w-full">
    <a-spin size="large" />
  </div>
</template>
