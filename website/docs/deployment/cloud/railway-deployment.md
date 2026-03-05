---
sidebar_position: 15
---

# Railway Deployment Guide

Deploy Ever Gauzy to Railway with one-click setup.

## Prerequisites

- Railway account at [railway.app](https://railway.app)

## Quick Start

### 1. Create Project

1. Go to Railway dashboard
2. Click **New Project** → **Deploy from GitHub repo**
3. Select `ever-co/ever-gauzy`

### 2. Add Services

Add from the Railway marketplace:

- **PostgreSQL** — database
- **Redis** — caching

### 3. Configure Variables

Railway auto-connects services. Add custom variables:

```
NODE_ENV=production
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret
API_BASE_URL=https://gauzy-api.up.railway.app
CLIENT_BASE_URL=https://gauzy-webapp.up.railway.app
FILE_PROVIDER=LOCAL
```

### 4. Deploy

Railway auto-deploys on push. Manual deploy:

```bash
railway up
```

## Railway-Specific Notes

- `DATABASE_URL` and `REDIS_URL` are auto-injected
- SSL is automatic
- Custom domains supported with free SSL
- Automatic scaling based on load

## Related Pages

- [Production Deployment](../devops/production-deployment) — general guide
- [Fly.io Deployment](./flyio-deployment) — Fly.io alternative
