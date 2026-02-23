---
sidebar_position: 7
---

# Multi-ORM Entities

How to define database entities in Ever Gauzy using the shared Multi-ORM decorator system for compatibility with both TypeORM and MikroORM.

## Entity Definition Pattern

All entities use **Multi-ORM decorators** that generate metadata for both TypeORM and MikroORM:

```typescript
import {
  MultiORMEntity,
  MultiORMColumn,
  MultiORMManyToOne,
  MultiORMOneToMany,
  MultiORMManyToMany,
} from "@gauzy/core";
import { TenantOrganizationBaseEntity } from "@gauzy/core";

@MultiORMEntity("employee")
export class Employee extends TenantOrganizationBaseEntity {
  // Simple columns
  @MultiORMColumn()
  firstName: string;

  @MultiORMColumn()
  lastName: string;

  @MultiORMColumn({ nullable: true })
  billRateValue?: number;

  @MultiORMColumn({ nullable: true, type: "varchar" })
  billRateCurrency?: string;

  @MultiORMColumn({ nullable: true })
  startedWorkOn?: Date;

  @MultiORMColumn({ default: true })
  isActive: boolean;

  // Relations
  @MultiORMManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: IUser;

  @MultiORMColumn({ relationId: true })
  userId: string;

  @MultiORMOneToMany(() => TimeLog, (timeLog) => timeLog.employee)
  timeLogs?: ITimeLog[];

  @MultiORMManyToMany(() => OrganizationProject, (project) => project.members)
  projects?: IOrganizationProject[];
}
```

## Base Entity Classes

### Choosing the Right Base Class

| Base Class                     | Fields Provided                                          | Use When                       |
| ------------------------------ | -------------------------------------------------------- | ------------------------------ |
| `BaseEntity`                   | `id`, `createdAt`, `updatedAt`, `isActive`, `isArchived` | Non-tenant entities            |
| `TenantBaseEntity`             | + `tenantId`, `tenant`                                   | Tenant-scoped, no organization |
| `TenantOrganizationBaseEntity` | + `organizationId`, `organization`                       | Most entities                  |

### BaseEntity

```typescript
export abstract class BaseEntity {
  @MultiORMColumn({ primary: true })
  id: string;

  @MultiORMColumn({ createDate: true })
  createdAt: Date;

  @MultiORMColumn({ updateDate: true })
  updatedAt: Date;

  @MultiORMColumn({ nullable: true, default: true })
  isActive?: boolean;

  @MultiORMColumn({ nullable: true, default: false })
  isArchived?: boolean;
}
```

### TenantBaseEntity

```typescript
export abstract class TenantBaseEntity extends BaseEntity {
  @MultiORMManyToOne(() => Tenant, { nullable: false })
  tenant: ITenant;

  @MultiORMColumn({ relationId: true })
  tenantId: string;
}
```

### TenantOrganizationBaseEntity

```typescript
export abstract class TenantOrganizationBaseEntity extends TenantBaseEntity {
  @MultiORMManyToOne(() => Organization, { nullable: true })
  organization?: IOrganization;

  @MultiORMColumn({ relationId: true, nullable: true })
  organizationId?: string;
}
```

## Column Types

### Basic Column Options

```typescript
// String
@MultiORMColumn()
name: string;

// Number
@MultiORMColumn({ type: 'numeric' })
amount: number;

// Boolean with default
@MultiORMColumn({ default: true })
isActive: boolean;

// Nullable
@MultiORMColumn({ nullable: true })
description?: string;

// Date
@MultiORMColumn({ nullable: true })
startDate?: Date;

// Enum
@MultiORMColumn({ type: 'varchar' })
status: StatusEnum;

// JSON/JSONB
@MultiORMColumn({ type: 'jsonb', nullable: true })
metadata?: Record<string, any>;

// Text (long content)
@MultiORMColumn({ type: 'text', nullable: true })
content?: string;
```

## Relation Types

### ManyToOne

```typescript
// Required relation
@MultiORMManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
user: IUser;

@MultiORMColumn({ relationId: true })
userId: string;

// Optional relation
@MultiORMManyToOne(() => OrganizationProject, { nullable: true })
project?: IOrganizationProject;

@MultiORMColumn({ relationId: true, nullable: true })
projectId?: string;
```

### OneToMany

```typescript
@MultiORMOneToMany(() => TimeLog, (timeLog) => timeLog.employee)
timeLogs?: ITimeLog[];
```

### ManyToMany

```typescript
// With join table
@MultiORMManyToMany(() => Tag, (tag) => tag.employees)
@JoinTable({ name: 'tag_employee' })
tags?: ITag[];

// Without join table (inverse side)
@MultiORMManyToMany(() => OrganizationProject, (project) => project.members)
projects?: IOrganizationProject[];
```

### OneToOne

```typescript
@MultiORMOneToOne(() => EmployeeSettings, (settings) => settings.employee)
settings?: IEmployeeSettings;
```

## Contract Interfaces

Every entity has a corresponding interface in `@gauzy/contracts`:

```typescript
// packages/contracts/src/employee.model.ts
export interface IEmployee extends IBasePerTenantAndOrganizationEntityModel {
  firstName: string;
  lastName: string;
  billRateValue?: number;
  billRateCurrency?: string;
  startedWorkOn?: Date;
  isActive: boolean;
  userId: string;
  user?: IUser;
  timeLogs?: ITimeLog[];
  projects?: IOrganizationProject[];
}
```

The entity class **implements** the contract interface:

```typescript
@MultiORMEntity("employee")
export class Employee
  extends TenantOrganizationBaseEntity
  implements IEmployee {
  // ...
}
```

## Best Practices

### DO

- ✅ Always extend a `BaseEntity` subclass
- ✅ Use `MultiORM*` decorators, not raw TypeORM/MikroORM decorators
- ✅ Define a contract interface in `@gauzy/contracts`
- ✅ Include `relationId` columns for all relations
- ✅ Add `nullable: true` for optional fields

### DON'T

- ❌ Import decorators directly from `typeorm` or `@mikro-orm/core`
- ❌ Use TypeORM-specific features like `@Tree()` without Multi-ORM support
- ❌ Create entities without tenant scoping (unless intentionally cross-tenant)
- ❌ Use `enum` column type directly (use `varchar` with TypeScript enum)

## Related Pages

- [Multi-ORM Architecture](../architecture/multi-orm-architecture) — architecture overview
- [TypeORM Setup](./typeorm) — TypeORM specifics
- [MikroORM Setup](./mikroorm) — MikroORM specifics
- [Tenant Filtering](./tenant-filtering) — tenant scoping rules
