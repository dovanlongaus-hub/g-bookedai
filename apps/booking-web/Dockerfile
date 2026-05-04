FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/db/package.json ./packages/db/
COPY packages/google/package.json ./packages/google/
COPY apps/booking-web/package.json ./apps/booking-web/
RUN pnpm install --no-frozen-lockfile --filter @bookedai/booking-web...

COPY packages/ ./packages/
COPY apps/booking-web/ ./apps/booking-web/
ENV NEXT_TELEMETRY_DISABLED=1
RUN cd apps/booking-web && pnpm build

FROM base AS runtime
COPY --from=build /app/apps/booking-web/.next/standalone ./
COPY --from=build /app/apps/booking-web/.next/static ./apps/booking-web/.next/static
COPY --from=build /app/apps/booking-web/public ./apps/booking-web/public

WORKDIR /app/apps/booking-web
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
