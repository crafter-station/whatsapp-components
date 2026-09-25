# Node is the base and Bun is copied in, not the other way round: `next build`
# forks workers into whatever runtime is on PATH, and Bun cannot load Next's
# precompiled CommonJS server runtime. A bun-only image fails at page data
# collection. The registry JSON must also be emitted into public/ before
# `next build` runs, or the site ships with an empty registry.

FROM node:24-bookworm-slim AS build
COPY --from=oven/bun:1.3.5 /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/dashboard/package.json ./apps/dashboard/
RUN bun install --frozen-lockfile

COPY . .
RUN bun run registry:build
RUN bun run --filter @whatsapp-components/dashboard build

FROM node:24-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/apps/dashboard/.next/standalone ./
COPY --from=build /app/apps/dashboard/.next/static ./apps/dashboard/.next/static
COPY --from=build /app/apps/dashboard/public ./apps/dashboard/public

EXPOSE 3000
CMD ["node", "apps/dashboard/server.js"]
