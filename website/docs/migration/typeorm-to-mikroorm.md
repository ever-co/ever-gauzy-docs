---
sidebar_position: 3
---

# TypeORM to MikroORM Migration

Guide for migrating custom entities from TypeORM-only to dual MultiORM support.

## Overview

Ever Gauzy supports both TypeORM and MikroORM simultaneously via Multi-ORM decorators. When creating or modifying entities, use the `@MultiORM*` decorators to ensure compatibility with both ORMs.

## Decorator Mapping

| TypeORM Decorator | MultiORM Equivalent     |
| ----------------- | ----------------------- |
| `@Entity()`       | `@MultiORMEntity()`     |
| `@Column()`       | `@MultiORMColumn()`     |
| `@ManyToOne()`    | `@MultiORMManyToOne()`  |
| `@OneToMany()`    | `@MultiORMOneToMany()`  |
| `@ManyToMany()`   | `@MultiORMManyToMany()` |
| `@JoinTable()`    | `@MultiORMJoinTable()`  |
| `@Index()`        | `@MultiORMIndex()`      |

## Example Migration

### Before (TypeORM only)

```typescript
import { Entity, Column, ManyToOne } from "typeorm";

@Entity("my_entity")
export class MyEntity extends TenantOrganizationBaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, { nullable: true })
  user?: User;
}
```

### After (MultiORM)

```typescript
import { MultiORMEntity, MultiORMColumn, MultiORMManyToOne } from "@gauzy/core";

@MultiORMEntity("my_entity")
export class MyEntity extends TenantOrganizationBaseEntity {
  @MultiORMColumn()
  name: string;

  @MultiORMManyToOne(() => User, { nullable: true })
  user?: User;
}
```

## Repository Migration

### Before

```typescript
import { Repository } from "typeorm";

@Injectable()
export class MyService {
  constructor(
    @InjectRepository(MyEntity)
    private repository: Repository<MyEntity>,
  ) {}
}
```

### After

```typescript
import { TypeOrmMyEntityRepository } from "./repository/type-orm-my-entity.repository";
import { MikroOrmMyEntityRepository } from "./repository/mikro-orm-my-entity.repository";

@Injectable()
export class MyService extends TenantAwareCrudService<MyEntity> {
  constructor(
    typeOrmRepo: TypeOrmMyEntityRepository,
    mikroOrmRepo: MikroOrmMyEntityRepository,
  ) {
    super(typeOrmRepo, mikroOrmRepo);
  }
}
```

## Common Pitfalls

1. **MikroORM stricter validation** — MikroORM 6.x validates metadata more strictly
2. **Relation decorators** — use conditional decorators for ORM-specific relations
3. **Entity discovery** — ensure entities are registered in both ORMs

## Related Pages

- [Multi-ORM Deep Dive](../advanced/multi-orm-deep-dive) — ORM architecture
- [Entity Inheritance](../architecture/entity-inheritance) — base entities
- [Custom Entity Fields](../advanced/custom-entity-fields) — custom fields
