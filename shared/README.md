# Notes

- the `pm2` package is used extensively for the serve command. Download it.
- This is meant to be inside of a rush based mono repo
- The eslint comfigs all work with a pre-commit lint-staged rush plugin

## Instructions

### Global Commands

    - `rush serve`: start every dev server
    - `rush build`: build everything

### Local Commands

    - `rushx serve`: serve current working directory
    - `rush add -p ${packagename} -- dev`: Add package to dev dependencies current working directory
    - `pm2 delete ${buldname}`: stop that server from running
    - `pm2 kill`: stop everything
    - `pm2 ls`: see every server

## Packages

### Backend

- You sometimes have to run `npx prisma generate` for the types to work
- Server runs on

### Components

- When building, you must comment out lines 37-42 of the `vite.config.ts` file
- You must import `@unimpaired/react/style.css` into the main App folder of any app that is using this library
- Ladle runs on `http://localhost:61000`

### Frontent

- Dev is served on `http://localhost:3000`

### Interfaces

### Utils
