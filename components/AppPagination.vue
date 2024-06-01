<template>
  <div class="pagination">
    <button v-for="index in totalPages" :key="index" :class="getButtonClasses(index)" type="button"
      @click="changePage(index)">
      {{ index }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['page-change'])

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },

  currentPageIndex: {
    type: Number,
    required: true,
  }
})

function getButtonClasses(buttonIndex: number) {
  return {
    'pagination__button': true,
    'pagination__button_active': buttonIndex === props.currentPageIndex
  }
}

function changePage(newIndex: number) {
  if (newIndex === props.currentPageIndex) return

  emits('page-change', newIndex)
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;

  &__button {
    border: 1px solid rgba($dark, .3);
    border-radius: toRem(4);
    height: 40px;
    min-width: 40px;
    padding: toRem(8);
    transition: border-color $transition, background-color $transition, color $transition;
    font-size: toRem(18);

    &:hover {
      border-color: $blue;
    }

    &_active {
      border-color: $blue;
      background-color: $blue;
      color: $white;
    }
  }

  &__button + &__button {
    margin-left: toRem(4);
  }
}
</style>
