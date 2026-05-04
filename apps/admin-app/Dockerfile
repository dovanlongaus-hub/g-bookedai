FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/db/package.json ./packages/db/
COPY packages/google/package.json ./packages/google/
COPY apps/admin-app/package.json ./apps/admin-app/
RUN pnpm install --no-frozen-lockfile --filter @bookedai/admin-app...

COPY packages/ ./packages/
COPY apps/admin-app/ ./apps/admin-app/
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL=https://api.g.bookedai.au
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN cd apps/admin-app && pnpm build

FROM base AS runtime
COPY --from=build /app/apps/admin-app/.next/standalone ./
COPY --from=build /app/apps/admin-app/.next/static ./apps/admin-app/.next/static
COPY --from=build /app/apps/admin-app/public ./apps/admin-app/public

WORKDIR /app/apps/admin-app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
