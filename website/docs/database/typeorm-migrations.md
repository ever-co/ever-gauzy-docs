---
sidebar_position: 2
---

# TypeORM Migrations

Create and manage database schema changes with TypeORM migrations.

## Overview

Migrations track schema changes in a version-controlled way, allowing safe database evolution.

## Creating a Migration

### Auto-Generate from Entity Changes

```bash
yarn typeorm migration:generate -n AddEmployeePhoneColumn
```

This compares current entities against the database and generates SQL.

### Manual Migration

```bash
yarn typeorm migration:create -n CustomMigration
```

## Migration File Structure

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeePhoneColumn1709635260000 implements MigrationInterface {
  name = "AddEmployeePhoneColumn1709635260000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "employee"
      ADD COLUMN "phoneNumber" varchar(20)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "employee"
      DROP COLUMN "phoneNumber"
    `);
  }
}
```

## Running Migrations

```bash
# Run pending migrations
yarn typeorm migration:run

# Revert last migration
yarn typeorm migration:revert

# Show migration status
yarn typeorm migration:show
```

## Best Practices

| Practice                | Description                   |
| ----------------------- | ----------------------------- |
| Always write `down()`   | Enable rollback               |
| Test on staging first   | Verify before production      |
| Backup before migration | Safety net                    |
| Use transactions        | Atomic changes                |
| No data loss            | Add columns as nullable first |
| Sequential naming       | Timestamps in filenames       |

## Migration Directory

```
packages/core/src/database/migrations/
├── 1700000000001-InitialSchema.ts
├── 1700000000002-AddTimeTracking.ts
└── 1700000000003-AddCRMTables.ts
```

## Related Pages

- [Database Schema](./schema-overview) — schema overview
- [MikroORM Migrations](./mikroorm-migrations) — MikroORM alternative
- [SQLite to PostgreSQL](../migration/sqlite-to-postgresql) — DB migration
