<script lang="ts" setup>
import markdownit from 'markdown-it'

const md = markdownit()
const route = useRoute()
const { findOne } = useStrapi4()

const { data: recipe } = useAsyncData(
  `recipes/${route.params.slug}`,
  () => findOne(
    'recipes',
    route.params.slug as string,
    { populate: '*' },
  ),
)
</script>

<template>
  <div v-if="recipe" class="p-12 m-auto max-w-3xl">
    <NuxtLink
      class="text-neutral-600 hover:text-neutral-900 transition"
      to="/"
    >
      {{ "< Recettes" }}
    </NuxtLink>
    <h1 class="mb-2">
      {{ recipe.data.title }}
    </h1>
    <div class="flex gap-2 flex-wrap mb-6">
      <div
        v-for="tag in recipe.data.tags"
        :key="tag.id"
        :style="{ backgroundColor: tag.color, border: '1px solid', borderColor: 'rgb(0, 0, 0, 0.1)' }"
        class="py-1 px-2 rounded"
      >
        {{ tag.name }}
      </div>
    </div>
    <img
      :src="recipe.data.image.url"
      alt=""
      class="w-full h-80 object-cover rounded shadow"
    >
    <p
      class="text-lg mt-12"
      v-html="md.render(recipe.data.description)"
    />
  </div>
</template>
