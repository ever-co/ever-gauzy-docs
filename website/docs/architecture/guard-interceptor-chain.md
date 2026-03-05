---
sidebar_position: 21
---

# Guard & Interceptor Chain

Detailed reference for all guards, interceptors, and decorators used in the API.

## Guards

### TenantPermissionGuard

The first guard in the chain. Extracts the tenant from the JWT token and sets it in the `RequestContext`.

```typescript
@UseGuards(TenantPermissionGuard)
```

**Logic:**

1. Extract JWT from `Authorization` header
2. Decode token to get `tenantId`
3. Validate tenant exists and is active
4. Set `RequestContext.currentTenantId`

### PermissionGuard

Checks if the current user has the required permission(s).

```typescript
@UseGuards(PermissionGuard)
@Permissions(PermissionsEnum.ORG_USERS_VIEW)
```

**Logic:**

1. Read `@Permissions()` decorator metadata
2. Compare with user's role permissions
3. Allow if any required permission matches

### OrganizationPermissionGuard

Same as `PermissionGuard` but also validates organization context.

### RoleGuard

Restricts access to specific roles.

```typescript
@UseGuards(RoleGuard)
@Roles(RolesEnum.SUPER_ADMIN)
```

### FeatureFlagGuard

Checks if a feature is enabled for the current tenant.

```typescript
@UseGuards(FeatureFlagGuard)
@Feature(FeatureEnum.FEATURE_SPRINT)
```

## Interceptors

### TransformInterceptor

Wraps controller responses in a standard format:

```json
{
  "data": { ... },
  "message": "Success"
}
```

### TimeoutInterceptor

Enforces request timeout:

```typescript
@UseInterceptors(TimeoutInterceptor)
@Timeout(30000) // 30 seconds
```

### LazyLoadInterceptor

Handles lazy loading of entity relations from query parameters.

## Decorators Reference

| Decorator              | Target    | Description            |
| ---------------------- | --------- | ---------------------- |
| `@Permissions(...)`    | Method    | Required permissions   |
| `@Roles(...)`          | Method    | Required roles         |
| `@Feature(...)`        | Method    | Required feature flag  |
| `@Public()`            | Method    | Skip authentication    |
| `@UseValidationPipe()` | Method    | Apply validation pipe  |
| `@Timeout(ms)`         | Method    | Request timeout        |
| `@RequestContext()`    | Parameter | Inject request context |

## Custom Guard Example

```typescript
@Injectable()
export class MyCustomGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = RequestContext.currentUser();
    return this.validateCustomLogic(user);
  }
}
```

## Related Pages

- [Request Lifecycle](./request-lifecycle) — full request flow
- [API Security Best Practices](../security/api-security-best-practices) — security
- [Plugin API Reference](../plugins/plugin-api-reference) — available decorators
