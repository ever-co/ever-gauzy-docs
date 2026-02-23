---
sidebar_position: 3
---

# Rate Limiting

API rate limiting and throttling configuration powered by `@nestjs/throttler`.

## Configuration

Rate limiting is **enabled by default in production**.

```bash
THROTTLE_ENABLED=true    # Enabled by default in production
THROTTLE_TTL=60000       # Default window (ms)
THROTTLE_LIMIT=100       # Default global limit
```

Set `THROTTLE_ENABLED=false` to disable (not recommended in production).

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

## Per-Endpoint Rate Limits

Authentication endpoints have stricter per-endpoint limits to prevent brute-force attacks:

| Endpoint                            | Limit      | Window     |
| ----------------------------------- | ---------- | ---------- |
| `POST /auth/login`                  | 5 requests | 60 seconds |
| `POST /auth/register`               | 3 requests | 60 seconds |
| `POST /auth/signin.email`           | 3 requests | 60 seconds |
| `POST /auth/signin.email/confirm`   | 5 requests | 60 seconds |
| `POST /auth/signin.email.password`  | 5 requests | 60 seconds |
| `POST /auth/signin.email.social`    | 5 requests | 60 seconds |
| `POST /auth/signin.workspace`       | 5 requests | 60 seconds |
| `POST /auth/signup.provider.social` | 5 requests | 60 seconds |
| `POST /auth/signup.link.account`    | 3 requests | 60 seconds |
| `POST /auth/request-password`       | 3 requests | 60 seconds |
| `POST /auth/reset-password`         | 3 requests | 60 seconds |
| `POST /auth/refresh-token`          | 5 requests | 60 seconds |

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
- [Authentication Flows](./authentication-flows) — flow-specific rate limits
- [Error Handling](../api/error-handling) — 429 responses
