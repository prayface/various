import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import "@various/styles/index.less";
import "@various/icons/iconfont.js";
import VariousUI from "@various";

const app = createApp(App);

app.use(router).use(VariousUI).mount("#app");
