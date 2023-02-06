import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage } from "@vueuse/core";

const useUiStore = defineStore("ui", {
  state: () => {
    return {
      currentLeague: useStorage("currentLeague", null),
    };
  },
  actions: {
    setCurrentLeague(league) {
      this.currentLeague = league;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot));
}

export { useUiStore };
