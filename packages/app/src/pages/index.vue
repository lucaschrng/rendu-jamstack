<script lang="ts" setup>
import { useSearchStore } from '#imports'
import type { Tag } from '~/models/recipes.model'

const { find } = useStrapi4()

const { data: tags, pending } = await useAsyncData(
  'tags',
  () => find<{ data: Tag[] }>(
    'tags',
    { populate: '*' },
  ),
)

const selectedTag = ref<{ name: string, id: number | null }>({ name: 'All', id: null })

const search = useSearchStore()
const filteredRecipes = computed(() => {
  if (!search.results)
    return []

  if (!selectedTag.value.id)
    return search.results

  return search.results.filter(recipe => recipe.tags.map(tag => tag.id).includes(selectedTag.value.id ?? 0))
})
</script>

<template>
  <div class="p-12">
    <h1>Recipes</h1>

    <div :style="{ border: '1px solid rgb(212, 212, 212)' }" class="rounded flex items-center w-fit bg-white mb-3 focus-within:outline outline-neutral-400">
      <svg class="w-6 h-6 p-1 text-neutral-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <input
        v-model="search.query"
        class="p-2 border-transparent outline-none rounded"
        placeholder="Search"
        type="text"
      >
    </div>

    <div class="flex items-center mb-6">
      <label
        class="mr-2"
        for="tag"
      >
        Categories
      </label>
      <select
        v-model="selectedTag"
        class="p-2 rounded border border-neutral-300"
      >
        <option
          :value="{ name: 'All', id: null }"
        >
          All
        </option>
        <option
          v-for="tag in tags.data"
          :key="tag.id"
          :value="tag"
        >
          {{ tag.name }}
        </option>
      </select>
    </div>

    <div
      v-if="!pending && search.results"
      :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }"
      class="list-none grid gap-4"
    >
      <NuxtLink
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :to="`/recettes/${recipe.slug}`"
        class="bg-white rounded shadow decoration-none text-neutral-900 hover:shadow-md transition-shadow overflow-hidden"
      >
        <NuxtImg
          :src="recipe.image.url"
          alt=""
          class="w-full h-50 object-cover"
        />
        <div class="p-4 grid gap-3">
          <h3 class="m-0">
            {{ recipe.title }}
          </h3>
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="tag in recipe.tags"
              :key="tag.id"
              :style="{ backgroundColor: tag.color, border: '1px solid', borderColor: 'rgb(0, 0, 0, 0.1)' }"
              class="py-1 px-2 rounded"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>
      </NuxtLink>
      <div
        v-if="selectedTag.id && !filteredRecipes.length"
        class="text-center absolute w-full mt-6"
      >
        Aucune recette
      </div>
    </div>
  </div>
</template>
