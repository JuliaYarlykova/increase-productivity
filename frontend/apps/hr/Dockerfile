# Stage 1: Base
FROM node:20-alpine AS base

# Stage 2: Builder
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=hr --docker

# Stage 3: Installer
FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=hr...

# Stage 4: Runner
FROM nginx:1.23.4 AS nginx
COPY --from=installer /app/apps/hr/dist /usr/share/nginx/html
COPY /apps/hr/nginx.conf /etc/nginx/conf.d/default.conf
