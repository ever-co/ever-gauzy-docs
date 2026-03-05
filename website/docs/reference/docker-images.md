---
sidebar_position: 9
---

# Docker Images Reference

All official Ever Gauzy Docker images and their usage.

## Published Images

| Image                               | Description        | Size   |
| ----------------------------------- | ------------------ | ------ |
| `ghcr.io/ever-co/gauzy-api`         | API server         | ~800MB |
| `ghcr.io/ever-co/gauzy-webapp`      | Angular web app    | ~200MB |
| `ghcr.io/ever-co/gauzy-api-demo`    | Demo API instance  | ~800MB |
| `ghcr.io/ever-co/gauzy-webapp-demo` | Demo webapp        | ~200MB |
| `ghcr.io/ever-co/gauzy-desktop-api` | Desktop server API | ~1GB   |

## Tags

| Tag           | Description              |
| ------------- | ------------------------ |
| `latest`      | Latest stable release    |
| `develop`     | Latest development build |
| `vX.Y.Z`      | Specific version         |
| `sha-xxxxxxx` | Specific commit          |

## Basic Usage

### API Server

```bash
docker run -d \
  --name gauzy-api \
  -p 3000:3000 \
  -e DB_TYPE=sqlite \
  -e JWT_SECRET=your-secret \
  ghcr.io/ever-co/gauzy-api:latest
```

### Web App

```bash
docker run -d \
  --name gauzy-webapp \
  -p 4200:4200 \
  -e API_BASE_URL=http://localhost:3000 \
  ghcr.io/ever-co/gauzy-webapp:latest
```

## Docker Compose

```yaml
services:
  api:
    image: ghcr.io/ever-co/gauzy-api:latest
    ports:
      - "3000:3000"
    env_file: .env

  webapp:
    image: ghcr.io/ever-co/gauzy-webapp:latest
    ports:
      - "4200:4200"
```

## Building Custom Images

```bash
docker build -t custom-gauzy-api -f .deploy/api/Dockerfile .
```

## Related Pages

- [Production Deployment](../devops/production-deployment) — deployment
- [Docker Troubleshooting](../troubleshooting/docker-issues) — issues
- [Docker Swarm](../deployment/docker/docker-swarm) — swarm mode
