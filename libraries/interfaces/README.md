# Steps To Create An Interfaces Library

1. npm init
2. add typescript as dev dependency `npm i -D typescript`
3. npx tsc --init
4. create src/index.ts file
5. change the "main" property in package.json

```
  "main": "src/index.ts",
```

5. add a build script to the package.json

```
"scripts": {
  "build": "tsc",
}
```

## Lint Code with Eslint, Auto Fix lint errors

6. add lint packages

```sh
npm i -D \
  eslint \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-import \
  eslint-plugin-unused-imports \
```

7. add eslint config `npx eslint --init`

8. add desired plugins to eslint config file

```json
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "unused-imports"],
```

9. Add build script for linting

```json
"scripts": {
  // ... other shit
    "lint": "eslint 'src/**/*.ts' --fix"
}
```

10. Add prebuild script for linting

```json
"scripts": {
  // ... other shit
    "prebuild": "npm run build"
}
```

### Add Pre Commit Scripts With Husky

11. add husky as dependency `npm i -D husky lint-staged`

12. configure husky script inside of package.json

```json
 "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.ts": [
      "npm run lint",
      "git add"
    ]
  }
```

## export type files

1. add properties to tsconfig to declare the export

```
  {
    "declaration": true,
    "declarationDir: ".",
    "declarationMap: true,
  }
```
