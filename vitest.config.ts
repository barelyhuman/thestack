/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
