<template>
  <form class="objects-filter">
    <AppCheckbox v-model="selectedTypes" class="objects-filter__checkbox" id="object-filter-condo" name="type"
      value="Condo">
      Condo
    </AppCheckbox>
    <AppCheckbox v-model="selectedTypes" class="objects-filter__checkbox" id="object-filter-villa" name="type"
      value="Villa">
      Villa
    </AppCheckbox>
  </form>
</template>

<script lang="ts" setup>
import type { TObjectType } from '~/pages/objects/[id].vue';

interface IEmits {
  (e: 'types-change', newTypes: TObjectType[]): void
}

interface IProps {
  selectedTypes: TObjectType[]
}

const emits = defineEmits<IEmits>()
const props = defineProps<IProps>()

const selectedTypes = ref<TObjectType[]>(props.selectedTypes)

watch(selectedTypes, (newTypes) => {
  emits('types-change', newTypes)
})
</script>

<style lang="scss">
.objects-filter {
  display: flex;

  &__checkbox + &__checkbox {
    margin-left: toRem(16);
  }
}
</style>
