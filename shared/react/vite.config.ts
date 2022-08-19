import { defineConfig } from 'vite'
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
      jsxRuntime: 'automatic'
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
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
