FROM oven/bun:1 AS pruner
WORKDIR /app
COPY . .
RUN bunx turbo prune --scope=server --docker

FROM oven/bun:1 AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./

RUN bun install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN bunx turbo build --filter=server

FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN groupadd --system --gid 1001 nonroot && \
    useradd --system --uid 1001 --gid nonroot nonroot
USER nonroot

COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/package.json ./apps/server/package.json

COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lock .

COPY --from=builder /app/packages ./packages

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["bun", "apps/server/dist/index.mjs"]
