FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS builder

COPY . .

RUN bun install --frozen-lockfile
RUN bun run build --filter=server
RUN bunx turbo prune --scope=server --docker

FROM base AS installer

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/bun.lock ./

RUN bun install --production --frozen-lockfile

FROM oven/bun:1-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=installer /app/node_modules ./node_modules
COPY --from=builder /app/out/full/apps/server/dist ./dist
COPY --from=builder /app/out/full/apps/server/package.json ./package.json

EXPOSE 3000

CMD ["bun", "start"]