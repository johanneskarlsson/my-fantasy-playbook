import { defineStore } from "pinia";

export const useLeagueStore = defineStore("league", {
  state: () => {
    return {
      id: null,
      name: null,
      standings: [],
    };
  },
  actions: {
    async getLeague() {
      await $fetch("api/express/yahoo/league/standings")
        .then((response) => {
          console.log(response);
          this.id = response.league_id;
          this.name = response.name;
          this.standings = response.standings;
        })
        .catch((e) => {
          console.log(e);
          console.log("no league");
        });
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
