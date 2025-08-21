<template>
  <v-container fluid class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h6">책 목록</v-card-title>
          <v-divider />
          <v-card-text class="pa-0">
            <v-sheet class="books-scroll">
              <v-list>
                <v-list-item v-for="book in books" :key="book.id" class="book-item" @click="openBook(book.id)">
                  <v-list-item-avatar>
                    <v-img :src="book.thumb" width="96" height="128" cover />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ book.id }}</v-list-item-title>
                    <v-list-item-subtitle>{{ book.count }} 페이지</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-sheet>
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

// group by folder id and collect pages
const booksMap = {}
for (const p in modules) {
  const m = p.match(/books\/(.*?)\/page-(.*)\.png$/)
  if (!m) continue
  const id = m[1]
  if (!booksMap[id]) booksMap[id] = []
  booksMap[id].push(p)
}

const books = Object.keys(booksMap).sort().map(id => {
  const pages = booksMap[id].sort()
  const thumbKey = `../assets/books/${id}/page-01.png`
  const thumb = (modules[thumbKey] && (modules[thumbKey].default || modules[thumbKey])) || (modules[pages[0]] && (modules[pages[0]].default || modules[pages[0]])) || ''
  return { id, thumb, count: pages.length }
})

const openBook = (id) => {
  router.push({ name: 'book-viewer', params: { id } })
}
</script>

<style scoped>
.v-card { cursor: pointer }
</style>
