import { defineStore, acceptHMRUpdate } from "pinia";
import { slugify } from "~/utils/slugify";

const useTeamStore = defineStore("team", {
  state: () => {
    return {
      teams: [],
    };
  },
  getters: {
    teamBySlug: (state) => (teamSlug) => {
      return state.teams.find((team) => slugify(team.name) === teamSlug);
    },
  },
  actions: {
    async getTeams() {
      await $fetch("api/express/yahoo/teams/leagues")
        .then((response) => {
          console.log("Teams fetched");
          this.teams = response.flatMap((league) =>
            league.teams.map((team) => {
              team.league = league.name;
              team.league_id = league.league_id;
              return team;
            })
          );
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
  import.meta.hot.accept(acceptHMRUpdate(useTeamStore, import.meta.hot));
}

export { useTeamStore };
