<template>
  <v-container>
    <v-row justify="center" align="center" style="min-height: 80vh;">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6">
          <v-card-title class="text-h4 text-center mb-4">
            CP PWA 앱
          </v-card-title>
          <v-card-text class="text-center">
            <p class="text-body-1 mb-4">
              Vue 3 + Vuetify 3 + PWA로 구축된 설치형 웹앱입니다.
            </p>
            <v-btn
              color="primary"
              size="large"
              @click="$router.push('/settings')"
              class="mr-4"
            >
              설정으로 이동
            </v-btn>
            <v-btn
              color="secondary"
              size="large"
              @click="checkOnlineStatus"
            >
              온라인 상태 확인
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const isOnline = ref(navigator.onLine)

const checkOnlineStatus = () => {
  isOnline.value = navigator.onLine
  alert(isOnline.value ? '온라인 상태입니다.' : '오프라인 상태입니다.')
}
</script>
