---
sidebar_position: 9
---

# Multi-Schema Tenancy

Database-level tenant isolation strategies.

## Tenant Isolation Models

| Model                 | Description                | Isolation | Complexity |
| --------------------- | -------------------------- | --------- | ---------- |
| **Shared Schema**     | All tenants in one DB      | Low       | Low        |
| **Schema per Tenant** | Separate schema per tenant | Medium    | Medium     |
| **DB per Tenant**     | Separate database          | High      | High       |

## Gauzy's Approach: Shared Schema with Row-Level Security

Gauzy uses a shared schema model with `tenantId` on every entity:

```typescript
export abstract class TenantBaseEntity extends BaseEntity {
  @MultiORMColumn()
  tenantId: string;

  @MultiORMManyToOne(() => Tenant)
  tenant: Tenant;
}
```

### Automatic Tenant Filtering

Every query is automatically scoped to the current tenant via:

1. **TenantPermissionGuard** — extracts `tenantId` from JWT
2. **RequestContext** — stores tenant info for the request lifecycle
3. **Service base class** — applies tenant filter to all queries

```typescript
// In TenantAwareCrudService
async findAll(filter: any): Promise<IPagination<T>> {
  const tenantId = RequestContext.currentTenantId();
  return super.findAll({
    ...filter,
    where: { ...filter.where, tenantId },
  });
}
```

## PostgreSQL Row-Level Security (Advanced)

For additional database-level enforcement:

```sql
ALTER TABLE employee ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON employee
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

## Cross-Tenant Queries (Admin)

Super admin can query across tenants:

```typescript
if (RequestContext.hasRole(RolesEnum.SUPER_ADMIN)) {
  // Skip tenant filter
  return super.findAll(filter);
}
```

## Related Pages

- [Multi-Tenant Data Flow](../architecture/multi-tenant-data-flow) — tenant flow
- [Entity Inheritance](../architecture/entity-inheritance) — base entities
- [Guard System](../architecture/guard-system) — tenant guards
