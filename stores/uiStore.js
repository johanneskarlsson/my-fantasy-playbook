import { defineStore, acceptHMRUpdate } from "pinia";

const useUiStore = defineStore("ui", {
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
  persist: {
    storage: persistedState.localStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot));
}

export { useUiStore };
