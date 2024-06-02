<template>
  <li class="object-card">
    <NuxtLink class="object-card__link" :to="`/objects/${info.id}`">
      <div class="object-card__preview" :style="`background-image: url('${info.images[0]}');`" />
      <div class="object-card__content">
        <div class="object-card__types">
          <span :class="getObjectTypeClasses(info.type[0])">
            {{ info.type[0] }}</span>
        </div>
        <h3 class="object-card__title">
          {{ info.title[locale] }}
        </h3>
        <div class="object-card__price">
          {{ formattedPrice }}
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
import type { IObject, TObjectType } from '~/pages/objects/[id].vue';

export type TObjectCard = Omit<IObject, 'description'>

interface IProps {
  info: TObjectCard
  locale: 'ru' | 'en'
}

const props = defineProps<IProps>()

const { getTypeHintClasses } = useObject()

const formattedPrice = computed<string>(() => {
  return `${Intl.NumberFormat(props.locale, { notation: "compact" }).format(Number(props.info.price))} ₽`
})

function getObjectTypeClasses(objectType: TObjectType): Record<string, boolean> {

  return {
    'object-card__type': true,
    ...getTypeHintClasses(objectType),
  }
}
</script>

<style lang="scss">
.object-card {
  list-style-type: none;

  &__link {
    position: relative;
    overflow: hidden;
    border-radius: toRem(4);
    display: block;
    height: 100%;
    color: $white;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .4);
      background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, .4));
      transition: background-color $transition-slow;
    }

    &:hover::after {
      background-color: rgba(0, 0, 0, .1);
    }
  }

  &__preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: transform $transition-slow;
  }

  &__link:hover &__preview {
    transform: scale(1.05);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: toRem(32) toRem(40);
  }

  &__types {
    margin-bottom: toRem(4);
  }

  &__type {
    padding: toRem(2) toRem(8);
    border-radius: toRem(20);
  }

  &__title {
    margin-bottom: toRem(60);
  }

  &__price {
    margin-top: auto;
    font-size: toRem(28);

  }
}
</style>
