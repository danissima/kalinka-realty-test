<template>
  <header class="header">
    <NuxtLink to="/">
      <IconLogo class="header__logo" />
    </NuxtLink>
  </header>
</template>

<style lang="scss">
.header {
  padding: toRem(24) 0;
  text-align: center;

  &__logo {
    width: 100%;
    max-width: 400px;
  }
}
</style>
