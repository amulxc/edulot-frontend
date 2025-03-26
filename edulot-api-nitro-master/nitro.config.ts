//https://nitro.unjs.io/config
export default defineNitroConfig({
  routeRules: {
    "/*": { cors: true },
  },
  preset: "netlify",
  srcDir: "server",
  compatibilityDate: "2025-02-09",
  experimental: {
    openAPI: true,
  },

  openAPI: {
    production: "runtime",
    ui: {
      scalar: {
        theme: "purple",
      },
    },
  },
});
