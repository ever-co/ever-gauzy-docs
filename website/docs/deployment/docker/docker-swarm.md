---
sidebar_position: 17
---

# Docker Swarm Deployment

Deploy Ever Gauzy using Docker Swarm for container orchestration.

## Prerequisites

- Docker Swarm initialized (`docker swarm init`)
- At least 2 nodes for HA

## Stack File

```yaml
version: "3.8"

services:
  api:
    image: ghcr.io/ever-co/gauzy-api:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
    environment:
      - NODE_ENV=production
      - DB_TYPE=postgres
      - DB_HOST=db
      - REDIS_HOST=redis
    networks:
      - gauzy
    ports:
      - "3000:3000"

  webapp:
    image: ghcr.io/ever-co/gauzy-webapp:latest
    deploy:
      replicas: 2
    ports:
      - "4200:4200"
    networks:
      - gauzy

  db:
    image: postgres:16
    deploy:
      placement:
        constraints: [node.role == manager]
    environment:
      - POSTGRES_DB=gauzy
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
    volumes:
      - pgdata:/var/lib/postgresql/data
    secrets:
      - db_password
    networks:
      - gauzy

  redis:
    image: redis:7-alpine
    deploy:
      replicas: 1
    volumes:
      - redisdata:/data
    networks:
      - gauzy

volumes:
  pgdata:
  redisdata:

networks:
  gauzy:
    driver: overlay

secrets:
  db_password:
    external: true
```

## Deploy

```bash
docker stack deploy -c docker-compose.yml gauzy
```

## Scaling

```bash
docker service scale gauzy_api=5
```

## Related Pages

- [Production Deployment](../devops/production-deployment) — general guide
- [Scaling & HA](../devops/scaling) — scaling strategies
