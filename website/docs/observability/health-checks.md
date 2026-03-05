---
sidebar_position: 4
---

# Health Check Endpoints

Monitor application health status.

## Endpoint

```
GET /api/health
```

No authentication required. Returns application health status.

## Response

```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "redis": { "status": "up" },
    "memory": { "status": "up", "rss": "256MB" }
  },
  "error": {},
  "details": {
    "database": { "status": "up" },
    "redis": { "status": "up" }
  }
}
```

## Health Indicators

| Indicator | Checks                      | Critical |
| --------- | --------------------------- | -------- |
| Database  | PostgreSQL connection alive | Yes      |
| Redis     | Redis connection alive      | Yes      |
| Memory    | RSS below threshold         | No       |
| Disk      | Disk space available        | No       |

## Status Codes

| HTTP Code | Status    | Description                 |
| --------- | --------- | --------------------------- |
| 200       | Healthy   | All indicators up           |
| 503       | Unhealthy | One or more indicators down |

## Usage in Docker

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Usage in Kubernetes

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

- [Prometheus Metrics](./prometheus-metrics) — metrics monitoring
- [Production Deployment](../devops/production-deployment) — deployment
