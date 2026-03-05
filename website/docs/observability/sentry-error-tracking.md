---
sidebar_position: 3
---

# Sentry Error Tracking

Configure Sentry for error monitoring and performance tracking.

## Setup

### 1. Create Sentry Project

1. Go to [sentry.io](https://sentry.io)
2. Create a new project for Node.js
3. Copy the DSN

### 2. Configure

```env
SENTRY_DSN=https://xxx@sentry.io/12345
SENTRY_TRACES_SAMPLE_RATE=0.1
SENTRY_ENVIRONMENT=production
```

### 3. Integration

Sentry is automatically configured in the API when `SENTRY_DSN` is set. It captures:

- Unhandled exceptions
- HTTP 5xx responses
- Slow database queries
- Performance traces

## Features

| Feature          | Description                    |
| ---------------- | ------------------------------ |
| Error grouping   | Similar errors grouped         |
| Stack traces     | Full stack traces with context |
| Breadcrumbs      | Events leading to error        |
| Performance      | Transaction tracing            |
| Release tracking | Errors by release version      |
| Alerts           | Email/Slack notifications      |

## Custom Error Context

```typescript
import * as Sentry from "@sentry/node";

Sentry.setUser({ id: userId, email: userEmail });
Sentry.setTag("tenant", tenantId);
Sentry.captureMessage("Custom event");
```

## Source Maps

Upload source maps for readable stack traces:

```bash
sentry-cli releases files $VERSION upload-sourcemaps ./dist
```

## Related Pages

- [Error Handling Architecture](../architecture/error-handling-architecture) — error patterns
- [Prometheus Metrics](./prometheus-metrics) — metrics monitoring
- [Grafana Dashboards](./grafana-dashboards) — visualization
