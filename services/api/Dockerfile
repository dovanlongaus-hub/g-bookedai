FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/shared/package.json packages/shared/tsconfig.json ./packages/shared/
COPY packages/db/package.json packages/db/tsconfig.json ./packages/db/
COPY packages/google/package.json packages/google/tsconfig.json ./packages/google/
COPY services/api/package.json services/api/tsconfig.json ./services/api/
COPY services/learning-agent/package.json ./services/learning-agent/
RUN pnpm install --no-frozen-lockfile --filter @bookedai/api...
RUN pnpm add -w tsx

COPY packages/ ./packages/
COPY services/api/ ./services/api/
COPY services/learning-agent/ ./services/learning-agent/

FROM build AS runtime
WORKDIR /app/services/api
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["npx", "tsx", "src/index.ts"]
