<template>
  <div class="loader">
    <div class="loader__dot" />
    <div class="loader__dot" />
    <div class="loader__dot" />
  </div>
</template>

<style lang="scss">
.loader {
  align-items: center;
  justify-content: center;
  display: flex;

  &__dot {
    animation: dot ease-in-out 1.2s infinite;
    display: inline-block;
    background-color: $dark;
    height: 8px;
    width: 8px;
    border-radius: 50%;

    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }

    &:nth-of-type(3) {
      animation-delay: 0.4s;
    }

    & + & {
      margin-left: toRem(4);
    }
  }

  @keyframes dot {
    0% {
      opacity: .12;
      transform: translateY(0);
    }

    50% {
      opacity: 1;
      transform: translateY(4px);
    }

    100% {
      opacity: .12;
      transform: translateY(0);
    }
  }
}
</style>