<template>
  <div>
    {{ page }}
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Home',
})

const route = useRoute()
const page = route.query.page || 1

</script>

<style lang="scss"></style>
