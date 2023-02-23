import { defineStore, acceptHMRUpdate } from "pinia";
import { useLocalStorage } from "@vueuse/core";

const useUserStore = defineStore("user", {
  state: () => {
    return {
      games: null,
    };
  },
  actions: {
    async login() {
      await $fetch("/api/express/auth/yahoo")
        .then((response) => {
          window.location.href = response;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },

    async getTokens(code) {
      await $fetch(`/api/express/auth/yahoo/callback?code=${code}`)
        .then((response) => {
          useLocalStorage("accessToken", { token: response.access_token });
          navigateTo();
        })
        .catch((e) => {
          console.log(e);
          console.log("user couldn't get access/refresh tokens");
        });
    },

    async getGames() {
      await $fetch("api/express/yahoo/user/leagues")
        .then((response) => {
          console.log("Games fetched");
          this.games = response.games[0].leagues.map((league) => {
            return { name: league.name, league_id: league.league_id };
          });
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
  },
  persist: {
    storage: persistedState.localStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

export { useUserStore };
