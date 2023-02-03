import { defineStore } from "pinia";

export const useTeamStore = defineStore("team", {
  state: () => {
    return {
      teams: [],
    };
  },
  actions: {
    async getTeams() {
      await $fetch("api/express/yahoo/teams")
        .then((response) => {
          console.log(response);
          this.teams = response;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },
  },
  persist: true,
});
