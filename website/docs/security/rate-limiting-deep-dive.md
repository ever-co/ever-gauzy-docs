---
sidebar_position: 12
---

# API Rate Limiting Deep Dive

Protect your API from abuse with rate limiting.

## Configuration

```env
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

This allows 100 requests per 60 seconds per IP.

## Per-Endpoint Limits

```typescript
@Throttle({ default: { limit: 5, ttl: 60 } })
@Post('auth/login')
async login(@Body() dto: LoginDTO) {}

@Throttle({ default: { limit: 1000, ttl: 60 } })
@Get('employee')
async findAll() {}
```

## Rate Limit Headers

| Header                  | Description               |
| ----------------------- | ------------------------- |
| `X-RateLimit-Limit`     | Max requests per window   |
| `X-RateLimit-Remaining` | Remaining requests        |
| `X-RateLimit-Reset`     | Window reset timestamp    |
| `Retry-After`           | Seconds until retry (429) |

## Response on Rate Limit

```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

## Redis-Based Rate Limiting

For multi-instance deployments, use Redis storage:

```typescript
ThrottlerModule.forRoot({
  throttlers: [{ ttl: 60, limit: 100 }],
  storage: new ThrottlerStorageRedisService(redisClient),
});
```

## Recommended Limits

| Endpoint Type  | Limit         | Window |
| -------------- | ------------- | ------ |
| Login          | 5 attempts    | 60s    |
| Password Reset | 3 attempts    | 300s   |
| CRUD Read      | 1000 requests | 60s    |
| CRUD Write     | 100 requests  | 60s    |
| File Upload    | 10 uploads    | 60s    |
| Export         | 5 exports     | 300s   |

## Related Pages

- [Security Overview](./security-overview) — security guide
- [API Rate Limits Reference](../reference/api-rate-limits) — limits table
