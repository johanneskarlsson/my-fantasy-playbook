// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      YAHOO_APP_ID: process.env.YAHOO_APP_ID,
      YAHOO_CLIENT_ID: process.env.YAHOO_CLIENT_ID,
      YAHOO_CLIENT_SECRET: process.env.YAHOO_CLIENT_SECRET,
      APP_URL: process.env.APP_URL,
    },
    proxy: {
      options: {
        target: "https://wide-onions-share-81-234-67-16.loca.lt/",
        changeOrigin: true,
        pathRewrite: {
          "^/api/todos": "/todos",
          "^/api/users": "/users",
        },
        pathFilter: ["/api/todos", "/api/users"],
      },
    },
  },
  serverHandlers: [
    {
      route: "/api/express",
      middleware: true,
      handler: "~/subsystem/express.ts",
    },
  ],
  modules: ["@pinia/nuxt", "nuxt-proxy"],
});
