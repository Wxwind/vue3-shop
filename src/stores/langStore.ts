import { defineStore } from "pinia";

export const useLangStore = defineStore("langStore", {
  state: () => ({
    lang: localStorage.getItem("lang") || "en",
  }),

  getters: {},

  actions: {
    switchLanguage(lang: string) {
      this.lang = lang;
    },
  },
});
