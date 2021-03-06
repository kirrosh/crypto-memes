# Crypto memes

Monorepo with [Turborepo](https://turborepo.org/)

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a packages manager. It includes the following packages/apps:

### Apps and Packages

- `client`: a [Next.js](https://nextjs.org) app
- `servet`: another [Nest.js](https://nestjs.com/) app
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### .env.local

IRON_SESSION_COOKIE_NAME=siwe
IRON_SESSION_PASSWORD=
NEXT_PUBLIC_WS=http://localhost:5000

### .env

DATABASE_URL=

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

## Deploy

### Server (Heroku) [Deprecated]

Connect (Optional)

- heroku login
- heroku init
- heroku git:remote -a crypto-memes-sigma

- go to apps/server
- git add .
- git commit -m "new commit"
- git push heroku main

(For new app use https://github.com/unfold/heroku-buildpack-pnpm buildpack)

### Database

Generate Prisma schema

- pnpm dlx prisma db seed

Push Prisma seed data

- pnpm dlx prisma db push

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
