<template>
  <section class="about">
    <AppContainer>
      <h1>Агентство элитной недвижимости в Москве</h1>
    </AppContainer>
  </section>
  <section class="objects">
    <AppContainer>
      <h2>Жилые комплексы и проекты</h2>
      <ObjectsFilter :selected-types="selectedObjectTypes" @types-change="updateTypes" />
      <ul class="objects__grid">
        <ObjectCard v-for="object in objectsCards" :key="object.id" :info="object" locale="ru" />
      </ul>
      <AppPagination :total-pages="totalPages" :current-page-index="page" @page-change="changePage" />
    </AppContainer>
  </section>
</template>

<script lang="ts" setup>
import type { TObjectCard } from '~/components/ObjectCard.vue';
import type { IObject, TObjectType } from './objects/[id].vue';

useHead({
  title: 'Главная',
})

const route = useRoute()
const router = useRouter()
const page = ref<number>(Number(route.query.page) || 1)

const queryObjectTypes = routerHelpers.queryParamToArray(route.query.type) as TObjectType[]
const selectedObjectTypes = ref<TObjectType[]>(queryObjectTypes)

const OBJECTS_PER_PAGE: number = 6
const totalPages = ref<number>(getTotalPages(selectedObjectTypes.value))

const { data: objects, pending } = await useFetch<IObject[]>(
  () => getObjectsEndpoint(),
  {
    key: `objects-${page.value}`,
  }
)

const objectsCards = computed<TObjectCard[]>(() => {
  if (!objects.value?.length) return []

  return objects.value.map(object => {
    const { id, type, title, price, images } = object
    return {
      id,
      type,
      title,
      price,
      images,
    }
  })
})

function getObjectsEndpoint(): string {
  const endpoint = 'https://kalinka.phuket.forsale/objects?'
  const searchParams = new URLSearchParams()

  if (page.value) {
    searchParams.append('_page', `${page.value}`)
    searchParams.append('_limit', `${OBJECTS_PER_PAGE}`)
  }

  if (selectedObjectTypes.value.length) {
    selectedObjectTypes.value.forEach(objectType => {
      searchParams.append('type', objectType)
    })
  }

  return endpoint + searchParams.toString()
}

function changePage(newPageIndex: number) {
  page.value = newPageIndex

  router.push({
    path: '/',
    query: {
      ...route.query,
      'page': newPageIndex,
    }
  })
}

function updateTypes(newTypes: TObjectType[]) {
  page.value = 1
  selectedObjectTypes.value = newTypes

  totalPages.value = getTotalPages(newTypes)

  router.push({
    path: '/',
    query: {
      ...route.query,
      'page': 1,
      'type': newTypes,
    }
  })
}


/* api doesnt provide amount of pages */
/* this is a temporary solution */
function getTotalPages(objectTypes: TObjectType[]) {
  return objectTypes.length === 1 ? 3 : 5
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
