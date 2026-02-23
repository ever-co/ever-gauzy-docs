---
sidebar_position: 4
---

# Monitoring

Application monitoring, error tracking, and health checks.

## Health Checks

```bash
# API Health
GET /api/health

# Response
{
  "status": "ok",
  "info": {
    "database": { "status": "up" }
  }
}
```

## Sentry Integration

```bash
SENTRY_DSN=https://key@sentry.io/project-id
SENTRY_TRACES_SAMPLE_RATE=0.1
SENTRY_HTTP_TRACING_ENABLED=true
SENTRY_POSTGRES_TRACING_ENABLED=true
```

Sentry captures:

- Unhandled exceptions
- API performance traces
- Database query performance
- Frontend errors

## Logging

```bash
LOG_LEVEL=info    # error, warn, log, debug, verbose
```

### Structured Logging

```typescript
this.logger.log("Employee created", {
  employeeId: employee.id,
  tenantId: employee.tenantId,
  action: "create",
});
```

## Key Metrics to Monitor

| Metric                  | Alert Threshold |
| ----------------------- | :-------------: |
| API Error Rate          |      > 1%       |
| API Response Time (p95) |      > 1s       |
| Database Connections    |   > 80% pool    |
| Memory Usage            |      > 80%      |
| CPU Usage               | > 70% sustained |
| Disk Usage              |      > 85%      |

## Related Pages

- [Performance Overview](./performance-overview)
- [Deployment Overview](../deployment/deployment-overview)
