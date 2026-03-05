---
sidebar_position: 22
---

# Database Migration Guide

Create, run, and manage database migrations for schema changes.

## Overview

Gauzy uses TypeORM migrations for database schema management. Migrations ensure consistent schema changes across all environments.

## Migration Workflow

```mermaid
graph LR
    A[Write Code] --> B[Generate Migration]
    B --> C[Review SQL]
    C --> D[Test Locally]
    D --> E[Commit]
    E --> F[Auto-run on Deploy]
```

## Generating a Migration

After modifying entities, generate a migration:

```bash
# Generate migration from entity changes
yarn typeorm migration:generate -n MyMigrationName

# Create an empty migration
yarn typeorm migration:create -n MyMigrationName
```

## Migration File Structure

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskPriorityColumn1706000000000 implements MigrationInterface {
  name = "AddTaskPriorityColumn1706000000000";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task" 
      ADD COLUMN "priority" varchar(50)
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task" 
      DROP COLUMN "priority"
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

## Multi-ORM Consideration

When using MikroORM, migrations are handled differently:

```bash
# MikroORM migration generation
yarn mikro-orm migration:create

# MikroORM migration run
yarn mikro-orm migration:up
```

## Best Practices

| Practice                     | Description                   |
| ---------------------------- | ----------------------------- |
| Always include `down()`      | Enable rollback capability    |
| Test on fresh database       | Verify migration from scratch |
| Never modify existing        | Create new migration instead  |
| Use raw SQL for data changes | Avoid using entity classes    |
| Backup before running        | Always backup production DB   |

## Related Pages

- [Database Backup & Recovery](../devops/database-backup) — backup strategies
- [Multi-ORM Deep Dive](../advanced/multi-orm-deep-dive) — ORM patterns
- [Entity Reference](../database/entity-reference/overview) — entity schemas
