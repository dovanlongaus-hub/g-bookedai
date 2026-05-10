FROM node:22-slim AS base
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app

FROM base AS build
# Copy workspace config + all package.json files first
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/db/package.json ./packages/db/
COPY packages/google/package.json ./packages/google/
COPY apps/web-longcare/package.json ./apps/web-longcare/

# Install ALL dependencies (deterministic — fail fast if lockfile drifts)
RUN pnpm install --frozen-lockfile --prod=false

# Copy ALL source files (so Next.js can resolve @/ paths)
COPY packages/ ./packages/
COPY apps/web-longcare/ ./apps/web-longcare/

# Build
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL=https://api.g.bookedai.au
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
WORKDIR /app/apps/web-longcare
# Debug: verify files exist before build
RUN pnpm build

FROM base AS runtime
COPY --from=build /app/apps/web-longcare/.next/standalone ./
COPY --from=build /app/apps/web-longcare/.next/static ./apps/web-longcare/.next/static
COPY --from=build /app/apps/web-longcare/public ./apps/web-longcare/public

WORKDIR /app/apps/web-longcare
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["node", "server.js"]
