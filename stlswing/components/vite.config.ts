import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    eslint({
      fix: true,
      cache: true,
      throwOnError: true
    }),
    react({
      include: ['**/*.{tsx|ts}'],
      exclude: ['./dist', './node_modules'],
      jsxRuntime: 'classic'
    })
  ],
  resolve: {
    alias: {
      '@': 'src'
    }
  },
  build: {
    reportCompressedSize: true,
    minify: false,
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'index',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    }
  }
})
