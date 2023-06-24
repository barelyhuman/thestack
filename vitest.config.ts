/// <reference types="vitest" />
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [],

  test: {
    setupFiles: ['./tests/setup.ts'],
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
