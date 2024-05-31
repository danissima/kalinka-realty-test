<template>
  <div>
    <TheHeader />
    <NuxtPage />
    <TheFooter />
  </div>
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