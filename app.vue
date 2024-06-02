<template>
  <!-- <div id="app"> -->
    <TheHeader />
    <main class="main">
      <NuxtPage />
    </main>
    <TheFooter />
  <!-- </div> -->
</template>

<script setup lang="ts">
useHead({
  titleTemplate(title) {
    if (!title) {
      return 'Kalinka Realty'
    }

    return `${title} | Kalinka Realty`
  },
})
</script>

<style lang="scss">
html,
body,
#__nuxt {
  height: 100%;
}

#__nuxt {
  flex-direction: column;
  display: flex;
  min-height: 100%;
  height: auto;
}

.main {
  margin-bottom: toRem(32);
}
</style>