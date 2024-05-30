<template>
  <div>
    <h1>Hi {{ username }}</h1>
  </div>
</template>

<script setup lang="ts">
const username = ref<string>('danon')
</script>
