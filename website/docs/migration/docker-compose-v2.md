---
sidebar_position: 4
---

# Docker Compose V1 to V2 Migration

Update your Docker Compose configuration from V1 to V2 syntax.

## Key Changes

### Version Field

```diff
- version: '3.8'
+ # No version field needed in V2
```

### Command

```diff
- docker-compose up -d
+ docker compose up -d
```

### Environment Files

```diff
- env_file:
-   - .env
+ env_file:
+   - path: .env
+     required: false
```

### Healthchecks

```diff
  db:
    healthcheck:
-     test: ["CMD-SHELL", "pg_isready"]
+     test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
+     start_period: 30s
```

### Depends On with Conditions

```yaml
services:
  api:
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
```

### Profiles

```yaml
services:
  api:
    profiles: ["production"]

  debug:
    profiles: ["debug"]
```

Run specific profiles: `docker compose --profile production up`

## Full V2 Example

```yaml
services:
  api:
    image: ghcr.io/ever-co/gauzy-api:latest
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    env_file:
      - path: .env
        required: true
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_DB: gauzy
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASS}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

volumes:
  pgdata:
```

## Related Pages

- [Production Deployment](../devops/production-deployment) — deployment guide
- [Docker Troubleshooting](../troubleshooting/docker-issues) — Docker issues
