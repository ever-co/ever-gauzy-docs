---
sidebar_position: 13
---

# API Rate Limits Reference

Default rate limits for all Ever Gauzy API endpoints.

## Global Limits

| Tier          | Limit         | Window     |
| ------------- | ------------- | ---------- |
| Default       | 100 requests  | 60 seconds |
| Authenticated | 1000 requests | 60 seconds |
| Admin         | 5000 requests | 60 seconds |

## Per-Endpoint Limits

### Authentication

| Endpoint                        | Limit | Window | Reason                 |
| ------------------------------- | ----- | ------ | ---------------------- |
| `POST /api/auth/login`          | 5     | 60s    | Brute-force protection |
| `POST /api/auth/register`       | 3     | 300s   | Abuse prevention       |
| `POST /api/auth/reset-password` | 3     | 300s   | Abuse prevention       |

### CRUD Operations

| Endpoint Pattern | Limit | Window |
| ---------------- | ----- | ------ |
| `GET /api/*`     | 1000  | 60s    |
| `POST /api/*`    | 100   | 60s    |
| `PUT /api/*`     | 100   | 60s    |
| `DELETE /api/*`  | 50    | 60s    |

### Heavy Operations

| Endpoint                       | Limit | Window | Reason             |
| ------------------------------ | ----- | ------ | ------------------ |
| `POST /api/image-asset/upload` | 10    | 60s    | Resource intensive |
| `GET /api/export/*`            | 5     | 300s   | CPU intensive      |
| `POST /api/import/*`           | 5     | 300s   | CPU intensive      |

## Response Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1709635260
```

## Exceeding Limits

```json
HTTP/1.1 429 Too Many Requests
Retry-After: 45

{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

## Related Pages

- [Rate Limiting Deep Dive](../security/rate-limiting-deep-dive) — configuration
- [API Overview](../api/overview) — API reference
