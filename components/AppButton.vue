<template>
  <button :class="classes" type="button">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import type { TObjectType } from '~/pages/objects/[id].vue';

interface IProps {
  theme?: TObjectType
}

const props = withDefaults(defineProps<IProps>(), {
  theme: 'Condo',
})

const classes = computed(() => {
  const themeToClass = props.theme.toLowerCase()

  return {
    'button': true,
    [`button_${themeToClass}`]: !!themeToClass,
  }
})
</script>

<style lang="scss">
.button {
  border-radius: toRem(48);
  height: 40px;
  min-width: 40px;
  padding: toRem(8);
  background-color: $white;
  transition: color $transition, background-color $transition;
  font-size: toRem(18);

  &_condo {
    --type-primary-color: #{$blue};
  }

  &_villa {
    --type-primary-color: #{$red};
  }

  &:hover {
    color: var(--type-primary-color);
  }

  &:active {
    color: $white;
    background-color: var(--type-primary-color);
  }

  &:disabled {
    pointer-events: none;
  }
}
</style>