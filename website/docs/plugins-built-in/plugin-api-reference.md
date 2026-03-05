---
sidebar_position: 11
---

# Plugin API Reference

Shared APIs, decorators, guards, and base classes available to all plugins.

## Base Classes

### TenantOrganizationBaseEntity

All plugin entities should extend this class for automatic tenant and organization scoping:

```typescript
export class TenantOrganizationBaseEntity extends TenantBaseEntity {
  organizationId: string;
  organization: Organization;
}
```

### TenantAwareCrudService

Provides CRUD operations with automatic tenant filtering:

```typescript
export class TenantAwareCrudService<T> extends CrudService<T> {
  findAll(filter?: FindManyOptions<T>): Promise<IPagination<T>>;
  findOneByIdString(id: string, options?: FindOneOptions<T>): Promise<T>;
  create(entity: DeepPartial<T>): Promise<T>;
  update(id: string, entity: DeepPartial<T>): Promise<UpdateResult | T>;
  delete(id: string): Promise<DeleteResult>;
}
```

### CrudController

Base controller with standard REST endpoints:

```typescript
export class CrudController<T> {
  constructor(protected readonly crudService: CrudService<T>) {}
}
```

## Guards

| Guard                         | Description                      |
| ----------------------------- | -------------------------------- |
| `TenantPermissionGuard`       | Ensures request is tenant-scoped |
| `PermissionGuard`             | Checks user permissions          |
| `OrganizationPermissionGuard` | Checks org-level perms           |
| `RoleGuard`                   | Checks user role                 |

## Decorators

| Decorator           | Description                 |
| ------------------- | --------------------------- |
| `@Permissions(...)` | Define required permissions |
| `@Roles(...)`       | Define required roles       |
| `@Public()`         | Mark endpoint as public     |
| `@Feature(...)`     | Link to feature flag        |

## Multi-ORM Decorators

| Decorator                 | Description           |
| ------------------------- | --------------------- |
| `@MultiORMEntity(table)`  | Entity registration   |
| `@MultiORMColumn(opts)`   | Column definition     |
| `@MultiORMManyToOne(fn)`  | Many-to-One relation  |
| `@MultiORMOneToMany(fn)`  | One-to-Many relation  |
| `@MultiORMManyToMany(fn)` | Many-to-Many relation |
| `@MultiORMOneToOne(fn)`   | One-to-One relation   |

## Pipes

| Pipe                 | Description               |
| -------------------- | ------------------------- |
| `UUIDValidationPipe` | Validates UUID parameters |
| `UseValidationPipe`  | Applies class-validator   |
| `ParseJsonPipe`      | Parses JSON query params  |

## DTOs

```typescript
// Base query DTOs
BaseQueryDTO<T>; // Pagination + filter + relations
FindOptionsQueryDTO<T>; // Find options with relations
```

## Related Pages

- [Plugin Development Guide](./plugin-development-guide) — getting started
- [Multi-ORM Architecture](../architecture/multi-orm-architecture) — ORM patterns
