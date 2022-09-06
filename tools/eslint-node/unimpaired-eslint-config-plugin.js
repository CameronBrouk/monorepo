export default {
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/src/**/*.spec.*",
    "**/src/**/*.test.*"
  ],
  root: true,
  env: {
    // all
    es2022: true, // potentially change to es6 for FE?
    'shared-node-browser': true,
    jest: true, // warning: must add imports in setupTests file
    // Frontend
    browser: true,
    // Backend
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // WARNING: The project field is Required when checking shit with types
    project: './tsconfig.json',
    ecmaFeatures: {
      impliedStrict: false,
      // Frontend Only
      jsx: true
    },
    // If this isn't set, eslint will possibly throw import/export as syntax errors?
    sourceType: module
  },
  settings: {
    // Required for Auto Sorting of Imports
    'import/resolver': {
      typescript: true,
      node: true
    }
  },
  plugins: [
    '@typescript-eslint', // Required for typescript files?
    'react', // React Specific Shit?
    // ====== Auto Fix ====== /''/
    'unused-imports', // Required to remove unused imports
    'import', // Required to auto-sort imports
    'prettier' // Required to prettify code,
  ],
  extends: [
    // Recommended by eslint team
    // https://eslint.org/docs/latest/rules/
    'eslint:recommended',
    // Recommended by typescript-eslint team, must be after eslint:recommended
    // https://typescript-eslint.io/rules/
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // known to take awhile, recommended to separate to build specifi'c
    'plugin:@typescript-eslint/strict', // Only for typescript pros, apparentl'y
    // Required to Auto Sort Imports
    'plugin:import/recommended',
    'plugin:import/typescript',
    // Required to Prettify(must be last)
    'prettier'
  ],
  rules: {
  "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off", // Yeah, this is bad.  But fuck, sometimes you gotta deploy code.

    // Code Quality: Functional Programming
    "fp/no-arguments": "error",
    "fp/no-delete": "error",
    "fp/no-get-set": "error",
    "fp/no-let": "error",
    "fp/no-loops": "error",
    "fp/no-classes": "error",
    "fp/no-mutating-assign": "error",
    "fp/no-mutating-methods": "error",
    "fp/no-mutation": "error",
    "fp/no-proxy": "error",
    "fp/no-valueof-field": "error",

    // Formatting(Sort Imports): Required for -- fix
    "import/order": [
      "error",
      {
        // prettier-ignore
        "groups": [ "builtin", "external", "internal", "parent", "sibling", "index", "object", "type" ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "@unimpaired/**",
            "group": "internal",
            "position": "before"
          }
        ],
        "newlines-between": "always"
      }
    ],

    // Formatting(Remove Unused Imports): Required for --fix
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],

    // Formatting(Prettier): Required for --fix
    "prettier/prettier": "error",
    "arrow-body-style": "off", // problematic for prettier
    "prefer-arrow-callback": "off" // problematic for prettier
  }

}
