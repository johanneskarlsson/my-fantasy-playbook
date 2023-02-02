import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      games: [],
    };
  },
  actions: {
    async login() {
      await $fetch("/api/express/auth/yahoo")
        .then((response) => {
          window.location.href = response; // you get the url of the login page from express, we redirect to it
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },

    async getGames() {
      await $fetch("api/express/yahoo/user/leagues")
        .then((response) => {
          this.games = response.games[0].leagues;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },

    // async logout() {
    //   await $fetch("/api/logout")
    //     .then((response) => {
    //       if (response.status !== 200) {
    //         throw new Error(response.status);
    //       }

    //       return dispatch({
    //         type: USER_LOG_OUT,
    //       });
    //     })
    //     .catch((e) => {
    //       console.log("user couldn't log out");
    //     });
    //   this.user = null;
    // },

    // async getUser() {
    //   const user = await yahooFantasyRequests.auth();
    //   console.log(user);
    // },
  },

  persist: true,
});
