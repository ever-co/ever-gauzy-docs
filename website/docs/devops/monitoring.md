---
sidebar_position: 3
---

# Monitoring & Observability

Configure monitoring, health checks, and observability for production deployments.

## Health Checks

Gauzy exposes health check endpoints for load balancers and monitoring:

```
GET /api/health
```

**Response** `200 OK`:

```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "redis": { "status": "up" }
  }
}
```

## Sentry Integration

Configure Sentry for error tracking and performance monitoring:

| Variable                          | Description            |
| --------------------------------- | ---------------------- |
| `SENTRY_DSN`                      | Sentry DSN             |
| `SENTRY_TRACES_SAMPLE_RATE`       | Trace sampling (0-1)   |
| `SENTRY_HTTP_TRACING_ENABLED`     | HTTP request tracing   |
| `SENTRY_POSTGRES_TRACING_ENABLED` | Database query tracing |

## Logging

Configure log levels and outputs:

| Variable    | Description                      | Default |
| ----------- | -------------------------------- | ------- |
| `LOG_LEVEL` | `debug`, `info`, `warn`, `error` | `info`  |

## Metrics to Monitor

| Metric               | Description                | Alert Threshold |
| -------------------- | -------------------------- | --------------- |
| API response time    | Average endpoint latency   | > 500ms         |
| Error rate           | 5xx errors per minute      | > 1%            |
| Database connections | Active DB pool connections | > 80% pool      |
| Redis memory         | Redis memory usage         | > 80%           |
| Disk usage           | Storage utilization        | > 85%           |
| CPU usage            | Server CPU utilization     | > 80%           |

## Related Pages

- [Production Deployment](./production-deployment) — deployment guide
- [Analytics Plugins](../plugins/plugins-built-in/analytics-plugins) — Sentry plugin
