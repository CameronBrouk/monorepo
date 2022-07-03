import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    // eslint({
    //   fix: true,
    //   cache: true,
    //   throwOnError: true
    // }),
    // @ts-ignore
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
    lib: {
      entry: 'src/index.ts',
      name: 'index',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    }
  }
  // rollupOptions: {
  //   external: [
  //     // ...Object.keys(peerDependencies),
  //     // ...Object.keys(devDependencies)
  //   ],
  //   output: {
  //     globals: {
  //       react: 'React',
  //       'react-dom': 'ReactDOM'
  //     }
  //   }
  // }
})
