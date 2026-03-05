---
sidebar_position: 28
---

# Decorator System Reference

Custom TypeScript decorators used throughout the Ever Gauzy codebase.

## Controller Decorators

| Decorator              | Target | Description                  |
| ---------------------- | ------ | ---------------------------- |
| `@Public()`            | Method | Skip JWT authentication      |
| `@Permissions(...)`    | Method | Require specific permissions |
| `@Roles(...)`          | Method | Require specific roles       |
| `@Feature(...)`        | Method | Require feature flag enabled |
| `@Timeout(ms)`         | Method | Set request timeout          |
| `@UseValidationPipe()` | Method | Apply class-validator pipe   |

## Entity Decorators

### Multi-ORM Entity

```typescript
@MultiORMEntity("my_entity")
export class MyEntity extends TenantOrganizationBaseEntity {
  @MultiORMColumn()
  name: string;

  @MultiORMManyToOne(() => User, { nullable: true })
  user?: User;

  @MultiORMOneToMany(() => Item, (item) => item.parent)
  items?: Item[];
}
```

| Decorator                  | Description                  |
| -------------------------- | ---------------------------- |
| `@MultiORMEntity(name)`    | Dual TypeORM/MikroORM entity |
| `@MultiORMColumn(opts)`    | Dual column declaration      |
| `@MultiORMManyToOne(...)`  | Many-to-one relation         |
| `@MultiORMOneToMany(...)`  | One-to-many relation         |
| `@MultiORMManyToMany(...)` | Many-to-many relation        |

## Activity Log Decorators

```typescript
@ActivityLog('TASK_UPDATED')
async update(id: string, input: UpdateTaskDTO) {
  // Changes are automatically logged
}
```

## Caching Decorators

```typescript
@CacheKey('employees')
@CacheTTL(300)
async findAll() {
  // Result cached for 5 minutes
}
```

## Swagger Decorators

```typescript
@ApiOperation({ summary: 'Get all employees' })
@ApiResponse({ status: 200, description: 'Success' })
@ApiPaginationParams()
```

## Related Pages

- [Guard & Interceptor Chain](./guard-interceptor-chain) — guards
- [Multi-ORM Deep Dive](../advanced/multi-orm-deep-dive) — ORM decorators
- [Plugin API Reference](../plugins/plugin-api-reference) — plugin decorators
