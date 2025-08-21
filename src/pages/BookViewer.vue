<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{ id }}
            <v-spacer />
            <v-btn icon @click="$router.back()"><v-icon>mdi-arrow-left</v-icon></v-btn>
          </v-card-title>

          <v-card-text>
            <div class="carousel-controls">
              <v-btn @click="prev" :disabled="index === 0">Prev</v-btn>
              <v-btn @click="next" :disabled="index >= pages.length - 1">Next</v-btn>
            </div>

            <div class="two-up">
              <div v-for="(img, i) in currentPair" :key="i" class="pane">
                <img :src="img" />
              </div>
            </div>

            <div class="pager mt-4 text-center">{{ index + 1 }} / {{ pages.length }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id || ''

// eagerly load all pages for all books, then filter for the requested id
const allModules = import.meta.glob('../assets/books/*/page-*.png', { eager: true })

// filter keys for this book id and map to resolved src values
const pages = Object.keys(allModules)
  .filter(p => p.includes(`/books/${id}/`))
  .sort()
  .map(p => (allModules[p].default || allModules[p]))

// create pairs of two images per view
const pairs = []
for (let i = 0; i < pages.length; i += 2) {
  pairs.push([pages[i], pages[i + 1] || ''])
}

const index = ref(0)
const currentPair = computed(() => pairs[index.value] || ['', ''])

const prev = () => { if (index.value > 0) index.value-- }
const next = () => { if (index.value < pairs.length - 1) index.value++ }

onMounted(() => {
  // no-op for now
})
</script>

<style scoped>
.two-up { display:flex; gap:8px; justify-content:center; align-items:flex-start }
.pane { width:48%; background:#f5f5f5; display:flex; justify-content:center; align-items:center }
.pane img { width:100%; height:auto; display:block }
.carousel-controls { display:flex; gap:8px; justify-content:center; margin-bottom:12px }
</style>
