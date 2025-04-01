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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMjEwMTg1LCJpYXQiOjE3NDMyMDk4ODUsImp0aSI6ImVhM2Q2YmMxMzQ3MjRmMTNhNTcxMDM5MzljNjI5ZmI3IiwidXNlcl9pZCI6M30.0j-P00SnpzCcEeO7FFRlfLwOyeXbkgnUFckiGivs1uM"
  );
  router.push({ name: "Earn" });
  //   loginPinia.postLogin({ initData }, () => {
  //     router.push({ name: "Earn" });
  //   });
});
</script>

<template>
  <div>salom</div>
</template>
