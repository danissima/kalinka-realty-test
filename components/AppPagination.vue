<template>
  <div class="pagination">
    <AppButton v-for="index in totalPages" :key="index" :class="getButtonClasses(index)"
      :disabled="currentPageIndex === index" @click="changePage(index)">
      {{ index }}
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  totalPages: number
  currentPageIndex: number
}

const emits = defineEmits(['page-change'])

const props = defineProps<IProps>()

function getButtonClasses(buttonIndex: number): Record<string, boolean> {
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
    &_active {
      border-color: $dark;
      background-color: $dark;
      color: $white;
    }
  }

  &__button + &__button {
    margin-left: toRem(4);
  }
}
</style>
