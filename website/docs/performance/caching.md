---
sidebar_position: 3
---

# Caching

Caching strategies using Redis and in-memory caching.

## Redis Configuration

```bash
REDIS_ENABLED=true
REDIS_URL=redis://localhost:6379
```

## Cache Layers

| Layer         | Scope        | TTL               | Use Case                       |
| ------------- | ------------ | ----------------- | ------------------------------ |
| **In-memory** | Per-instance | Short (1-5 min)   | Frequently accessed configs    |
| **Redis**     | Shared       | Medium (5-60 min) | Session data, computed results |
| **Response**  | Per-request  | Varies            | HTTP cache headers             |

## NestJS Cache Manager

```typescript
@Injectable()
export class EmployeeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getEmployee(id: string): Promise<IEmployee> {
    const cacheKey = `employee:${id}`;
    const cached = await this.cacheManager.get<IEmployee>(cacheKey);
    if (cached) return cached;

    const employee = await this.repository.findOne(id);
    await this.cacheManager.set(cacheKey, employee, 300); // 5 min TTL
    return employee;
  }
}
```

## Cache Invalidation

Invalidate on mutations:

```typescript
async updateEmployee(id: string, input: UpdateEmployeeDTO) {
  const result = await this.repository.update(id, input);
  await this.cacheManager.del(`employee:${id}`);
  return result;
}
```

## Related Pages

- [Performance Overview](./performance-overview)
- [Database Optimization](./database-optimization)
