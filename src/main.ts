import { createApp } from "vue";
import App from "./App.vue";

import { router } from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss";

import svgIcon from "./icons/svgIcon.vue";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(router).use(ElementPlus).use(pinia).component("svgIcon", svgIcon).mount("#app");
