import { defineConfig } from 'vite'
// import { peerDependencies, devDependencies } from './package.json'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import * as path from 'path'

export default defineConfig({
  plugins: [
    eslint({
      fix: true,
      cache: true,
      throwOnError: true
    }),
    react({
      include: ['**/*.{tsx|ts}'],
      exclude: ['./dist', './node_modules']
    })
  ],
  resolve: {
    alias: {
      '@': 'src'
    }
  },
  build: {
    watch: {
      exclude: ['dist', 'node_modules']
    },
    lib: {
      entry: 'src/index.ts',
      name: 'index',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    }
  }
})
