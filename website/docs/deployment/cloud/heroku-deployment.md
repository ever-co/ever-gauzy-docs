---
sidebar_position: 13
---

# Heroku Deployment Guide

Deploy Ever Gauzy to Heroku.

## Prerequisites

- Heroku CLI installed
- Heroku account with a plan supporting containers

## Quick Start

### 1. Create Heroku App

```bash
heroku create gauzy-api
heroku addons:create heroku-postgresql:essential-0
heroku addons:create heroku-redis:mini
```

### 2. Set Configuration

```bash
heroku config:set \
  NODE_ENV=production \
  DB_TYPE=postgres \
  JWT_SECRET=$(openssl rand -base64 32) \
  JWT_REFRESH_SECRET=$(openssl rand -base64 32) \
  API_BASE_URL=https://gauzy-api.herokuapp.com \
  CLIENT_BASE_URL=https://gauzy-webapp.herokuapp.com
```

### 3. Deploy with Docker

```bash
heroku container:push web --app gauzy-api
heroku container:release web --app gauzy-api
```

### 4. Scale

```bash
heroku ps:scale web=1:standard-1x
```

## Heroku-Specific Notes

- `DATABASE_URL` is auto-set by the PostgreSQL addon
- `REDIS_URL` is auto-set by the Redis addon
- SSL is included on all Heroku apps
- Use `heroku logs --tail` for debugging

## Related Pages

- [Production Deployment](../devops/production-deployment) — general guide
- [Environment Variables](../devops/environment-variables) — configuration
