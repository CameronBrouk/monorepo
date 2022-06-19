import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint({
      fix: true,
      cache: true,
      throwOnError: true
    }),
    react({
      include: ['**/*.{tsx|ts}'],
      fastRefresh: process.env.NODE_ENV !== 'test'
    }),
    dts({
      // include: ['src/index.tsx'],
      // beforeWriteFile: (filePath, content) => ({
      //   filePath: filePath.replace('/lib', ''),
      //   content
      // })
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'components',
      fileName: (format) => `components.${format}.js`
    },
    target: 'esnext',
    sourcemap: true,
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
