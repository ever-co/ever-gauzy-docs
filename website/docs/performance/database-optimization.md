---
sidebar_position: 2
---

# Database Optimization

Database query optimization and indexing strategies.

## Connection Pooling

```bash
DB_POOL_SIZE=40         # Max connections
DB_POOL_SIZE_KNEX=10    # Knex pool size
DB_CONNECTION_TIMEOUT=5000
DB_IDLE_TIMEOUT=10000
```

## Indexing Strategy

### Automatic Indexes

TypeORM and MikroORM create indexes for:

- Primary keys (`id`)
- Foreign keys (`tenantId`, `organizationId`)
- Unique constraints

### Custom Indexes

```typescript
@MultiORMEntity("time_log")
@Index(["tenantId", "organizationId", "employeeId"])
@Index(["startedAt", "stoppedAt"])
export class TimeLog extends TenantOrganizationBaseEntity {
  // ...
}
```

### Key Indexes

| Table      | Columns                                | Purpose               |
| ---------- | -------------------------------------- | --------------------- |
| `time_log` | `tenantId, organizationId, employeeId` | Employee time queries |
| `time_log` | `startedAt, stoppedAt`                 | Date range lookups    |
| `task`     | `tenantId, projectId, status`          | Task filtering        |
| `employee` | `tenantId, organizationId, isActive`   | Active employee lists |

## Query Optimization

### Use Relations Wisely

```typescript
// ❌ N+1 problem
const employees = await employeeRepository.find();
for (const emp of employees) {
  emp.user = await userRepository.findOne(emp.userId);
}

// ✅ Eager load relations
const employees = await employeeRepository.find({
  relations: ["user"],
});
```

### Pagination

Always paginate large result sets:

```typescript
const result = await repository.findAndCount({
  take: 10,
  skip: 0,
  order: { createdAt: "DESC" },
});
```

## Related Pages

- [Performance Overview](./performance-overview)
- [Caching](./caching)
