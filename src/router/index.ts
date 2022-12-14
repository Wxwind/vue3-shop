import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/layout/index.vue"),
    redirect: "/users",
    children: [
      {
        path: "users",
        name: "users",
        component: () => import("@/views/users/index.vue"),
      },
      {
        path: "categories",
        name: "categories",
        component: () => import("@/views/categories/index.vue"),
      },
      {
        path: "goods",
        name: "goods",
        component: () => import("@/views/goods/index.vue"),
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("@/views/orders/index.vue"),
      },
      {
        path: "params",
        name: "params",
        component: () => import("@/views/params/index.vue"),
      },
      {
        path: "reports",
        name: "reports",
        component: () => import("@/views/reports/index.vue"),
      },
      {
        path: "rights",
        name: "rights",
        component: () => import("@/views/rights/index.vue"),
      },
      {
        path: "roles",
        name: "roles",
        component: () => import("@/views/roles/index.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
