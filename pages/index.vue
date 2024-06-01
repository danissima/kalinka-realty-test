<template>
  <section class="about">
    <AppContainer>
      <h1>Агентство элитной недвижимости в Москве</h1>
    </AppContainer>
  </section>
  <section class="objects">
    <AppContainer>
      <h2>Жилые комплексы и проекты</h2>
      <p class="objects__description">Наши приоритеты - удобство, красота и эстетичность</p>
      <div class="objects__grid">
        <ObjectCard
          v-for="object in objectsCards"
          :key="object.id"
          :info="object"
          locale="ru"
        />
      </div>
    </AppContainer>
  </section>
</template>

<script setup>
useHead({
  title: 'Главная',
})

const route = useRoute()
const page = route.query.page || 1

const OBJECTS_PER_PAGE = 9
const { data: objects, error } = useFetch(`https://kalinka.phuket.forsale/objects`, {
  query: {
    '_page': page,
    '_limit': OBJECTS_PER_PAGE,
  }
})

const objectsCards = computed(() => {
  if (!objects.value?.length) return []

  return objects.value.map(object => {
    const { id, type, title, price, images } = object
    return {
      id,
      type,
      title,
      price,
      preview: images[0],
    }
  })
})



</script>

<style lang="scss">
section + section {
  margin-top: toRem(80);
}

.about {
  h1 {
    text-align: center;
    font-size: toRem(28);
  }
}

.objects {
  h2 {
    margin-bottom: toRem(20);
  }

  &__grid {
    --columns: 3;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 16px;
    margin-top: toRem(16);

    @include break($xl) {
      --columns: 2;
    }

    @include break($md) {
      --columns: 1;
    }
  }
}
</style>
