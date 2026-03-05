---
sidebar_position: 5
---

# Health Checks & Diagnostics

Built-in health checks for monitoring application and dependency status.

## Health Check Endpoint

```
GET /api/health
```

**Response:**

```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "redis": { "status": "up" },
    "disk": { "status": "up" },
    "memory": { "status": "up" }
  },
  "error": {},
  "details": {
    "database": { "status": "up" },
    "redis": { "status": "up" }
  }
}
```

## Check Types

| Check    | Description                    | Threshold  |
| -------- | ------------------------------ | ---------- |
| Database | PostgreSQL/SQLite connectivity | 3s timeout |
| Redis    | Redis connectivity             | 3s timeout |
| Disk     | Available disk space           | > 10% free |
| Memory   | Available memory (RSS)         | < 80% used |

## Load Balancer Integration

Configure your load balancer to use the health endpoint:

```nginx
upstream gauzy_api {
  server api1:3000;
  server api2:3000;
}

server {
  location /api/health {
    proxy_pass http://gauzy_api;
  }
}
```

## Kubernetes Probes

```yaml
livenessProbe:
  httpGet:
    path: /api/health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /api/health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Related Pages

- [Monitoring & Observability](../devops/monitoring) — production monitoring
- [Production Deployment](../devops/production-deployment) — deployment guide
