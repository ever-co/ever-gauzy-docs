---
sidebar_position: 8
---

# Data Seeding Workflow

Seed development and demo data for testing.

## Quick Start

```bash
# Seed with default data
yarn seed:module:default
# or
yarn seed:all
```

## Seed Types

| Command                    | Data Included               |
| -------------------------- | --------------------------- |
| `yarn seed:module:default` | Essential system data       |
| `yarn seed:module:all`     | All modules with demo data  |
| `yarn seed:ever`           | Ever-specific configuration |

## Default Seed Data

| Entity          | Records | Purpose             |
| --------------- | ------- | ------------------- |
| Languages       | 12      | UI language options |
| Countries       | 250+    | Country list        |
| Currencies      | 150+    | Currency list       |
| Roles           | 6       | Default user roles  |
| Permissions     | 100+    | Role permissions    |
| Organization    | 1       | Default org         |
| Super Admin     | 1       | admin@ever.co       |
| Feature Toggles | 20+     | Module flags        |

## Demo Seed Data

With `seed:module:all`:

| Entity    | Records | Purpose           |
| --------- | ------- | ----------------- |
| Employees | 10-20   | Sample workforce  |
| Projects  | 5-10    | Sample projects   |
| Tasks     | 30-50   | Sample tasks      |
| Time Logs | 100+    | Demo time entries |
| Invoices  | 5-10    | Sample invoices   |
| Contacts  | 10-15   | CRM sample data   |

## Custom Seeding

```typescript
export class CustomSeeder implements ISeedService {
  async run(dataSource: DataSource): Promise<void> {
    const org = await this.createOrganization(dataSource);
    await this.createEmployees(dataSource, org);
    await this.createProjects(dataSource, org);
  }
}
```

## Related Pages

- [Database Seeding Guide](../database/database-seeding) — seeding architecture
- [Getting Started Tutorial](../tutorials/getting-started-tutorial) — setup
- [Development Guide](../development/development-guide) — dev setup
