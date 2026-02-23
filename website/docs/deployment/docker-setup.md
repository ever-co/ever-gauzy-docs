---
sidebar_position: 2
---

# Docker Setup

Run Ever Gauzy components as Docker containers.

## Official Images

```bash
# API Server
docker pull ghcr.io/ever-co/gauzy-api:latest

# Web Application
docker pull ghcr.io/ever-co/gauzy-webapp:latest

# Demo (pre-seeded)
docker pull ghcr.io/ever-co/gauzy-api-demo:latest
docker pull ghcr.io/ever-co/gauzy-webapp-demo:latest
```

## Quick Start

### Run API

```bash
docker run -d \
  --name gauzy-api \
  -p 3000:3000 \
  -e DB_TYPE=sqlite \
  -e DEMO=true \
  ghcr.io/ever-co/gauzy-api-demo:latest
```

### Run Web App

```bash
docker run -d \
  --name gauzy-webapp \
  -p 4200:4200 \
  -e API_BASE_URL=http://localhost:3000 \
  ghcr.io/ever-co/gauzy-webapp:latest
```

## Building Custom Images

### API Dockerfile

```bash
# Build from source
docker build -t gauzy-api -f .deploy/api/Dockerfile .
```

### Webapp Dockerfile

```bash
docker build -t gauzy-webapp -f .deploy/webapp/Dockerfile .
```

## Multi-Stage Build

The Dockerfiles use multi-stage builds:

```
Stage 1: Dependencies    → Install node_modules
Stage 2: Build           → Compile TypeScript, bundle Angular
Stage 3: Production      → Minimal runtime image
```

Benefits:

- Smaller final image size
- No dev dependencies in production
- Faster deployments

## Health Checks

Docker images include health check endpoints:

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1
```

## Volumes

| Volume      | Path                                | Purpose                    |
| ----------- | ----------------------------------- | -------------------------- |
| **Uploads** | `/app/dist/apps/api/assets/uploads` | File uploads               |
| **SQLite**  | `/app/data`                         | SQLite database (dev only) |

```bash
docker run -d \
  -v gauzy-uploads:/app/dist/apps/api/assets/uploads \
  ghcr.io/ever-co/gauzy-api:latest
```

## Environment Variables

Pass configuration via `-e` flags or `--env-file`:

```bash
docker run -d \
  --env-file .env.production \
  -p 3000:3000 \
  ghcr.io/ever-co/gauzy-api:latest
```

## Related Pages

- [Docker Compose](./docker-compose) — multi-container orchestration
- [Deployment Overview](./deployment-overview) — general deployment info
