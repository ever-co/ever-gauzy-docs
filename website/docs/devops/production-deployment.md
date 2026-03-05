---
sidebar_position: 1
---

# Production Deployment Guide

Deploy Ever Gauzy to production environments with Docker, Kubernetes, or cloud platforms.

## Prerequisites

- Node.js 20+ or Docker
- PostgreSQL 14+ (recommended for production)
- Redis 6+ (for caching and job queues)
- 2GB+ RAM for API server
- Reverse proxy (Nginx, Caddy, or cloud LB)

## Deployment Options

### Docker Compose (Recommended)

The fastest way to deploy all services:

```yaml
version: "3.8"
services:
  api:
    image: ghcr.io/ever-co/gauzy-api:latest
    environment:
      - DB_TYPE=postgres
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=gauzy
      - DB_USER=postgres
      - DB_PASS=your-secure-password
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - JWT_SECRET=your-jwt-secret
    ports:
      - "3000:3000"
    depends_on:
      - db
      - redis

  webapp:
    image: ghcr.io/ever-co/gauzy-webapp:latest
    ports:
      - "4200:4200"
    environment:
      - API_BASE_URL=http://api:3000

  db:
    image: postgres:16
    environment:
      - POSTGRES_DB=gauzy
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=your-secure-password
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

### Kubernetes

See the [Kubernetes Deployment](./kubernetes-deployment) guide.

### Cloud Platforms

- [DigitalOcean App Platform](./digitalocean-deployment)
- [Render Deployment](./render-deployment)
- [Fly.io Deployment](./flyio-deployment)

## Post-Deployment Checklist

- [ ] Set strong `JWT_SECRET` and `JWT_REFRESH_SECRET`
- [ ] Configure database backups
- [ ] Set up monitoring and alerting
- [ ] Configure SMTP for email delivery
- [ ] Set up SSL/TLS certificates
- [ ] Configure CORS allowed origins
- [ ] Set `NODE_ENV=production`
- [ ] Enable rate limiting
- [ ] Configure file storage provider

## Related Pages

- [Environment Variables Reference](./environment-variables) — all config options
- [Monitoring & Observability](./monitoring) — production monitoring
- [Database Backup & Recovery](./database-backup) — backup strategies
