---
sidebar_position: 17
---

# Render Deployment Guide

Deploy Ever Gauzy to Render.

## Setup

### 1. Create Services

In Render dashboard, create:

1. **Web Service** for the API (Docker runtime)
2. **Static Site** for the webapp
3. **PostgreSQL** database
4. **Redis** instance

### 2. Configure API Service

- **Docker Image**: `ghcr.io/ever-co/gauzy-api:latest`
- **Health Check Path**: `/api/health`

### 3. Environment Variables

```
NODE_ENV=production
DB_TYPE=postgres
DATABASE_URL=(auto-injected by Render)
REDIS_URL=(auto-injected by Render)
JWT_SECRET=your-secret
API_BASE_URL=https://gauzy-api.onrender.com
```

### 4. Deploy

Render auto-deploys from linked GitHub repository. Manual deploy also available from dashboard.

## Render Blueprint

Create a `render.yaml` for infrastructure-as-code:

```yaml
services:
  - type: web
    name: gauzy-api
    runtime: docker
    dockerfilePath: ./Dockerfile
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: gauzy-db
          property: connectionString

databases:
  - name: gauzy-db
    plan: starter
```

## Related Pages

- [Production Deployment](../devops/production-deployment) — general guide
- [Railway Deployment](./railway-deployment) — Railway alternative
