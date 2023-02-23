import { defineStore, acceptHMRUpdate } from "pinia";
import { slugify } from "~/utils/slugify";

const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      players: [],
    };
  },
  getters: {
    playerBySlug: (state) => (playerSlug) => {
      return state.players.find(
        (player) => slugify(player.name) === playerSlug
      );
    },
  },
  actions: {
    async getPlayers() {
      await $fetch("api/express/yahoo/players/leagues")
        .then((response) => {
          console.log("Players fetched");
          console.log(response);
          //   this.teams = response.flatMap((league) =>
          //     league.teams.map((team) => {
          //       team.league = league.name;
          //       team.league_id = league.league_id;
          //       return team;
          //     })
          //   );
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
