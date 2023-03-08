import { useUserStore } from "~/stores/userStore";

export const yahooFetch = $fetch.create({
  retry: 2,
  baseURL: "/api/express/yahoo",
  onRequest({ request, options }) {
    const access_token = localStorage.getItem("accessToken");
    options.headers = new Headers(options.headers);
    options.headers["authorization"] = access_token;
  },
  async onResponseError({ request, options, response }) {
    // If error was because unauthoraized/expired (look at the error, I'm not sure if it's 401),
    // then we refresh the tokens and retry the call again
    if (response.status === 400) {
      await useUserStore().refreshTokens();

      // get new access_token from local storage or userStore
      const access_token = localStorage.getItem("accessToken");
      options.headers = new Headers(options.headers);
      options.headers["authorization"] = access_token;
    }
  },
});
