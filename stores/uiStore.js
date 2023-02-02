import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => {
    return {
      currentLeague: null,
    };
  },
  actions: {
    setCurrentLeague(league) {
      this.currentLeague = league;
    },
  },
  persist: true,
});
