---
sidebar_position: 1
---

# Multi-ORM Deep Dive

Writing queries that work across TypeORM and MikroORM in Ever Gauzy.

## Why Multi-ORM?

Gauzy supports both TypeORM and MikroORM through the `MultiORM` decorator system. This allows:

- **TypeORM** — mature, widely used, great for PostgreSQL
- **MikroORM** — modern, identity map, unit-of-work pattern

The active ORM is determined by the `DB_ORM` environment variable.

## Entity Decorators

### MultiORMEntity

```typescript
@MultiORMEntity("employee", {
  mikroOrmRepository: () => MikroOrmEmployeeRepository,
})
export class Employee extends TenantOrganizationBaseEntity {
  @MultiORMColumn()
  name: string;

  @MultiORMColumn({ nullable: true })
  description?: string;
}
```

### Relation Decorators

```typescript
// Many-to-One
@MultiORMManyToOne(() => Organization, { nullable: true })
@JoinColumn()
organization?: Organization;

// One-to-Many
@MultiORMOneToMany(() => Task, (task) => task.creator)
createdTasks?: Task[];

// Many-to-Many
@MultiORMManyToMany(() => Tag, (tag) => tag.employees)
tags?: Tag[];
```

## Query Patterns

### Using CrudService

Most queries go through `TenantAwareCrudService`:

```typescript
// Find all with filters
const result = await this.service.findAll({
  where: { status: "active" },
  relations: ["user", "teams"],
  order: { createdAt: "DESC" },
});

// Find one by ID
const employee = await this.service.findOneByIdString(id, {
  relations: ["user"],
});
```

### Repository Pattern

For complex queries, inject repositories:

```typescript
@Injectable()
export class MyService {
  constructor(
    @InjectRepository(MyEntity)
    private readonly repository: Repository<MyEntity>,
  ) {}
}
```

## Conditional ORM Logic

When you need ORM-specific behavior:

```typescript
if (isTypeORM()) {
  // TypeORM-specific query builder
  const qb = this.repository.createQueryBuilder("entity");
} else {
  // MikroORM-specific entity manager
  const em = this.entityManager;
}
```

## Related Pages

- [Core Entities](../database/entity-reference/core-entities) — entity definitions
- [Architecture Overview](../architecture/overview) — system architecture
