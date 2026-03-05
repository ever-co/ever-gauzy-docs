---
sidebar_position: 4
---

# Redis & Caching Patterns

Redis usage for caching, session storage, and job queues in Ever Gauzy.

## Overview

Redis is used for several purposes in Gauzy:

| Use Case        | Description                          |
| --------------- | ------------------------------------ |
| Caching         | API response and query caching       |
| Job Queues      | BullMQ background job processing     |
| Session Storage | Distributed session management       |
| Real-time       | Socket.IO adapter for multi-instance |

## Configuration

| Variable         | Description    | Default     |
| ---------------- | -------------- | ----------- |
| `REDIS_HOST`     | Redis host     | `localhost` |
| `REDIS_PORT`     | Redis port     | `6379`      |
| `REDIS_PASSWORD` | Redis password | —           |
| `REDIS_TLS`      | Enable TLS     | `false`     |

## BullMQ Job Queues

Background jobs are processed using BullMQ with Redis:

```typescript
import { InjectQueue } from "@nestjs/bull";

@Injectable()
export class MyService {
  constructor(@InjectQueue("email") private emailQueue: Queue) {}

  async sendEmail(data: EmailData) {
    await this.emailQueue.add("send", data, {
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    });
  }
}
```

## Cache Patterns

### API Response Caching

```typescript
@Get('/expensive-query')
@UseInterceptors(CacheInterceptor)
@CacheTTL(300) // 5 minutes
async getExpensiveData() { ... }
```

### Manual Cache Management

```typescript
@Injectable()
export class MyService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async getData(key: string) {
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const data = await this.fetchFromDB();
    await this.cache.set(key, data, { ttl: 300 });
    return data;
  }
}
```

## Related Pages

- [Scaling & High Availability](../devops/scaling) — multi-instance setup
- [Environment Variables](../devops/environment-variables) — Redis config
