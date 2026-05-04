FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/shared/package.json packages/shared/tsconfig.json ./packages/shared/
COPY packages/db/package.json packages/db/tsconfig.json ./packages/db/
COPY packages/google/package.json packages/google/tsconfig.json ./packages/google/
COPY services/design-agent/package.json services/design-agent/tsconfig.json ./services/design-agent/
RUN pnpm install --no-frozen-lockfile --filter @bookedai/design-agent...
RUN pnpm add -w tsx

COPY packages/ ./packages/
COPY services/design-agent/ ./services/design-agent/

FROM build AS runtime
WORKDIR /app/services/design-agent
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["npx", "tsx", "src/index.ts"]
