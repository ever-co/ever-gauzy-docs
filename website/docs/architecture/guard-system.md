---
sidebar_position: 35
---

# Guard System Deep Dive

NestJS guards used for authentication, authorization, and tenant isolation.

## Guard Execution Order

```mermaid
graph LR
    Request --> Global[Global Guards]
    Global --> Controller[Controller Guards]
    Controller --> Method[Method Guards]
    Method --> Handler[Route Handler]
```

## Core Guards

### TenantPermissionGuard

The most commonly used guard. Validates:

1. User is authenticated (JWT valid)
2. User belongs to the requested tenant
3. User has required permissions

```typescript
@UseGuards(TenantPermissionGuard)
@Permissions(PermissionsEnum.ORG_EMPLOYEES_VIEW)
@Get()
async findAll() {}
```

### RoleGuard

Restricts access by user role:

```typescript
@UseGuards(RoleGuard)
@Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
@Delete(':id')
async delete(@Param('id') id: string) {}
```

### PermissionGuard

Checks specific permissions:

```typescript
@UseGuards(PermissionGuard)
@Permissions(PermissionsEnum.INVOICES_EDIT)
@Put(':id')
async update() {}
```

### OrganizationPermissionGuard

Validates organization-level access:

```typescript
@UseGuards(OrganizationPermissionGuard)
@Get()
async findByOrg() {}
```

## Guard Hierarchy

| Guard                         | Validates                | Usage           |
| ----------------------------- | ------------------------ | --------------- |
| `AuthGuard('jwt')`            | JWT token valid          | All endpoints   |
| `TenantBaseGuard`             | Tenant exists in request | Most endpoints  |
| `TenantPermissionGuard`       | Tenant + permissions     | CRUD operations |
| `RoleGuard`                   | User role matches        | Admin endpoints |
| `PermissionGuard`             | Specific permission      | Feature access  |
| `OrganizationPermissionGuard` | Org membership           | Org endpoints   |

## Creating Custom Guards

```typescript
@Injectable()
export class ProjectMemberGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const projectId = request.params.projectId;
    const userId = request.user.id;

    return this.projectService.isMember(projectId, userId);
  }
}
```

## Related Pages

- [Request Lifecycle](./request-lifecycle) — full request flow
- [Interceptor Patterns](./interceptor-patterns) — interceptors
- [Testing Guards](../testing/testing-guards) — guard testing
