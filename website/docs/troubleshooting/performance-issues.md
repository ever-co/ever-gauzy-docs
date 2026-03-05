---
sidebar_position: 6
---

# Performance Troubleshooting

Diagnose and fix performance issues.

## Slow API Responses

### Database Queries

**Symptom:** Endpoints take > 1 second

**Diagnosis:**

```sql
-- Find slow queries in PostgreSQL
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active'
ORDER BY duration DESC;
```

**Fixes:**

1. Add database indexes for frequently queried columns
2. Reduce `relations` in API queries
3. Use pagination (`page` + `limit` params)
4. Enable query caching with Redis

### N+1 Query Problem

**Symptom:** Many small queries instead of one JOIN

**Fix:** Use eager loading for relations:

```typescript
const result = await this.service.findAll({
  relations: ["user", "organization"],
});
```

## High Memory Usage

**Symptom:** API process exceeding memory limits

**Fixes:**

1. Increase `NODE_OPTIONS="--max-old-space-size=4096"`
2. Check for memory leaks (unclosed connections, large caches)
3. Use streaming for large data exports

## Redis Performance

**Diagnosis:**

```bash
redis-cli INFO memory
redis-cli INFO stats
redis-cli SLOWLOG GET 10
```

**Fixes:**

1. Set appropriate `maxmemory` and eviction policy
2. Monitor key expiration
3. Use Redis Cluster for large datasets

## Frontend Performance

**Fixes:**

1. Enable lazy loading for feature modules
2. Use `OnPush` change detection strategy
3. Implement virtual scrolling for long lists
4. Optimize images and assets

## Related Pages

- [Monitoring & Observability](../devops/monitoring) — monitoring setup
- [Scaling & HA](../devops/scaling) — scaling guide
- [Redis & Caching](../advanced/redis-and-caching) — caching patterns
