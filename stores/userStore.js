import { defineStore, acceptHMRUpdate } from "pinia";
import { yahooFetch } from "~/utils/yahooFetch";

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
          localStorage.setItem("accessToken", response.access_token);
          localStorage.setItem("refreshToken", response.refresh_token);
          navigateTo();
        })
        .catch((e) => {
          console.log(e);
          console.log("user couldn't get access/refresh tokens");
        });
    },

    async refreshTokens() {
      const refreshToken = localStorage.getItem("refreshToken"); // not sure how this works, but we need to get refresh token from localstorage
      await $fetch(`/api/express/auth/yahoo/refresh_token`, {
        headers: { authorization: refreshToken },
      })
        .then((response) => {
          console.log("refreshed tokens");
          localStorage.setItem("accessToken", response.access_token);
          localStorage.setItem("refreshToken", response.refresh_token);
        })
        .catch((e) => {
          console.log(e);
          console.log("user couldn't refresh access/refresh tokens");
        });
    },

    async getGames() {
      await yahooFetch("user/leagues")
        .then((response) => {
          console.log("Games fetched");
          this.games = response.games[0].leagues.map((league) => {
            return {
              name: league.name,
              league_id: league.league_id,
              league_key: league.league_key,
            };
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
