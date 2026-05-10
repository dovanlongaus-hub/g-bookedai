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
ARG NEXT_PUBLIC_API_URL=https://api.g.bookedai.au
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
# Bank details for the QR/transfer UI — baked in at build time (NEXT_PUBLIC_*)
ARG NEXT_PUBLIC_BANK_NAME=Westpac
ARG NEXT_PUBLIC_BANK_PAYID=
ARG NEXT_PUBLIC_BANK_BSB=
ARG NEXT_PUBLIC_BANK_ACCOUNT_NUMBER=
ARG NEXT_PUBLIC_BANK_ACCOUNT_NAME=
ARG NEXT_PUBLIC_VIETQR_BANK_CODE=VCB
ARG NEXT_PUBLIC_VIETQR_ACCOUNT_NUMBER=
ARG NEXT_PUBLIC_VIETQR_ACCOUNT_NAME=
ENV NEXT_PUBLIC_BANK_NAME=${NEXT_PUBLIC_BANK_NAME}
ENV NEXT_PUBLIC_BANK_PAYID=${NEXT_PUBLIC_BANK_PAYID}
ENV NEXT_PUBLIC_BANK_BSB=${NEXT_PUBLIC_BANK_BSB}
ENV NEXT_PUBLIC_BANK_ACCOUNT_NUMBER=${NEXT_PUBLIC_BANK_ACCOUNT_NUMBER}
ENV NEXT_PUBLIC_BANK_ACCOUNT_NAME=${NEXT_PUBLIC_BANK_ACCOUNT_NAME}
ENV NEXT_PUBLIC_VIETQR_BANK_CODE=${NEXT_PUBLIC_VIETQR_BANK_CODE}
ENV NEXT_PUBLIC_VIETQR_ACCOUNT_NUMBER=${NEXT_PUBLIC_VIETQR_ACCOUNT_NUMBER}
ENV NEXT_PUBLIC_VIETQR_ACCOUNT_NAME=${NEXT_PUBLIC_VIETQR_ACCOUNT_NAME}
RUN cd apps/booking-web && pnpm build

FROM base AS runtime
COPY --from=build /app/apps/booking-web/.next/standalone ./
COPY --from=build /app/apps/booking-web/.next/static ./apps/booking-web/.next/static
COPY --from=build /app/apps/booking-web/public ./apps/booking-web/public

WORKDIR /app/apps/booking-web
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Server-side base for Next.js API proxy routes (/api/*). Override at deploy time if needed.
ENV API_URL=https://api.g.bookedai.au
EXPOSE 3000
CMD ["node", "server.js"]
