import Fuse from 'fuse.js'
import type { IRecipe, RecipesData } from '~/models/recipes.model'

export const useSearchStore = defineStore('search', () => {
  const { find } = useStrapi4()

  const { data: recipes, pending } = useAsyncData('recipes', () => find<RecipesData>('recipes', { populate: '*' }),
  )
  const query = ref('')
  const elements = reactive<IRecipe[]>(recipes.value?.data || [])
  const keys = ['title', 'description', ['tags', 'name']]

  const fuse = computed(() => new Fuse(Array.from(elements), {
    keys,
    threshold: 0.4,
  }))

  const results = computed(() => {
    if (!query.value)
      return Array.from(elements)
    return [...fuse.value.search(query.value).map(r => r.item)]
  })

  const sortedResults = computed(() => {
    return results.value.sort((a, b) => {
      return a.publishedAt > b.publishedAt ? -1 : 1
    })
  })

  return { query, results, elements, pending, sortedResults }
})
