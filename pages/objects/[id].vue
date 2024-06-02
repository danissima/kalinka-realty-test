<template>
  <section class="object">
    <AppContainer>
      <template v-if="status === 'success' && data">
        <h1 class="object__title">{{ data.title[locale] }}</h1>
        <ObjectCarousel :images="data.images" :price="data.price" :type="data.type[0]" class="object__carousel" />
        <div class="object__description" v-html="data.description[locale]" />
      </template>
    </AppContainer>
  </section>
</template>

<script lang="ts" setup>
export type TObjectType = 'Condo' | 'Villa'
export interface IObject {
  id: number
  type: TObjectType[]
  title: {
    ru: string
    en: string
  }
  description: {
    ru: string
    en: string
  }
  price: string
  images: string[]
}

const route = useRoute()
const locale = 'ru'

const { data, status } = await useFetch<IObject>(
  () => `https://kalinka.phuket.forsale/objects/${route.params.id}`,
  {
    key: `object-${route.params.id}`,
  }
)

useHead({
  title: data.value?.title[locale],
})
</script>

<style lang="scss">
.object {
  &__title {
    margin-bottom: toRem(24);
  }

  &__carousel {
    margin-bottom: toRem(48);
  }

  &__description p {
    margin: toRem(12) 0;
  }
}
</style>
