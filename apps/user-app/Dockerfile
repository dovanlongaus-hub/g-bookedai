FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/db/package.json ./packages/db/
COPY packages/google/package.json ./packages/google/
COPY apps/user-app/package.json ./apps/user-app/
RUN pnpm install --no-frozen-lockfile --filter @bookedai/user-app...

COPY packages/ ./packages/
COPY apps/user-app/ ./apps/user-app/
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL=https://api.g.bookedai.au
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN cd apps/user-app && pnpm build

FROM base AS runtime
COPY --from=build /app/apps/user-app/.next/standalone ./
COPY --from=build /app/apps/user-app/.next/static ./apps/user-app/.next/static
COPY --from=build /app/apps/user-app/public ./apps/user-app/public

WORKDIR /app/apps/user-app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
