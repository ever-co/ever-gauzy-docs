---
sidebar_position: 5
---

# Connection Pooling

Configure and optimize database connection pools.

## TypeORM Pool Configuration

```env
DB_POOL_SIZE=40
DB_POOL_MAX=100
```

```typescript
TypeOrmModule.forRoot({
  type: "postgres",
  extra: {
    max: parseInt(process.env.DB_POOL_SIZE || "40"),
    min: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  },
});
```

## Pool Sizing Guide

| Deployment Size | Pool Size | Max | Min |
| --------------- | --------- | --- | --- |
| Development     | 5         | 10  | 1   |
| Small (< 20)    | 20        | 30  | 5   |
| Medium (< 100)  | 40        | 60  | 10  |
| Large (500+)    | 80        | 100 | 20  |

**Formula:** `pool_size = (cores * 2) + effective_spindle_count`

## PgBouncer (Connection Pooler)

For large deployments, use PgBouncer:

```ini
# pgbouncer.ini
[databases]
gauzy = host=db port=5432 dbname=gauzy

[pgbouncer]
pool_mode = transaction
default_pool_size = 50
max_client_conn = 500
```

### Docker Compose

```yaml
pgbouncer:
  image: edoburu/pgbouncer
  environment:
    DATABASE_URL: postgres://postgres:password@db:5432/gauzy
    POOL_MODE: transaction
    DEFAULT_POOL_SIZE: 50
  ports:
    - "6432:6432"
```

## Monitoring Connections

```sql
-- Active connections
SELECT count(*) FROM pg_stat_activity WHERE datname = 'gauzy';

-- Connection states
SELECT state, count(*)
FROM pg_stat_activity
WHERE datname = 'gauzy'
GROUP BY state;
```

## Related Pages

- [Database Schema](./schema-overview) — schema
- [Performance Benchmarks](../reference/performance-benchmarks) — performance
- [Production Deployment](../devops/production-deployment) — deployment
