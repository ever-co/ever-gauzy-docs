---
sidebar_position: 8
---

# Testing Guards & Interceptors

Test NestJS guards, interceptors, and middleware.

## Testing Guards

```typescript
import { ExecutionContext } from "@nestjs/common";
import { TenantPermissionGuard } from "./tenant-permission.guard";

describe("TenantPermissionGuard", () => {
  let guard: TenantPermissionGuard;

  beforeEach(() => {
    guard = new TenantPermissionGuard(mockReflector, mockEmployeeService);
  });

  it("should allow access for valid tenant", async () => {
    const context = createMockContext({
      user: { tenantId: "tenant-1", role: { name: "ADMIN" } },
    });

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it("should deny access for missing tenant", async () => {
    const context = createMockContext({
      user: { tenantId: null },
    });

    await expect(guard.canActivate(context)).rejects.toThrow();
  });
});

function createMockContext(overrides: any): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        user: overrides.user,
        headers: {},
        ...overrides,
      }),
    }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as unknown as ExecutionContext;
}
```

## Testing Interceptors

```typescript
describe("TransformInterceptor", () => {
  let interceptor: TransformInterceptor;

  beforeEach(() => {
    interceptor = new TransformInterceptor();
  });

  it("should wrap response in data object", async () => {
    const context = createMockContext({});
    const handler = {
      handle: () => of({ id: "1", name: "Test" }),
    };

    const result = await lastValueFrom(interceptor.intercept(context, handler));
    expect(result).toEqual({ data: { id: "1", name: "Test" } });
  });
});
```

## Testing Pipes

```typescript
describe("UUIDValidationPipe", () => {
  const pipe = new UUIDValidationPipe();

  it("should pass valid UUID", () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";
    expect(pipe.transform(uuid)).toBe(uuid);
  });

  it("should reject invalid UUID", () => {
    expect(() => pipe.transform("not-a-uuid")).toThrow(BadRequestException);
  });
});
```

## Related Pages

- [Unit Testing Guide](./unit-testing) — unit tests
- [Guard System](../architecture/guard-system) — guard architecture
- [Interceptor Patterns](../architecture/interceptor-patterns) — interceptors
