FROM node:20-alpine AS base
WORKDIR /app

RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_ONLYOFFICE_URL
ARG NEXT_PUBLIC_DOCUMENT_URL
ENV NEXT_PUBLIC_ONLYOFFICE_URL=$NEXT_PUBLIC_ONLYOFFICE_URL
ENV NEXT_PUBLIC_DOCUMENT_URL=$NEXT_PUBLIC_DOCUMENT_URL
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npx", "next", "start"]