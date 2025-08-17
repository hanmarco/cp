<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6">
          <v-card-title class="text-h4 mb-4">
            설정
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>앱 버전</v-list-item-title>
                <v-list-item-subtitle>1.0.0</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>PWA 상태</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    :color="isPWAInstalled ? 'success' : 'warning'"
                    size="small"
                  >
                    {{ isPWAInstalled ? '설치됨' : '설치 가능' }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>온라인 상태</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    :color="isOnline ? 'success' : 'error'"
                    size="small"
                  >
                    {{ isOnline ? '온라인' : '오프라인' }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            
            <v-divider class="my-4"></v-divider>
            
            <v-btn
              color="primary"
              block
              @click="$router.push('/')"
              class="mb-2"
            >
              홈으로 돌아가기
            </v-btn>
            
            <v-btn
              color="secondary"
              block
              @click="clearCache"
            >
              캐시 지우기
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isOnline = ref(navigator.onLine)
const isPWAInstalled = ref(false)

onMounted(() => {
  // PWA 설치 상태 확인
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      isPWAInstalled.value = registrations.length > 0
    })
  }
  
  // 온라인 상태 모니터링
  window.addEventListener('online', () => isOnline.value = true)
  window.addEventListener('offline', () => isOnline.value = false)
})

const clearCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(name => caches.delete(name)))
    alert('캐시가 지워졌습니다.')
  }
}
</script>
