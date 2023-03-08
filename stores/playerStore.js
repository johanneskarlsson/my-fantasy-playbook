import { defineStore, acceptHMRUpdate } from "pinia";
import { useUiStore } from "../stores/uiStore";
import { slugify } from "~/utils/slugify";
import { yahooFetch } from "~/utils/yahooFetch";

const uiStore = useUiStore();

const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      players: [],
    };
  },
  getters: {
    playerBySlug: (state) => (playerSlug) => {
      return state.players.find(
        (player) => slugify(player.name.full) === playerSlug
      );
    },
  },
  actions: {
    async getPlayers() {
      await yahooFetch("players/leagues")
        .then((response) => {
          console.log("Players fetched");
          response.forEach((league) => {
            if (league.league_id === uiStore.currentLeague.league_id) {
              this.players = league.players;
            }
          });
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
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot));
}

export { usePlayerStore };
