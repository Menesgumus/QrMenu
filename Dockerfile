FROM node:24-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat

FROM base AS deps
RUN corepack enable && corepack prepare pnpm@11.25.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS prod-deps
RUN corepack enable && corepack prepare pnpm@11.25.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM base AS builder
RUN corepack enable && corepack prepare pnpm@11.25.0 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_PRESENTATION_BASE_URL=https://menu.prilmones.com.tr
ENV NEXT_PUBLIC_PRESENTATION_BASE_URL=${NEXT_PUBLIC_PRESENTATION_BASE_URL}

RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

ARG NEXT_PUBLIC_PRESENTATION_BASE_URL=https://menu.prilmones.com.tr
ENV NEXT_PUBLIC_PRESENTATION_BASE_URL=${NEXT_PUBLIC_PRESENTATION_BASE_URL}

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/scripts/sync-hashed-release.mjs ./scripts/sync-hashed-release.mjs
COPY --from=builder /app/scripts/start-server.mjs ./scripts/start-server.mjs
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

RUN mv /app/public/images/menu/hashed /app/.hashed-release \
  && mkdir -p /app/public/images/menu/hashed /app/.hashed-state \
  && chown -R nextjs:nodejs /app/.hashed-release /app/public/images/menu/hashed /app/.hashed-state

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "scripts/start-server.mjs"]
