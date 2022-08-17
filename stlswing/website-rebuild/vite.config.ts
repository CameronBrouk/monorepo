import {
  defineConfig
} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // splitVendorChunkPlugin(),
    // eslint({
    //   fix: true,
    //   cache: true,
    //   throwOnError: true,
    // }),
    react({
      include: ['**/*.{tsx|ts}'],
      fastRefresh: process.env.NODE_ENV !== 'test'
    }),
    tsconfigPaths()
  ],
  resolve: {
    alias: { find: '@', replacement: path.resolve(__dirname, 'src') }
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      treeshake: true
    }
  }
})
