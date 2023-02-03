import { defineStore } from "pinia";
import { useUiStore } from "../stores/uiStore";

const uiStore = useUiStore();

export const useLeagueStore = defineStore("league", {
  state: () => {
    return {
      leagues: [],
    };
  },
  getters: {
    standings: (state) => {
      return state.leagues.find(
        (league) => league.league_id === uiStore.currentLeague.league_id
      )?.standings;
    },
  },
  actions: {
    async getLeague() {
      await $fetch("api/express/yahoo/leagues")
        .then((response) => {
          this.leagues = response;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },
  },
  persist: true,
});
