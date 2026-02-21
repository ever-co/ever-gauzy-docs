---
sidebar_position: 3
---

# MikroORM Setup

MikroORM is the **alternative ORM** in Ever Gauzy, providing stricter metadata validation, identity maps, and the Unit of Work pattern.

## Configuration

### Enabling MikroORM

```bash
# .env
DB_ORM=mikro-orm
```

### Connection Options

MikroORM uses a similar database configuration to TypeORM:

```typescript
MikroOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: configService.get("DB_TYPE"),
    host: configService.get("DB_HOST"),
    port: configService.get("DB_PORT"),
    dbName: configService.get("DB_NAME"),
    user: configService.get("DB_USER"),
    password: configService.get("DB_PASS"),
    entities: [...coreEntities, ...pluginEntities],
    discovery: { disableDynamicFileAccess: true },
    allowGlobalContext: true,
  }),
});
```

## Key Differences from TypeORM

| Feature             | TypeORM                     | MikroORM                 |
| ------------------- | --------------------------- | ------------------------ |
| **Pattern**         | Active Record + Data Mapper | Unit of Work             |
| **Change Tracking** | Manual save                 | Automatic (Identity Map) |
| **Metadata**        | Decorators at runtime       | Stricter validation      |
| **Flushing**        | Immediate `save()`          | Batch `em.flush()`       |
| **Relations**       | Eager/lazy optional         | Reference wrappers       |
| **Entity Creation** | `repo.create()`             | `em.create()`            |

## Repository Pattern

### MikroORM Repositories

```typescript
@Injectable()
export class MikroOrmEmployeeRepository extends MikroOrmBaseEntityRepository<Employee> {
  constructor(em: EntityManager) {
    super(em, Employee);
  }
}
```

### Using the EntityManager

```typescript
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly mikroOrmRepo: MikroOrmEmployeeRepository,
  ) {}

  async create(input: IEmployeeCreateInput): Promise<Employee> {
    const employee = this.mikroOrmRepo.create(input);
    await this.mikroOrmRepo.persistAndFlush(employee);
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    return this.mikroOrmRepo.find(
      { isActive: true },
      { populate: ["user", "organization"] },
    );
  }
}
```

## Unit of Work

MikroORM tracks entity changes automatically via the EntityManager's Identity Map:

```typescript
// Load entity
const employee = await em.findOne(Employee, id);

// Modify in memory
employee.firstName = "Updated";

// Flush persists all changes in a single transaction
await em.flush();
```

## Stricter Metadata

MikroORM validates entity metadata more strictly than TypeORM:

- All relation properties must have proper type hints
- Unique constraint definitions must reference property names (not column names)
- Entity discovery validates all decorators at startup

:::note
This strictness catches many common bugs at startup rather than at runtime, making MikroORM a good choice for production environments.
:::

## Known Considerations

### Conditional Decorator Application

Since Gauzy supports both ORMs, Multi-ORM decorators are **conditionally applied** based on the active ORM:

```typescript
// Only the MikroORM decorators are applied when DB_ORM=mikro-orm
// Only TypeORM decorators are applied when DB_ORM=typeorm
```

This prevents metadata conflicts. See [Custom Entity Fields Registration Issues](../architecture/multi-orm-architecture) for more details on this pattern.

### PostgreSQL vs SQLite Behavior

MikroORM's metadata validation is stricter with PostgreSQL than SQLite:

- PostgreSQL driver enforces all metadata constraints
- SQLite may silently ignore some constraints
- Always test with PostgreSQL for production deployments

## Related Pages

- [Database Overview](./database-overview) — general database info
- [TypeORM Setup](./typeorm) — primary ORM
- [Multi-ORM Architecture](../architecture/multi-orm-architecture) — Multi-ORM details
- [Multi-ORM Entities](./multi-orm-entities) — entity patterns
