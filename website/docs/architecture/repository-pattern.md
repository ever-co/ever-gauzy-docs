---
sidebar_position: 44
---

# Repository Pattern

Data access layer architecture in Gauzy.

## Multi-ORM Repository

Gauzy uses a repository adapter pattern to support both TypeORM and MikroORM:

```typescript
// TypeORM repository
@Injectable()
export class TypeOrmEmployeeRepository extends Repository<Employee> {
  constructor(dataSource: DataSource) {
    super(Employee, dataSource.createEntityManager());
  }
}

// MikroORM repository
@Injectable()
export class MikroOrmEmployeeRepository extends BaseEntityRepository<Employee> {
  constructor(em: EntityManager) {
    super(em, Employee);
  }
}
```

## Repository Registration

```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    MikroOrmModule.forFeature([Employee]),
  ],
  providers: [TypeOrmEmployeeRepository, MikroOrmEmployeeRepository],
})
export class EmployeeModule {}
```

## Usage in Services

```typescript
@Injectable()
export class EmployeeService extends TenantAwareCrudService<Employee> {
  constructor(
    readonly typeOrmRepo: TypeOrmEmployeeRepository,
    readonly mikroOrmRepo: MikroOrmEmployeeRepository,
  ) {
    super(typeOrmRepo, mikroOrmRepo);
  }
}
```

## Custom Repository Methods

```typescript
@Injectable()
export class TypeOrmEmployeeRepository extends Repository<Employee> {
  async findActiveByOrganization(orgId: string): Promise<Employee[]> {
    return this.createQueryBuilder("e")
      .leftJoinAndSelect("e.user", "u")
      .where("e.organizationId = :orgId", { orgId })
      .andWhere("e.isActive = true")
      .orderBy("u.firstName", "ASC")
      .getMany();
  }
}
```

## Related Pages

- [Service Layer Patterns](./service-layer-patterns) — services
- [TypeORM Migrations](../database/typeorm-migrations) — migrations
- [Multi-ORM Architecture](./multi-orm-architecture) — ORM support
