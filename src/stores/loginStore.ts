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
      let token = r.token;
      this.token = token;
      localStorage.setItem("token", token);
      router.replace("/");
      console.log("set token");
      return;
    },
  },
});
