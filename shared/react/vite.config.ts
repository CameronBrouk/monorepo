import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'
// import tsconfig from 'vite-plugin-dts'
// import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    // eslint({
    //   fix: true,
    //   cache: true,
    //   throwOnError: true
    // }),
    react({
      // include: ['**/*.{tsx|ts}'],
      include: ['./src'],
      exclude: ['./dist', './node_modules']
      // jsxRuntime: 'automatic'
    })
    // dts()
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'index',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      treeshake: true,
      external: [
        ...Object.keys(packageJson.devDependencies),
        ...Object.keys(packageJson.dependencies)
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: './src',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
