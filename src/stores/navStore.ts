import { defineStore } from "pinia";

export const useNavStore = defineStore("navStore", {
  state: () => ({
    isNavOpen: true,
  }),

  getters: {},

  actions: {
    switchNavState() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
});
