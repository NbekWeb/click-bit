<script setup>
import { reactive, onMounted, ref } from "vue";
import useLogin from "@/stores/login.pinia";
import { useRouter } from "vue-router";

const loginPinia = useLogin();
const router = useRouter();

onMounted(() => {
  let tg = window.Telegram.WebApp;
  const initData = tg.initData;
  loginPinia.postLogin({ initData }, () => {
    router.push({ name: "Earn" });
  });
});
</script>

<template>
  <div>salom</div>
</template>
