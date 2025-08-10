import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    federation({
      name: 'explorer_ui',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/boot.ts',
      },
      shared: ['vue'],
    })
  ],
  server: {
    port: 5175,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
