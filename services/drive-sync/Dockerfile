FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/shared/package.json packages/shared/tsconfig.json ./packages/shared/
COPY packages/db/package.json packages/db/tsconfig.json ./packages/db/
COPY packages/google/package.json packages/google/tsconfig.json ./packages/google/
COPY services/drive-sync/package.json services/drive-sync/tsconfig.json ./services/drive-sync/
RUN pnpm install --no-frozen-lockfile --filter @bookedai/drive-sync...
RUN pnpm add -w tsx

COPY packages/ ./packages/
COPY services/drive-sync/ ./services/drive-sync/

FROM build AS runtime
WORKDIR /app/services/drive-sync
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["npx", "tsx", "src/index.ts"]
