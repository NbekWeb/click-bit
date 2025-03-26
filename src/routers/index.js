import { createRouter, createWebHistory } from "vue-router";
import Main from "@/layout/Main.vue";
import Earn from "@/pages/Earn.vue";
import Market from "@/pages/Market.vue";
import Spend from "@/pages/Spend.vue";
import CardOne from "@/pages/CardOne.vue";
import Refer from "@/pages/Refer.vue";

const routes = [
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

export default router;
