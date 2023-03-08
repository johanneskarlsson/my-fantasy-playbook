import { defineStore, acceptHMRUpdate } from "pinia";
import { slugify } from "~/utils/slugify";
import { yahooFetch } from "~/utils/yahooFetch";

const useTeamStore = defineStore("team", {
  state: () => {
    return {
      teams: [],
    };
  },
  getters: {
    teamBySlug: (state) => (teamSlug) => {
      return state.teams.find((team) => slugify(team.meta.name) === teamSlug);
    },
  },
  actions: {
    async getTeam(team_key) {
      const meta = await this.getMeta(team_key);
      const roster = await this.getRoster(team_key);

      const team = this.teams.find(
        (team) => team.meta.team_id === meta.team_id
      );
      if (team) {
        team.meta = meta;
        team.roster = roster;
      } else this.teams.push({ meta: meta, roster: roster });
    },
    async getMeta(team_key) {
      let meta = await yahooFetch("team/meta", {
        headers: { team_key: team_key },
      })
        .then((response) => {
          console.log("Meta fetched");
          return response;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
      return meta;
    },

    async getRoster(team_key) {
      let roster = await yahooFetch("team/roster", {
        headers: { team_key: team_key },
      })
        .then((response) => {
          console.log("Roster fetched");
          return response.roster;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
      return roster;
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
