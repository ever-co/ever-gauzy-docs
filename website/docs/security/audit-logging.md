---
sidebar_position: 4
---

# Audit Logging & Observability

Track changes to critical data with audit logging, and monitor application health with structured logging and observability tools.

## Audited Actions

| Entity       | Actions Logged                    |
| ------------ | --------------------------------- |
| User         | Login, logout, password change    |
| Employee     | Create, update, deactivate        |
| Organization | Create, update, settings change   |
| Role         | Create, update, permission change |
| Invoice      | Create, send, status change       |
| Time Log     | Create, update, delete            |

## Audit Log Fields

| Field            | Description                         |
| ---------------- | ----------------------------------- |
| `action`         | CREATE, UPDATE, DELETE, LOGIN, etc. |
| `entity`         | Entity type (User, Employee, etc.)  |
| `entityId`       | ID of affected entity               |
| `userId`         | User who performed action           |
| `previousValues` | State before change                 |
| `updatedValues`  | State after change                  |
| `ipAddress`      | Client IP address                   |
| `timestamp`      | When action occurred                |

## Retention

Audit logs follow configurable retention policies. Default: 24 months.

## Structured Logging

- **All authentication events** use the NestJS `Logger` — no `console.log` calls in auth module.
- Sensitive data (passwords, tokens, credentials) is **never logged**.
- Error messages in logs include only the error message, not full objects or stack traces.

## Observability

### OpenTelemetry (OTEL)

OpenTelemetry tracing is supported when `OTEL_ENABLED=true`:

```bash
OTEL_ENABLED=true
```

When enabled, distributed tracing spans are automatically collected for HTTP requests, database queries, and inter-service communication.

### Sentry

Sentry integration is available for error tracking via the `sentry.dsn` configuration. Sentry captures unhandled exceptions, performance metrics, and breadcrumbs for debugging production issues.

## Related Pages

- [Security Overview](./security-overview)
- [Data Protection](./data-protection) — compliance requirements
