import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: null,
      players: [],
    };
  },
  actions: {
    async login() {
      await $fetch("/api/express/auth/yahoo")
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
      this.user = "me";
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
});
