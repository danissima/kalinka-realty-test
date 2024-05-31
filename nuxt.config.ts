export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  css: [
    '~/assets/scss/global.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_mixins.scss" as *;
            @use "~/assets/scss/_variables.scss" as *;
          `
        }
      }
    }
  }
})
