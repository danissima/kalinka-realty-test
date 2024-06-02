<template>
  <div class="checkbox">
    <label class="checkbox__label" :for="id">
      <input v-model="model" v-bind="$attrs" class="checkbox__input" :id="id" :name="name" :value="value"
        type="checkbox">
      <div class="checkbox__checkmark">
        <IconSquare class="checkbox__icon_default" width="24" height="24" />
        <IconSquareCheckmark class="checkbox__icon_checked" width="24" height="24" />
      </div>
      <span>
        <slot />
      </span>
    </label>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  id: string
  name: string
  value: string
}

defineProps<IProps>()

const model = defineModel()
</script>

<style lang="scss">
.checkbox {
  padding: toRem(8) 0;

  &__label {
    cursor: pointer;
    display: flex;
    max-width: fit-content;
    align-items: start;
    font-size: toRem(16);
  }

  &__input {
    display: none;
  }

  &__checkmark {
    position: relative;
    min-width: 24px;
    height: 24px;

    svg {
      position: absolute;
      top: 0;
      left: 0;
      transition: color $transition;
    }
  }

  &__icon {
    &_default {
      color: $dark;
    }
  }

  @include hover {
    &__label:hover &__icon_default {
      color: transparent;
    }

    &__label:hover &__icon_checked {
      color: $dark-500;
    }
  }

  &__input:checked ~ &__checkmark &__icon_default,
  &__icon_checked {
    color: transparent;
  }

  &__input:checked ~ &__checkmark &__icon_checked {
    color: $dark;
  }

  &__label > span {
    margin-left: toRem(6);
  }

}
</style>
