import "./assets/style/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";
import Antd from "ant-design-vue";
import router from "./routers";

const app = createApp(App);

app.use(router);
app.use(Antd);

app.mount("#app");
