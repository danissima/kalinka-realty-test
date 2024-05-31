export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_global.scss" as *;'
        }
      }
    }
  }
})
