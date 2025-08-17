import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Devtools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
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
