FROM node:current-alpine3.15 AS deps

# Create app directory
WORKDIR /app

RUN npm i -g pnpm

# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# # Install app dependencies
# RUN pnpm install

# RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./

RUN pnpm fetch --prod

ADD . ./
RUN pnpm install -r --offline --prod

FROM node:current-alpine3.15 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY --from=deps /app/apps/client/node_modules ./apps/client/node_modules

# RUN npm i -g turbo
RUN npm i -g pnpm
RUN apk add git

# RUN pnpm generate
RUN pnpm turbo run build --filter=client

FROM node:current-alpine3.15 AS runner
WORKDIR /app

ENV NODE_ENV production

RUN npm i -g pnpm
RUN npm i -g next

COPY --from=builder /app/apps/client/.next ./.next
COPY --from=builder /app/apps/client/public ./public
COPY --from=builder /app/apps/client/node_modules ./node_modules
COPY --from=builder /app/apps/client/package.json ./package.json







