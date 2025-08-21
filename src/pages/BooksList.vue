<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title>책 목록</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="book in books" :key="book.id" cols="12" md="4">
                <v-card class="ma-2" @click="openBook(book.id)" style="cursor: pointer;">
                  <v-img :src="book.thumb" height="200" cover />
                  <v-card-title>{{ book.id }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// eagerly import all page images inside books folders
const modules = import.meta.glob('../assets/books/*/page-*.png', { eager: true })

// group by folder id
const booksMap = {}
for (const p in modules) {
  const m = p.match(/books\/(.*?)\//)
  if (!m) continue
  const id = m[1]
  if (!booksMap[id]) booksMap[id] = []
  booksMap[id].push(p)
}

const books = Object.keys(booksMap).sort().map(id => ({
  id,
  thumb: (modules[`../assets/books/${id}/page-01.png`] && (modules[`../assets/books/${id}/page-01.png`].default || modules[`../assets/books/${id}/page-01.png`])) || ''
}))

const openBook = (id) => {
  router.push({ name: 'book-viewer', params: { id } })
}
</script>

<style scoped>
.v-card { cursor: pointer }
</style>
