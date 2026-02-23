---
sidebar_position: 5
---

# Migrations

Database migrations manage schema changes across environments in a controlled, versioned manner.

## Overview

| ORM          | Migration System    | Directory                                         |
| ------------ | ------------------- | ------------------------------------------------- |
| **TypeORM**  | TypeORM migrations  | `packages/core/src/lib/database/migrations/`      |
| **MikroORM** | MikroORM migrations | `packages/core/src/lib/database/migrations/`      |
| **Knex**     | Knex migrations     | `packages/core/src/lib/database/knex-migrations/` |

## TypeORM Migrations

### Generate a Migration

```bash
# Auto-generate from entity changes
yarn typeorm migration:generate -n AddEmployeeSkillsColumn
```

TypeORM compares the current entity definitions with the database schema and generates the necessary SQL.

### Create an Empty Migration

```bash
# Create empty migration shell
yarn typeorm migration:create -n CustomMigration
```

### Migration File Format

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeeSkillsColumn1704067200000
  implements MigrationInterface
{
  name = "AddEmployeeSkillsColumn1704067200000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "employee"
      ADD COLUMN "skills" text
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "employee"
      DROP COLUMN "skills"
    `);
  }
}
```

### Running Migrations

```bash
# Run all pending migrations
yarn typeorm migration:run

# Revert the last migration
yarn typeorm migration:revert

# Show migration status
yarn typeorm migration:show
```

### Database-Specific Migrations

Migrations are organized by database type:

```
packages/core/src/lib/database/migrations/
├── postgres/           # PostgreSQL-specific migrations
├── mysql/              # MySQL-specific migrations
└── sqlite/             # SQLite-specific migrations
```

## MikroORM Migrations

### Generate a Migration

```bash
yarn mikro-orm migration:create --initial     # First migration
yarn mikro-orm migration:create               # Subsequent migrations
```

### Running Migrations

```bash
yarn mikro-orm migration:up                   # Run pending
yarn mikro-orm migration:down                 # Revert last
yarn mikro-orm migration:list                 # Show status
yarn mikro-orm migration:fresh                # Drop all & re-run (dev only)
```

## Knex Migrations

### Creating a Knex Migration

```bash
yarn knex migrate:make migration_name
```

### Knex Migration Format

```typescript
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("custom_table", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("name").notNullable();
    table.uuid("tenant_id").notNullable().references("tenant.id");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("custom_table");
}
```

### Running Knex Migrations

```bash
yarn knex migrate:latest          # Run all pending
yarn knex migrate:rollback        # Rollback last batch
yarn knex migrate:status          # Show status
```

## Migration Best Practices

### DO

- ✅ Always write both `up` and `down` methods
- ✅ Test migrations against all supported databases (PostgreSQL, MySQL, SQLite)
- ✅ Include `tenantId` columns and foreign keys for new tables
- ✅ Use transactions for data migrations
- ✅ Name migrations descriptively with timestamps

### DON'T

- ❌ Use `DB_SYNCHRONIZE=true` in production
- ❌ Modify existing migrations (create new ones instead)
- ❌ Delete migration files from version control
- ❌ Run production migrations without backup

### Production Checklist

1. ✅ Backup the database
2. ✅ Run migrations in staging first
3. ✅ Verify `migration:show` status
4. ✅ Monitor migration execution time
5. ✅ Test rollback procedure

## Configuration

```bash
# Auto-synchronize (development only!)
DB_SYNCHRONIZE=false

# Migration logging
DB_LOGGING=schema,migration
```

## Related Pages

- [Database Overview](./database-overview) — general database info
- [Seeding](./seeding) — demo data
- [TypeORM Setup](./typeorm) — TypeORM configuration
