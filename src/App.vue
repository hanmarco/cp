<script setup>
// App 컴포넌트
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>CP PWA</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn large elevation="6" class="app-action-btn" color="primary" variant="tonal" @click="$router.push('/')" aria-label="홈">
        <v-icon size="28">mdi-home</v-icon>
      </v-btn>
      <v-btn large elevation="6" class="app-action-btn" color="secondary" variant="tonal" @click="$router.push('/books')" aria-label="책 목록">
        <v-icon size="28">mdi-book-open-page-variant</v-icon>
      </v-btn>
      <v-btn large elevation="6" class="app-action-btn" color="info" variant="tonal" @click="$router.push('/settings')" aria-label="설정">
        <v-icon size="28">mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <v-container>
        <v-row justify="center">
          <v-col class="text-center">
            <span class="text-caption">
              CP PWA App v1.0.0
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
