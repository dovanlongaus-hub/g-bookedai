FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/shared/package.json packages/shared/tsconfig.json ./packages/shared/
COPY packages/db/package.json packages/db/tsconfig.json ./packages/db/
COPY packages/google/package.json packages/google/tsconfig.json ./packages/google/
COPY services/notification/package.json services/notification/tsconfig.json ./services/notification/
RUN pnpm install --no-frozen-lockfile --filter @bookedai/notification...
RUN pnpm add -w tsx

COPY packages/ ./packages/
COPY services/notification/ ./services/notification/

FROM build AS runtime
WORKDIR /app/services/notification
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["npx", "tsx", "src/index.ts"]
