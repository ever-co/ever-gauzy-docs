---
sidebar_position: 6
---

# Custom Entity Fields

Extend entities with custom fields without modifying core code.

## Overview

Custom entity fields allow tenants to add additional metadata fields to standard entities (Employee, Organization, etc.) without modifying the database schema directly.

## How It Works

1. Custom field definitions are stored as configuration
2. Field values are stored in a JSON column or related table
3. Custom fields are returned alongside standard entity data

## Supported Field Types

| Type     | Description            |
| -------- | ---------------------- |
| Text     | Single-line text input |
| TextArea | Multi-line text        |
| Number   | Numeric value          |
| Boolean  | True/false toggle      |
| Date     | Date picker            |
| Select   | Dropdown selection     |

## Implementation

Custom fields use the `CustomEntityFields` decorator system:

```typescript
@MultiORMEntity("employee")
export class Employee extends TenantOrganizationBaseEntity {
  // Standard fields...

  @MultiORMColumn({ type: "json", nullable: true })
  customFields?: Record<string, any>;
}
```

## Multi-ORM Considerations

When using custom entity fields with MikroORM, ensure the `MultiORM` decorators are correctly applied. MikroORM 6.x has stricter metadata validation — see the Known Issues section.

### Known Issue

MikroORM 6.x may throw errors with custom entity decorators on TypeORM-only entities. The fix involves conditional decorator application based on `DB_ORM`:

```typescript
// Conditionally apply based on active ORM
if (process.env.DB_ORM === "mikro-orm") {
  // Apply MikroORM decorator
} else {
  // Apply TypeORM decorator
}
```

## Related Pages

- [Multi-ORM Deep Dive](./multi-orm-deep-dive) — ORM patterns
- [Entity Reference](../database/entity-reference/overview) — all entities
