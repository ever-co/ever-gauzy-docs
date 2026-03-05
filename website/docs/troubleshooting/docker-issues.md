---
sidebar_position: 4
---

# Docker Troubleshooting

Resolve common Docker-related issues.

## Container Won't Start

**Symptom:** Container exits immediately

**Fix:** Check logs:

```bash
docker logs gauzy-api --tail 100
```

Common causes:

- Missing required environment variables
- Database not ready yet (use `depends_on` and health checks)
- Port conflict

## Database Not Ready

**Symptom:** `ECONNREFUSED` in API container

**Fix:** Use health check in `docker-compose.yml`:

```yaml
db:
  image: postgres:16
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres"]
    interval: 5s
    timeout: 5s
    retries: 10

api:
  depends_on:
    db:
      condition: service_healthy
```

## Permission Denied

**Symptom:** `EACCES: permission denied`

**Fix:** Check file permissions in volumes:

```bash
sudo chown -R 1000:1000 ./data
```

## Image Pull 401

**Symptom:** `unauthorized: authentication required`

**Fix:** Login to GHCR:

```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
```

## Out of Disk Space

**Symptom:** `no space left on device`

**Fix:**

```bash
docker system prune -af
docker volume prune -f
```

## Slow Build

**Fix:** Use multi-stage builds and `.dockerignore`:

```
node_modules
.git
*.md
dist
```

## Related Pages

- [Production Deployment](../devops/production-deployment) — Docker setup
- [Docker Swarm](../deployment/docker/docker-swarm) — Swarm deployment
