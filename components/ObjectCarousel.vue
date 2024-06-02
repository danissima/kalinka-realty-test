<template>
  <div class="object-carousel">
    <h3 :class="getPriceClasses(type)">{{ Number(price).toLocaleString('ru') }} ₽</h3>
    <div class="object-carousel__content" ref="emblaRef">
      <div class="object-carousel__container">
        <div v-for="(image, index ) in images" :key="image" class="object-carousel__slide">
          <img :src="image" :alt="`Preview #${index + 1}`">
          <span>#{{ index + 1 }}</span>
        </div>
      </div>
    </div>
    <AppButton :theme="type" class="object-carousel__button object-carousel__button_prev" @click="emblaApi?.scrollPrev()">
      <IconChevronLeft />
    </AppButton>
    <AppButton :theme="type" class="object-carousel__button object-carousel__button_next" @click="emblaApi?.scrollNext()">
      <IconChevronRight />
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import emblaCarouselVue from 'embla-carousel-vue'
import type { TObjectType } from '~/pages/objects/[id].vue';

interface IProps {
  images: string[]
  price: string
  type: TObjectType,
}

defineProps<IProps>()

const [emblaRef, emblaApi] = emblaCarouselVue()
const { getTypeHintClasses } = useObject()

function getPriceClasses(objectType: TObjectType) {

  return {
    'object-carousel__price': true,
    ...getTypeHintClasses(objectType),
  }
}

</script>

<style lang="scss">
.object-carousel {
  --inside-gap: #{toRem(24)};
  position: relative;

  &__price {
    position: absolute;
    top: var(--inside-gap);
    left: var(--inside-gap);
    z-index: 1;
    border-radius: toRem(24);
    padding: toRem(2) toRem(12);
  }

  &__content {
    overflow: hidden;
    max-height: 750px;
    border-radius: toRem(8);
  }

  &__container {
    display: flex;
    max-height: inherit;
  }

  &__slide {
    position: relative;
    flex: 0 0 100%;
    min-width: 0;

    & + & {
      margin-left: toRem(24);
    }
  }

  &__slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__slide span {
    position: absolute;
    bottom: var(--inside-gap);
    right: var(--inside-gap);
    background-color: rgba($white, .6);
    border-radius: toRem(24);
    padding: toRem(2) toRem(8);
    pointer-events: none;
  }

  &__button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    &_prev {
      left: var(--inside-gap);
    }

    &_next {
      right: var(--inside-gap);
    }
  }

  &__button svg {
    width: 24px;
    height: 24px;
  }
}
</style>
