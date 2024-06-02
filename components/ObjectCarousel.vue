<template>
  <div class="object-carousel">
    <h3 :class="getPriceClasses(type)">{{ Number(price).toLocaleString('ru') }} ₽</h3>
    <div class="object-carousel__content" ref="emblaRef">
      <div class="object-carousel__container">
        <div v-for="(image, index ) in images" :key="image" class="object-carousel__slide">
          <img :src="image" :alt="`Preview #${index + 1}`">
        </div>
      </div>
    </div>
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

const [emblaRef] = emblaCarouselVue()
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
  position: relative;

  &__price {
    position: absolute;
    top: toRem(24);
    left: toRem(24);
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
}
</style>
