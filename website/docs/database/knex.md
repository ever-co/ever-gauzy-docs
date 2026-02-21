---
sidebar_position: 4
---

# Knex Setup

Knex.js is a **SQL query builder** available in Ever Gauzy for complex queries, raw SQL operations, and database-level migrations that bypass ORM abstraction.

## When to Use Knex

| Use Case                     | ORM vs Knex          |
| ---------------------------- | -------------------- |
| Standard CRUD                | Use TypeORM/MikroORM |
| Complex aggregations         | ✅ Use Knex          |
| Performance-critical queries | ✅ Use Knex          |
| Cross-table reporting        | ✅ Use Knex          |
| Database-level migrations    | ✅ Use Knex          |
| Bulk inserts/updates         | ✅ Use Knex          |

## Configuration

Knex shares the same database connection as the active ORM:

```typescript
import { Knex } from "knex";

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          client: configService.get("DB_TYPE"), // pg | mysql2 | better-sqlite3
          connection: {
            host: configService.get("DB_HOST"),
            port: configService.get("DB_PORT"),
            database: configService.get("DB_NAME"),
            user: configService.get("DB_USER"),
            password: configService.get("DB_PASS"),
          },
          pool: { min: 2, max: 10 },
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
```

## Usage

### Injecting Knex

```typescript
@Injectable()
export class ReportService {
  constructor(@InjectConnection() private readonly knex: Knex) {}
}
```

### Select Queries

```typescript
// Simple select
const employees = await this.knex("employee")
  .select("id", "first_name", "last_name")
  .where("is_active", true)
  .andWhere("tenant_id", tenantId)
  .orderBy("created_at", "desc")
  .limit(20)
  .offset(0);
```

### Aggregation Queries

```typescript
// Time tracking summary
const summary = await this.knex("time_log")
  .select("employee_id")
  .sum("duration as totalDuration")
  .count("* as logCount")
  .avg("duration as avgDuration")
  .where("tenant_id", tenantId)
  .andWhere("started_at", ">=", startDate)
  .andWhere("started_at", "<=", endDate)
  .groupBy("employee_id");
```

### Join Queries

```typescript
const result = await this.knex("time_log as tl")
  .select(
    "tl.employee_id",
    "e.first_name",
    "e.last_name",
    this.knex.raw("SUM(tl.duration) as total_hours"),
  )
  .join("employee as e", "e.id", "tl.employee_id")
  .where("tl.tenant_id", tenantId)
  .groupBy("tl.employee_id", "e.first_name", "e.last_name")
  .orderBy("total_hours", "desc");
```

### Insert / Update / Delete

```typescript
// Insert
await this.knex("audit_log").insert({
  id: uuid(),
  entity_type: "Employee",
  action: "CREATE",
  tenant_id: tenantId,
});

// Update
await this.knex("employee")
  .where({ id: employeeId, tenant_id: tenantId })
  .update({ is_active: false });

// Delete
await this.knex("temp_data")
  .where("tenant_id", tenantId)
  .andWhere("created_at", "<", cutoffDate)
  .del();
```

### Raw Queries

```typescript
const result = await this.knex.raw(
  `
  SELECT
    e.id,
    e.first_name,
    COALESCE(SUM(tl.duration), 0) as total_tracked
  FROM employee e
  LEFT JOIN time_log tl ON tl.employee_id = e.id
  WHERE e.tenant_id = ?
  GROUP BY e.id, e.first_name
  ORDER BY total_tracked DESC
`,
  [tenantId],
);
```

### Transactions

```typescript
await this.knex.transaction(async (trx) => {
  const invoice = await trx('invoice').insert({ ... }).returning('*');
  await trx('invoice_item').insert([
    { invoice_id: invoice[0].id, ... },
    { invoice_id: invoice[0].id, ... },
  ]);
});
```

## Important Reminders

:::warning
**Always include `tenant_id` filtering** in Knex queries. Unlike ORM services that extend `TenantAwareCrudService`, Knex queries have no automatic tenant scoping.
:::

```typescript
// ✅ CORRECT - includes tenant_id
const data = await this.knex("employee")
  .where("tenant_id", tenantId)
  .select("*");

// ❌ WRONG - missing tenant_id (returns ALL tenants' data!)
const data = await this.knex("employee").select("*");
```

## Related Pages

- [Database Overview](./database-overview) — general database info
- [TypeORM Setup](./typeorm) — primary ORM
- [MikroORM Setup](./mikroorm) — alternative ORM
- [Tenant Filtering](./tenant-filtering) — tenant isolation rules
