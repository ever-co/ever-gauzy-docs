---
sidebar_position: 2
---

# TypeORM Setup

TypeORM is the **primary ORM** in Ever Gauzy, providing the Active Record and Data Mapper patterns for database operations.

## Configuration

### Enabling TypeORM

```bash
# .env
DB_ORM=typeorm
```

### Connection Options

TypeORM is configured through the `DatabaseModule` in `packages/core/src/lib/database/`:

```typescript
TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: configService.get("DB_TYPE"), // postgres | mysql | sqlite
    host: configService.get("DB_HOST"),
    port: configService.get("DB_PORT"),
    database: configService.get("DB_NAME"),
    username: configService.get("DB_USER"),
    password: configService.get("DB_PASS"),
    ssl: configService.get("DB_SSL_MODE"),
    synchronize: false, // Always false in production
    logging: configService.get("DB_LOGGING"),
    entities: [...coreEntities, ...pluginEntities],
    migrations: ["dist/migrations/*.js"],
  }),
});
```

### Connection Pool

```bash
DB_POOL_SIZE=40                  # Maximum connections in pool
DB_CONNECTION_TIMEOUT=5000       # Connection timeout (ms)
DB_IDLE_TIMEOUT=10000            # Idle connection timeout (ms)
```

## Entity Registration

TypeORM entities are registered via `TypeOrmModule.forFeature()`:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Employee, EmployeeStatistics])],
  providers: [EmployeeService],
})
export class EmployeeModule {}
```

## Repository Pattern

### Injecting Repositories

```typescript
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ["user", "organization"],
      where: { isActive: true },
    });
  }

  async findOne(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async create(input: DeepPartial<Employee>): Promise<Employee> {
    const entity = this.employeeRepository.create(input);
    return this.employeeRepository.save(entity);
  }
}
```

### Custom Repositories

Many services extend `TypeOrmBaseEntityRepository`:

```typescript
@Injectable()
export class TypeOrmEmployeeRepository extends TypeOrmBaseEntityRepository<Employee> {
  constructor(dataSource: DataSource) {
    super(Employee, dataSource);
  }

  async findByUserId(userId: string): Promise<Employee | null> {
    return this.findOne({ where: { userId } });
  }
}
```

## Query Builder

For complex queries, use the QueryBuilder:

```typescript
const result = await this.employeeRepository
  .createQueryBuilder("employee")
  .leftJoinAndSelect("employee.user", "user")
  .leftJoinAndSelect("employee.organization", "org")
  .where("employee.tenantId = :tenantId", { tenantId })
  .andWhere("employee.isActive = :isActive", { isActive: true })
  .orderBy("employee.createdAt", "DESC")
  .take(20)
  .skip(0)
  .getManyAndCount();
```

:::warning
When using `createQueryBuilder`, you **must manually include** `tenantId` filtering. The automatic tenant scoping only applies to `Repository.find*` methods when using `TenantAwareCrudService`.
:::

## Relations

TypeORM supports eager and lazy loading:

```typescript
// Eager loading (always loaded)
@ManyToOne(() => User, { eager: true })
user: IUser;

// Lazy loading (loaded on access)
@ManyToOne(() => Organization, { lazy: true })
organization: Promise<IOrganization>;

// Manual loading via relations option
const employee = await repo.findOne({
  where: { id },
  relations: ['user', 'organization', 'tags'],
});
```

## TypeORM Decorators (via Multi-ORM)

In Gauzy, you should use the **Multi-ORM decorators** instead of direct TypeORM decorators:

| Use This                | Not This        |
| ----------------------- | --------------- |
| `@MultiORMEntity()`     | `@Entity()`     |
| `@MultiORMColumn()`     | `@Column()`     |
| `@MultiORMManyToOne()`  | `@ManyToOne()`  |
| `@MultiORMOneToMany()`  | `@OneToMany()`  |
| `@MultiORMManyToMany()` | `@ManyToMany()` |

See [Multi-ORM Architecture](../architecture/multi-orm-architecture) for details.

## Related Pages

- [Database Overview](./database-overview) — general database info
- [MikroORM Setup](./mikroorm) — alternative ORM
- [Migrations](./migrations) — schema migrations
- [Multi-ORM Entities](./multi-orm-entities) — entity patterns
