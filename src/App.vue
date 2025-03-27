<script setup>
import { RouterView } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { ConfigProvider } from "ant-design-vue";

onMounted(() => {
  let tg = window.Telegram.WebApp;
  const initData = tg.initData;
  console.log(initData);
});
// onMounted(async () => {
//   const payload = {
//     initData:
//       "user=%7B%22id%22%3A5329246981%2C%22first_name%22%3A%22Nodirbek%22%2C%22last_name%22%3A%22Najmiddinov%22%2C%22username%22%3A%22Rare_Oligarch%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FGTjzweWw22rKKoIgBxPWYzXbv9dkO9ufpeBr_2IyPoHmmeFc6dQLS9ixvnOKCJyb.svg%22%7D&chat_instance=2144080057543877648&chat_type=private&auth_date=1743065949&signature=MDKS9c_wUnNWhQXB25goU-BeeZju3JL4JNGqE3A6Dj5TeaXQ_6VFUcFWzllWkJ4_aq38eET_4YR6lBuTiKs2Aw&hash=603f038d2de281cc0ea573944202328c508af9ed67e8a684189765dd0b8f93a4",
//   };

//   try {
//     const response = await fetch(
//       "https://app.istombroker.ru/api/telegram/auth/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     const data = await response.json();
//     console.log("Response:", data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

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
