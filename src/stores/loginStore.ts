import { defineStore } from "pinia";
import { default as loginAPI } from "@/api/login";
import { router } from "@/router";
import type { LoginRequest } from "@/types";

export const useLoginStore = defineStore("main", {
  state: () => ({
    token: localStorage.getItem("token") || "",
  }),

  getters: {},

  actions: {
    async login(userInfo: LoginRequest) {
      let r = await loginAPI(userInfo);
      router.replace("/");
      let token = r.data.token;
      this.token = token;
      localStorage.setItem("token", token);
      return;
    },
  },
});