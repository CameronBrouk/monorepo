module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'src/**/*.test.ts',
    'test/',
    'src/**/*.spec.ts',
    'dist',
  ],
  plugins: [
    '@typescript-eslint',
    'fp',
    'prettier',
    'unused-imports',
    'simple-import-sort',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    // Typescript Stuff
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    camelcase: 'error',
    // Code quality requirements
    complexity: ['error', 20],
    'max-statements': ['error', 10],
    'max-params': ['error', 4],
    'max-lines': ['error', 275],
    'max-depth': ['error', 3],
    // functional programming requirements
    'fp/no-arguments': 'error',
    'fp/no-delete': 'error',
    'fp/no-get-set': 'error',
    'fp/no-let': 'error',
    'fp/no-loops': 'error',
    'fp/no-classes': 'error',
    'fp/no-mutating-assign': 'error',
    'fp/no-mutating-methods': 'error',
    'fp/no-mutation': 'error',
    'fp/no-proxy': 'error',
    'fp/no-valueof-field': 'error',
    'no-var': 'error',
    'no-unused-vars': 'off',
    // import order
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@unimpaired/**',
            group: 'external',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order:
            'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
        pathGroupsExcludedImportTypes: ['react'],
        distinctGroup: false,
      },
    ],
    // unused imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // prettier
    prettier: [
      'error',
      // configure Prettier for ESLint
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        semi: false,
        bracketSpacing: true,
      },
    ],
  },
}
