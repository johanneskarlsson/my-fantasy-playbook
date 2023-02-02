import { defineStore } from "pinia";

export const useTeamStore = defineStore("team", {
  state: () => {
    return {
      id: null,
      name: null,
      roster: [],
    };
  },
  actions: {
    async getRoster(team_key) {
      await $fetch("api/express/yahoo/team/roster", {
        method: "POST",
        body: JSON.stringify(team_key),
      })
        .then((response) => {
          console.log(response);
          this.roster = response.players;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },
  },
  persist: true,
});
