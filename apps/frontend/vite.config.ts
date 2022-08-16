import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint({
      fix: true,
      cache: true,
      throwOnError: true
    }),
    // @ts-ignore
    react({
      include: ['**/*.{tsx|ts}'],
      fastRefresh: process.env.NODE_ENV !== 'test'
    })
  ],
  build: {
    rollupOptions: {
      treeshake: true
    }
  }
})
