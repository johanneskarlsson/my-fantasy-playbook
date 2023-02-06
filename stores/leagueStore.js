import { defineStore, acceptHMRUpdate } from "pinia";
import { useUiStore } from "../stores/uiStore";
import { useStorage } from "@vueuse/core";
import { slugify } from "~/utils/slugify";

const uiStore = useUiStore();

const useLeagueStore = defineStore("league", {
  state: () => {
    return {
      leagues: useStorage("leagues", []),
    };
  },
  getters: {
    leagueBySlug(state) {
      return (leagueSlug) => {
        return state.leagues.find(
          (league) => slugify(league.name) === leagueSlug
        );
      };
    },

    // standings: (state) => {
    //   return state.leagues.find(
    //     (league) => league.league_id === uiStore.currentLeague.league_id
    //   )?.standings;
    // },
  },
  actions: {
    async getLeague() {
      await $fetch("api/express/yahoo/leagues")
        .then((response) => {
          console.log("Leagues fetched");
          this.leagues = response;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLeagueStore, import.meta.hot));
}

export { useLeagueStore };
