---
sidebar_position: 14
---

# Fly.io Deployment Guide

Deploy Ever Gauzy to Fly.io for global edge deployment.

## Prerequisites

- `flyctl` CLI installed
- Fly.io account

## Quick Start

### 1. Launch App

```bash
fly launch --name gauzy-api --image ghcr.io/ever-co/gauzy-api:latest
```

### 2. Create PostgreSQL

```bash
fly postgres create --name gauzy-db
fly postgres attach gauzy-db --app gauzy-api
```

### 3. Create Redis

```bash
fly redis create --name gauzy-redis
```

### 4. Set Secrets

```bash
fly secrets set \
  JWT_SECRET=$(openssl rand -base64 32) \
  JWT_REFRESH_SECRET=$(openssl rand -base64 32) \
  API_BASE_URL=https://gauzy-api.fly.dev \
  CLIENT_BASE_URL=https://gauzy-webapp.fly.dev
```

### 5. Deploy

```bash
fly deploy
```

## fly.toml

```toml
[build]
  image = "ghcr.io/ever-co/gauzy-api:latest"

[env]
  NODE_ENV = "production"
  DB_TYPE = "postgres"
  PORT = "3000"

[[services]]
  internal_port = 3000
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.http_checks]]
    interval = 10000
    grace_period = "5s"
    method = "get"
    path = "/api/health"
```

## Related Pages

- [Production Deployment](../devops/production-deployment) — general guide
- [Railway Deployment](./railway-deployment) — Railway alternative
