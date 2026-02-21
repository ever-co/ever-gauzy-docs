---
sidebar_position: 3
---

# Rate Limiting

API rate limiting and throttling configuration.

## Configuration

```bash
THROTTLE_ENABLED=true
THROTTLE_TTL=60           # Window in seconds
THROTTLE_LIMIT=60         # Max requests per window
```

## Guard Setup

```typescript
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: configService.get("THROTTLE_TTL"),
      limit: configService.get("THROTTLE_LIMIT"),
    }),
  ],
})
export class AppModule {}
```

## Per-Endpoint Configuration

```typescript
@Controller('/auth')
export class AuthController {
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60 } })  // Stricter for login
  async login() { ... }

  @Get('check')
  @SkipThrottle()  // No rate limiting
  async check() { ... }
}
```

## Response Headers

Rate-limited responses include:

| Header                  | Description                    |
| ----------------------- | ------------------------------ |
| `X-RateLimit-Limit`     | Max requests per window        |
| `X-RateLimit-Remaining` | Remaining requests             |
| `X-RateLimit-Reset`     | Window reset timestamp         |
| `Retry-After`           | Seconds until retry (429 only) |

## Recommended Limits

| Endpoint Category | Limit | Window |
| ----------------- | :---: | :----: |
| Authentication    |   5   |  60s   |
| General API       |  60   |  60s   |
| File upload       |  10   |  60s   |
| Report generation |   5   |  60s   |
| Public endpoints  |  30   |  60s   |

## Related Pages

- [Security Overview](./security-overview)
- [Error Handling](../api/error-handling) — 429 responses
