---
sidebar_position: 16
---

# DigitalOcean Deployment Guide

Deploy Ever Gauzy to DigitalOcean using App Platform or Droplets.

## Option 1: App Platform

### 1. Create App

1. Go to DigitalOcean → **App Platform**
2. Select **GitHub** as source
3. Choose the `ever-gauzy` repository
4. Select the Dockerfile for the API

### 2. Add Database & Redis

From App Platform dashboard:

- Add **PostgreSQL** database component
- Add **Redis** database component

### 3. Configure

Set environment variables in the App Platform settings:

```
NODE_ENV=production
DB_TYPE=postgres
JWT_SECRET=your-secret
API_BASE_URL=https://gauzy-api.ondigitalocean.app
```

Database and Redis URLs are auto-injected.

## Option 2: Droplet

### 1. Create Droplet

- Ubuntu 22.04 LTS
- 4GB RAM / 2 CPUs recommended
- Enable monitoring

### 2. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
```

### 3. Deploy

```bash
docker compose up -d
```

## Related Pages

- [Production Deployment](../devops/production-deployment) — general guide
- [Nginx Reverse Proxy](./nginx-reverse-proxy) — proxy setup
