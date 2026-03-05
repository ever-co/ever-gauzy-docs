---
sidebar_position: 4
---

# Database Indexing Strategy

Optimize query performance with proper indexing.

## Default Indexes

All entities include indexes on:

- `id` (Primary Key)
- `tenantId` (Multi-tenancy filter)
- `organizationId` (Organization filter)

## Common Index Patterns

### Single Column Index

```typescript
@MultiORMEntity("time_log")
export class TimeLog extends TenantOrganizationBaseEntity {
  @MultiORMColumn()
  @Index()
  employeeId: string;

  @MultiORMColumn()
  @Index()
  startedAt: Date;
}
```

### Composite Index

```typescript
@Index(["tenantId", "organizationId", "employeeId"])
@MultiORMEntity("time_log")
export class TimeLog extends TenantOrganizationBaseEntity {}
```

### Unique Index

```typescript
@Index(["email", "tenantId"], { unique: true })
@MultiORMEntity("user")
export class User extends TenantBaseEntity {}
```

## Recommended Indexes

| Table    | Columns                       | Type      | Purpose         |
| -------- | ----------------------------- | --------- | --------------- |
| time_log | (employeeId, startedAt)       | Composite | Time reports    |
| time_log | (projectId, startedAt)        | Composite | Project reports |
| task     | (projectId, status)           | Composite | Task lists      |
| task     | (title)                       | GIN/FTS   | Search          |
| employee | (organizationId, isActive)    | Composite | Employee lists  |
| invoice  | (organizationId, status)      | Composite | Invoice filters |
| contact  | (organizationId, contactType) | Composite | CRM queries     |

## Query Analysis

```sql
-- PostgreSQL
EXPLAIN ANALYZE SELECT * FROM time_log
WHERE employee_id = 'uuid'
  AND started_at BETWEEN '2025-01-01' AND '2025-01-31';
```

## Index Monitoring

```sql
-- Unused indexes
SELECT indexrelname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

## Related Pages

- [Query Builder Patterns](./query-builder) — complex queries
- [Performance Benchmarks](../reference/performance-benchmarks) — performance
- [Database Schema](./schema-overview) — schema
