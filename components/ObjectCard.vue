<template>
  <div class="object-card">
    <NuxtLink class="object-card__link" :to="`/objects/${info.id}`">
      <div class="object-card__preview" :style="`background-image: url('${info.preview}');`" />
      <div class="object-card__content">
        <h4>{{ info.type[0] }}</h4>
        <h3 class="object-card__title">
          {{ info.title[locale] }}
        </h3>
        <div class="object-card__price">
          {{ info.price }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  info: {
    type: Object,
    required: true,
  },

  locale: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss">
.object-card {
  &__link {
    position: relative;
    overflow: hidden;
    border-radius: toRem(4);
    display: block;
    color: $white;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .3);
      background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, .3));
      transition: background-color .4s ease-out;
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
    transition: transform .4s ease-out;
  }

  &__link:hover &__preview {
    transform: scale(1.05);
  }

  &__content {
    position: relative;
    z-index: 1;
    padding: toRem(20) toRem(24);
  }
}
</style>
