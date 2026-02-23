---
sidebar_position: 8
---

# Tenant Filtering

Documentation of how tenant-scoped data isolation is enforced at the ORM level, including intentional bypasses and their justifications.

## How Tenant Filtering Works

All entities extending `TenantBaseEntity` or `TenantOrganizationBaseEntity` are automatically scoped by `tenantId`:

```typescript
// TenantAwareCrudService automatically adds:
// WHERE tenant_id = :currentTenantId
const employees = await this.employeeService.findAll();
// Returns only employees for the authenticated user's tenant
```

### Automatic Filtering

Services that extend `TenantAwareCrudService` automatically inject the current user's `tenantId` into:

- `find()` / `findAll()` — SELECT queries
- `findOne()` — single record queries
- `create()` — INSERT operations (sets tenantId)
- `update()` — UPDATE operations (scoped by tenantId)
- `delete()` — DELETE operations (scoped by tenantId)

## Intentional Bypasses

Some scenarios intentionally bypass tenant filtering. Every bypass must be documented and justified.

### Category 1: Cross-Tenant by Design

These services **must** query across all tenants as part of their core functionality:

| Service                      | Justification                           |
| ---------------------------- | --------------------------------------- |
| `TenantService.findAll()`    | Super Admin listing all tenants         |
| `UserService.findByEmail()`  | Email lookup during login (pre-auth)    |
| `AuthService.validateUser()` | Authentication (no tenant context yet)  |
| `HealthService.check()`      | System health check (no tenant context) |

### Category 2: Manual QueryBuilder Usage

Services using `createQueryBuilder()` bypass automatic tenant scoping and **must manually include** `tenantId`:

```typescript
// ✅ CORRECT — includes tenant_id filter
const result = await this.repository
  .createQueryBuilder("employee")
  .where("employee.tenantId = :tenantId", {
    tenantId: RequestContext.currentTenantId(),
  })
  .getMany();

// ❌ WRONG — missing tenant_id filter
const result = await this.repository.createQueryBuilder("employee").getMany();
```

### Category 3: Plugin Services

Integration plugins that sync external data may operate outside standard tenant context:

| Plugin             | Justification                                      |
| ------------------ | -------------------------------------------------- |
| GitHub Integration | Webhook handlers receive data without user context |
| Upwork Integration | Background sync jobs with stored credentials       |
| Job Search         | Cross-tenant job matching                          |

### Category 4: Base Class Internal

Internal methods in `CrudService` and `TenantAwareCrudService` that implement the filtering logic itself:

| Method                  | Justification                            |
| ----------------------- | ---------------------------------------- |
| `CrudService.findAll()` | Base implementation without tenant scope |
| `CrudService.findOne()` | Overridden by TenantAwareCrudService     |

## Audit Rules

### New Services

All new services **must**:

1. Extend `TenantAwareCrudService` (default)
2. Or document the bypass with justification
3. Never use raw `Repository` without tenant filtering

### Manual QueryBuilder

All `createQueryBuilder` usages **must**:

1. Include `.where('entity.tenantId = :tenantId', { tenantId })` clause
2. Use `RequestContext.currentTenantId()` for the tenant ID
3. Be audited for tenant isolation compliance

### Code Review Checklist

- ✅ Does the service extend `TenantAwareCrudService`?
- ✅ If using `createQueryBuilder`, is `tenantId` in the WHERE clause?
- ✅ If bypassing tenant filtering, is there a documented justification?
- ✅ Are plugin services properly scoped when handling multi-tenant data?
- ✅ Do background jobs use stored tenant context?

## Configuration

### Super Admin Cross-Tenant Access

```bash
# Allow Super Admin to query across tenants
ALLOW_SUPER_ADMIN_ROLE=true
```

Super Admin users can access the `TenantController` to list and manage all tenants.

## Maintenance Guidelines

### Adding a New Bypass

1. Document the service, method, and justification in this page
2. Add a code comment explaining the bypass
3. Ensure Super Admin or system-level authorization is in place
4. Submit for code review with explicit security review

### Auditing Existing Bypasses

Periodically audit all services for:

- Unauthorized `Repository.find()` usage (bypasses tenant filter)
- Missing `tenantId` in `createQueryBuilder` queries
- New plugin services without documentation
- Deprecated bypasses that can be removed

## Related Pages

- [Multi-Tenancy](../architecture/multi-tenancy) — tenant architecture
- [Roles & Permissions](../authentication/roles-and-permissions) — RBAC
- [Database Overview](./database-overview) — general database info
