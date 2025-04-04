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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MjgyMzcwLCJpYXQiOjE3NDM2Nzc1NzAsImp0aSI6ImRhMzFiZmU5YTg1OTRkZmM5ZWY4M2IwZjQwMjI5Y2NkIiwidXNlcl9pZCI6MjZ9.RynVslyaWI8u5h34GjsZfdSlic0RssTvSfaQ8hUR7e0"
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
