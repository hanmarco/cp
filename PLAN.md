# 앱 개발 계획서 (Vue 3 + Vuetify 3 + PWA)

## 1. 목적

* 단일 코드베이스로 웹·모바일 환경을 대응하는 설치형 웹앱(PWA) 구축.
* 라우터 기반 화면 전환과 Vuetify UI 컴포넌트로 생산성 확보.
* 개발 중 실시간 진단을 위해 `vite-plugin-vue-devtools` 적용.

## 2. 범위

* 핵심 화면: 홈, 설정, 오프라인 상태 안내.
* PWA: 앱 설치, 오프라인 캐싱, 기본 푸시 수신 토대.
* 라우팅: 페이지 전환, 404 처리, 지연 로딩.
* 빌드·배포: GitHub Pages(`https://hanmarco.github.io/cp`) 기반 정적 호스팅.

## 3. 기술 스택

* 프레임워크: Vue 3 (Composition API)
* UI: Vuetify 3
* 번들러: Vite
* 라우팅: Vue Router 4
* PWA: `vite-plugin-pwa`
* 디버깅: `vite-plugin-vue-devtools`
* 언어: TypeScript

## 4. 초기 설정

```bash
# 프로젝트 생성
git clone https://github.com/hanmarco/CP.git
cd CP
npm create vite@latest . -- --template vue-ts

# 필수 패키지
npm i vuetify@latest vue-router@4

# PWA 및 디버깅 플러그인
npm i -D vite-plugin-pwa vite-plugin-vue-devtools

# 타입 지원(선택)
npm i -D @types/node
```

회사 프록시 환경 사용 시:

```bash
npm config set proxy http://12.26.204.100:8080
npm config set https-proxy http://12.26.204.100:8080
```

## 5. 디렉터리 구조

```
CP/
  ├─ public/
  │   └─ icons/            # PWA 아이콘
  ├─ src/
  │   ├─ assets/
  │   ├─ components/
  │   ├─ router/
  │   │   └─ index.ts
  │   ├─ pages/
  │   │   ├─ HomePage.vue
  │   │   ├─ SettingsPage.vue
  │   │   └─ NotFound.vue
  │   ├─ plugins/
  │   │   └─ vuetify.ts
  │   ├─ App.vue
  │   └─ main.ts
  ├─ vite.config.ts
  └─ manifest.webmanifest
```

## 6. Vite 설정(vite.config.ts)

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Devtools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/cp/',
  plugins: [
    vue(),
    Devtools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'CP PWA App',
        short_name: 'CP',
        description: 'Vue + Vuetify PWA',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        start_url: '/cp/',
        icons: [
          { src: '/cp/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/cp/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/cp/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        navigateFallback: '/cp/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: { cacheName: 'pages' }
          },
          {
            urlPattern: ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'assets' }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      }
    })
  ],
  server: { port: 5173, strictPort: true }
})
```

## 7. GitHub Pages 배포 설정

* 저장소: `hanmarco/CP`
* 브랜치: `gh-pages`
* GitHub Actions를 통한 CI/CD 파이프라인 구성.
* `npm run build` 후 `dist/` 디렉터리 배포.

```yaml
# .github/workflows/deploy.yml
name: Deploy PWA to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
```

## 8. 라우터 설정(src/router/index.ts)

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
  { path: '/settings', name: 'settings', component: () => import('../pages/SettingsPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFound.vue') }
]

export const router = createRouter({
  history: createWebHistory('/cp/'),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
```

## 9. PWA 매니페스트

```json
{
  "name": "CP PWA App",
  "short_name": "CP",
  "start_url": "/cp/",
  "display": "standalone",
  "background_color": "#121212",
  "theme_color": "#121212",
  "icons": [
    { "src": "/cp/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/cp/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/cp/icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

## 10. 배포 확인

* URL: [https://hanmarco.github.io/cp](https://hanmarco.github.io/cp)
* 오프라인 접근 가능 여부, 설치 아이콘 표시, 라우터 정상 동작 여부 검증.
