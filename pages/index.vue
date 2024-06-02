<template>
  <section class="about">
    <AppContainer>
      <h1>Агентство элитной недвижимости в Москве</h1>
    </AppContainer>
  </section>
  <section class="objects">
    <AppContainer>
      <h2>Жилые комплексы и проекты</h2>
      <ul class="objects__grid">
        <ObjectCard v-for="object in objectsCards" :key="object.id" :info="object" locale="ru" />
      </ul>
      <AppPagination :total-pages="5" :current-page-index="page" @page-change="changePage" />
    </AppContainer>
  </section>
</template>

<script setup>
useHead({
  title: 'Главная',
})

const route = useRoute()
const router = useRouter()
const page = ref(Number(route.query.page) || 1)

const OBJECTS_PER_PAGE = 6
const { data: objects, pending } = await useFetch(
  () => `https://kalinka.phuket.forsale/objects?_page=${page.value}&_limit=${OBJECTS_PER_PAGE}`,
  {
    key: `objects-${page.value}`,
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

function changePage(newPageIndex) {
  page.value = newPageIndex

  router.push({
    path: '/',
    query: {
      ...route.query,
      'page': newPageIndex,
    }
  })
}
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
    margin: toRem(16) 0;

    @include break($xl) {
      --columns: 2;
    }

    @include break($md) {
      --columns: 1;
    }
  }
}
</style>
