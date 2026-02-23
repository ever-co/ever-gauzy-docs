---
sidebar_position: 3
---

# Docker Compose

Run the complete Ever Gauzy stack with Docker Compose.

## Quick Start

```bash
cd .deploy/docker-compose
docker compose up -d
```

## Example Configuration

```yaml
version: "3.8"

services:
  api:
    image: ghcr.io/ever-co/gauzy-api:latest
    ports:
      - "3000:3000"
    environment:
      DB_TYPE: postgres
      DB_HOST: db
      DB_PORT: 5432
      DB_NAME: gauzy
      DB_USER: postgres
      DB_PASS: gauzy_password
      API_BASE_URL: http://localhost:3000
      CLIENT_BASE_URL: http://localhost:4200
      JWT_SECRET: your-jwt-secret
      JWT_REFRESH_TOKEN_SECRET: your-refresh-secret
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  webapp:
    image: ghcr.io/ever-co/gauzy-webapp:latest
    ports:
      - "4200:4200"
    environment:
      API_BASE_URL: http://localhost:3000
    depends_on:
      - api
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: gauzy
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: gauzy_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: minio_access_key
      MINIO_ROOT_PASSWORD: minio_secret_key
    volumes:
      - minio_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

## Profiles

Use profiles for different setups:

```bash
# Development (with all services)
docker compose --profile dev up -d

# Production (API + webapp only, external DB)
docker compose --profile prod up -d

# Demo (pre-seeded data)
docker compose --profile demo up -d
```

## Useful Commands

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f api

# Restart a service
docker compose restart api

# Stop everything
docker compose down

# Stop and remove volumes
docker compose down -v

# Rebuild images
docker compose build --no-cache
```

## SSL with Nginx Proxy

Add Nginx for SSL termination:

```yaml
nginx:
  image: nginx:alpine
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./nginx.conf:/etc/nginx/nginx.conf
    - ./certs:/etc/nginx/certs
  depends_on:
    - api
    - webapp
```

## Related Pages

- [Docker Setup](./docker-setup) — individual containers
- [SSL & Domains](./ssl-and-domains) — SSL configuration
- [Deployment Overview](./deployment-overview) — general info
