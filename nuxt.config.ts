// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      YAHOO_APP_ID: process.env.YAHOO_APP_ID,
      YAHOO_CLIENT_ID: process.env.YAHOO_CLIENT_ID,
      YAHOO_CLIENT_SECRET: process.env.YAHOO_CLIENT_SECRET,
      APP_URL: process.env.APP_URL,
    },
  },

  serverHandlers: [
    {
      route: "/api/express",
      middleware: true,
      handler: "~/subsystem/express.ts",
    },
  ],

  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
