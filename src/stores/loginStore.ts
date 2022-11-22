import { defineStore } from "pinia";
import { login as loginAPI } from "@/api/login";
import { router } from "@/router";
import type { LoginRequest } from "@/types";
import { setTokenTime } from "@/utils/auth";

export const useLoginStore = defineStore("loginStore", {
  state: () => ({
    token: localStorage.getItem("token") || "",
  }),

  getters: {},

  actions: {
    async login(userInfo: LoginRequest) {
      let r = await loginAPI(userInfo);
      let token = r.data.token;
      this.token = token;
      localStorage.setItem("token", token);
      setTokenTime();
      router.replace("/");
      return;
    },
    logout() {
      this.token = "";
      localStorage.setItem("token", "");
      localStorage.clear();
      router.replace("/login");
    },
  },
});
