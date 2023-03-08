import { defineStore, acceptHMRUpdate } from "pinia";
import { useUiStore } from "../stores/uiStore";
import { yahooFetch } from "~/utils/yahooFetch";

const useLeagueStore = defineStore("league", {
  state: () => {
    return {
      meta: null,
      settings: null,
      standings: null,
    };
  },
  actions: {
    getLeague() {
      this.getLeagueMeta();
      this.getLeagueSettings();
      this.getLeagueStandings();
    },
    async getLeagueMeta() {
      await yahooFetch("league/meta", {
        headers: { league_key: useUiStore().currentLeague.league_key },
      })
        .then((response) => {
          console.log("Meta fetched");
          this.meta = response;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },
    async getLeagueSettings() {
      await yahooFetch("league/settings", {
        headers: { league_key: useUiStore().currentLeague.league_key },
      })
        .then((response) => {
          console.log("Settings fetched");
          this.settings = response.settings;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },
    async getLeagueStandings() {
      await yahooFetch("league/standings", {
        headers: { league_key: useUiStore().currentLeague.league_key },
      })
        .then((response) => {
          console.log("Standings fetched");
          this.standings = response.standings;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLeagueStore, import.meta.hot));
}

export { useLeagueStore };
