import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import "virtual:svg-icons-register";
import "@various/styles/index.less";
import VariousUI from "@various";

const app = createApp(App);

app.use(router).use(VariousUI).mount("#app");
