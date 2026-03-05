---
sidebar_position: 37
---

# Docker Multi-Stage Optimization

Optimize Docker builds for smaller, faster images.

## Multi-Stage Build Pattern

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build:api

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only production artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Non-root user
RUN addgroup -g 1001 gauzy && adduser -u 1001 -G gauzy -s /bin/sh -D gauzy
USER gauzy

EXPOSE 3000
CMD ["node", "dist/apps/api/main.js"]
```

## Size Comparison

| Stage               | Image Size |
| ------------------- | ---------- |
| Full node:20        | ~1.0 GB    |
| node:20-slim        | ~250 MB    |
| node:20-alpine      | ~150 MB    |
| Multi-stage (final) | ~180 MB    |

## Build Caching

```dockerfile
# Copy dependency files first (better cache)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Then copy source (changes more often)
COPY . .
RUN yarn build
```

## `.dockerignore`

```
node_modules
dist
.git
.env*
*.md
coverage
.nx
```

## Related Pages

- [Container Security](./container-security) — security
- [Docker Deployment](../deployment/docker/docker-deployment) — Docker setup
- [GitHub Actions Caching](./github-actions-caching) — CI caching
