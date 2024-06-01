<template>
  <div class="object-card">
    <NuxtLink class="object-card__link" :to="`/objects/${info.id}`">
      <div class="object-card__preview" :style="`background-image: url('${info.preview}');`" />
      <div class="object-card__content">
        <div class="object-card__types">
          <span v-for="objectType in info.type" :key="objectType" :class="getObjectTypeClasses(objectType)">
            {{ objectType }}</span>
        </div>
        <h3 class="object-card__title">
          {{ info.title[locale] }}
        </h3>
        <div class="object-card__price">
          {{ formattedPrice }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },

  locale: {
    type: String,
    required: true,
  },
})

const formattedPrice = computed<string>(() => {
  return `${Intl.NumberFormat(props.locale, { notation: "compact" }).format(props.info.price)} ₽`
})

function getObjectTypeClasses(objectType: string) {
  const typeToClass = objectType.toLowerCase()

  return {
    'object-card__type': true,
    [`object-card__type_${typeToClass}`]: !!objectType,
  }
}
</script>

<style lang="scss">
.object-card {
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

    &_condo {
      background-color: rgba($blue, .6);
    }

    &_villa {
      background-color: rgba($red, .6);
    }
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
