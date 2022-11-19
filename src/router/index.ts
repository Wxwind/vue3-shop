import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
