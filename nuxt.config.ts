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
            @use "~/assets/scss/utils.scss" as *;
          `
        }
      }
    }
  }
})
