import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: ['**/*.{tsx|ts}'],
      fastRefresh: process.env.NODE_ENV !== 'test'
    }),
    eslint({
      fix: true,
      cache: true,
      throwOnError: true,
      include: ['src/**'],
      formatter: 'tap'
    })
  ],
  build: {
    rollupOptions: {
      treeshake: true
    }
  }
})
