<template>
  <v-container>
    <v-row justify="center" align="center" style="min-height: 80vh;">
      <v-col cols="12" md="6" class="text-center">
        <v-card class="pa-6">
          <v-card-title class="text-h1 mb-4">
            404
          </v-card-title>
          <v-card-subtitle class="text-h5 mb-4">
            페이지를 찾을 수 없습니다
          </v-card-subtitle>
          <v-card-text class="text-body-1 mb-4">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </v-card-text>
          <v-btn
            color="primary"
            size="large"
            @click="$router.push('/')"
          >
            홈으로 돌아가기
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// 404 페이지 컴포넌트
</script>
