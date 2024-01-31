<script lang="ts" setup>
import { useSearchStore } from '#imports'

const { find } = useStrapi4()

const { data: tags, pending: tagsPending } = useAsyncData(
  'tags',
  () => find('tags'),
)

const search = useSearchStore()

function handleTagClick(tagSlug: string) {
  if (search.queryTags.includes(tagSlug))
    search.queryTags = search.queryTags.filter(tag => tag !== tagSlug)
  else
    search.queryTags.push(tagSlug)
}
</script>

<template>
  <div class="p-12 max-sm:p-6">
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

    <div
      v-if="!tagsPending && tags.data && tags.data.length > 0"
      class="flex items-center mb-6 gap-2 flex-wrap"
    >
      <span class="mr-2">
        Categories
      </span>
      <button
        :style="{ border: '1px solid', borderColor: 'rgb(0, 0, 0, 0.1)' }"
        class="bg-neutral-100 py-1 px-2 rounded flex gap-1 items-center cursor-pointer font-sans font-medium"
        @click="search.resetTags"
      >
        Reset
      </button>
      <button
        v-for="tag in tags.data"
        :key="tag.id"
        :style="{ backgroundColor: tag.color, border: '1px solid', borderColor: 'rgb(0, 0, 0, 0.1)' }"
        class="p-1 pr-2 rounded flex gap-1 items-center cursor-pointer font-sans font-medium"
        @click="handleTagClick(tag.slug)"
      >
        <div
          :style="{ backgroundColor: 'rgb(255, 255, 255, 0.5)', border: '1px solid', borderColor: 'rgb(0, 0, 0, 0.1)' }"
          class="flex justify-center items-center h-4 w-4 rounded"
        >
          <svg :style="{ color: tag.color, filter: 'brightness(20%)', opacity: search.queryTags.includes(tag.slug) ? 1 : 0 }" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m4.5 12.75 6 6 9-13.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        {{ tag.name }}
      </button>
    </div>

    <div
      v-if="!search.pending && search.sortedByTags && search.sortedByTags.length > 0"
      :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }"
      class="list-none grid gap-4"
    >
      <NuxtLink
        v-for="recipe in search.sortedByTags"
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
        v-if="search.sortedByTags.length === 0"
        class="text-center absolute w-full mt-6"
      >
        Aucune recette
      </div>
    </div>
  </div>
</template>
