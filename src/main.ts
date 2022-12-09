import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss";

import { router } from "./router";
import { createPinia } from "pinia";
import svgIcon from "./icons/svgIcon.vue";
import "@/router/permission";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { i18n } from "@/localization";
import { filterTimes } from "@/utils/filtertime";
import DataVVue3 from "@kjgl77/datav-vue3";

const pinia = createPinia();

const app = createApp(App);
app.use(router).use(pinia).use(i18n).use(DataVVue3).component("svgIcon", svgIcon).mount("#app");
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.config.globalProperties.$fliters = { filterTimes };
