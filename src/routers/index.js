import { createRouter, createWebHistory } from "vue-router";
import Main from "@/layout/Main.vue";
import Earn from "@/pages/Earn.vue";
import Market from "@/pages/Market.vue";
import Spend from "@/pages/Spend.vue";
import CardOne from "@/pages/CardOne.vue";
import Refer from "@/pages/Refer.vue";
import Login from "@/pages/Login.vue";
import Profile from "@/pages/Profile.vue";
const routes = [
  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  {
    path: "/profile",
    component: Profile,
    name: "Profile",
  },
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        component: Earn,
        name: "Earn",
      },
      {
        path: "market",
        component: Market,
        name: "Market",
      },
      {
        path: "spend",
        component: Spend,
        name: "Spend",
      },
      {
        path: "card/:id",
        component: CardOne,
        name: "CardOne",
      },
      {
        path: "refer",
        component: Refer,
        name: "Refer",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("access_token");

  if (to.name === "Login") {
    return next();
  }

  if (accessToken) {
    next();
  } else {
    next({ name: "Login" });
  }
});

export default router;
