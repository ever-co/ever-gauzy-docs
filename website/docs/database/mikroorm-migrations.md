---
sidebar_position: 10
---

# MikroORM Migrations

Create and manage database migrations with MikroORM.

## Overview

Gauzy supports MikroORM as an alternative ORM. Set `DB_ORM=mikroorm` to use it.

## Creating Migrations

```bash
# Auto-generate migration from entity changes
npx mikro-orm migration:create

# Create blank migration
npx mikro-orm migration:create --blank
```

## Migration File

```typescript
import { Migration } from "@mikro-orm/migrations";

export class Migration20250305120000 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE "employee"
      ADD COLUMN "phone_number" varchar(20)
    `);
  }

  async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE "employee"
      DROP COLUMN "phone_number"
    `);
  }
}
```

## Running Migrations

```bash
# Run pending migrations
npx mikro-orm migration:up

# Rollback last migration
npx mikro-orm migration:down

# Check pending migrations
npx mikro-orm migration:pending

# Fresh migration (drop all & re-run)
npx mikro-orm migration:fresh
```

## Configuration

```typescript
// mikro-orm.config.ts
export default {
  migrations: {
    tableName: "mikro_orm_migrations",
    path: "./src/database/migrations",
    pattern: /^[\w-]+\d+\.ts$/,
    transactional: true,
  },
};
```

## Multi-ORM Compatibility

When using Multi-ORM entities, migrations must be created for each ORM independently. Use the `DB_ORM` environment variable to switch between them.

## Related Pages

- [TypeORM Migrations](./typeorm-migrations) — TypeORM migrations
- [TypeORM to MikroORM Migration](../migration/typeorm-to-mikroorm) — ORM migration
- [Multi-ORM Architecture](../architecture/multi-orm-architecture) — ORM support
