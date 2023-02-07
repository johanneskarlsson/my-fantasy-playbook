import { defineStore, acceptHMRUpdate } from "pinia";
import { useLocalStorage } from "@vueuse/core";

const useUserStore = defineStore("user", {
  // const games = useStorage("games", ref([]));

  // async function login() {
  //   await $fetch("/api/express/auth/yahoo")
  //     .then((response) => {
  //       window.location.href = response; // you get the url of the login page from express, we redirect to it
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       console.log("user not authenticated");
  //     });
  // }

  // async function getGames() {
  //   await $fetch("api/express/yahoo/user/leagues")
  //     .then((response: any) => {
  //       console.log("Games fetched");
  //       games.value = response.games[0].leagues;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       console.log("user not authenticated");
  //     });
  // }

  state: () => {
    return {
      games: useLocalStorage("games", []),
      userLoggedIn: useLocalStorage("userLoggedIn", false),
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

    async get_tokens(code) {
      await $fetch(`/api/express/auth/yahoo/callback?code=${code}`)
        .then((response) => {
          useLocalStorage("accessToken", response.access_token);
          this.userLoggedIn = true;
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
          this.games = response.games[0].leagues;
        })
        .catch((e) => {
          console.log(e);
          console.log("user not authenticated");
        });
    },
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
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

export { useUserStore };
