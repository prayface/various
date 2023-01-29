import { createApp } from "vue";
import App from "./App.vue";

import "@various/styles/normalize.less";
import "@various/icons/iconfont.js";
import VariousUI from "@various";

const app = createApp(App);

app.use(VariousUI).mount("#app");
