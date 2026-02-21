---
sidebar_position: 1
---

# Database Overview

Ever Gauzy supports multiple databases and ORMs, providing flexibility for different deployment scenarios.

## Supported Databases

| Database            |   Production   | Development | Default |
| ------------------- | :------------: | :---------: | :-----: |
| **PostgreSQL**      | ✅ Recommended |     ✅      |   ❌    |
| **MySQL / MariaDB** |       ✅       |     ✅      |   ❌    |
| **SQLite**          |  ⚠️ Demo only  |     ✅      |   ✅    |
| **better-sqlite3**  |  ⚠️ Demo only  |     ✅      |   ❌    |

## Supported ORMs

| ORM          | Role            | Configuration      |
| ------------ | --------------- | ------------------ |
| **TypeORM**  | Primary ORM     | `DB_ORM=typeorm`   |
| **MikroORM** | Alternative ORM | `DB_ORM=mikro-orm` |
| **Knex**     | Query builder   | Always available   |

## Database Configuration

### Core Environment Variables

```bash
# Database type
DB_TYPE=postgres          # postgres | mysql | sqlite | better-sqlite3

# ORM selection
DB_ORM=typeorm            # typeorm | mikro-orm

# Connection settings
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gauzy
DB_USER=postgres
DB_PASS=your-password
DB_SSL_MODE=false

# Connection pool
DB_POOL_SIZE=40
DB_CONNECTION_TIMEOUT=5000
DB_IDLE_TIMEOUT=10000

# Logging
DB_LOGGING=false          # true | false | query | error | schema
```

### SQLite Configuration

For development with SQLite:

```bash
DB_TYPE=sqlite
DB_NAME=gauzy.sqlite3
```

SQLite requires no host, port, user, or password settings.

### PostgreSQL Configuration

```bash
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gauzy
DB_USER=postgres
DB_PASS=root
DB_SSL_MODE=false
```

### MySQL Configuration

```bash
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gauzy
DB_USER=root
DB_PASS=root
```

## Database Schema

The platform has approximately **200+ database tables** organized into domains:

### Core Tables

| Table             | Entity         | Description                  |
| ----------------- | -------------- | ---------------------------- |
| `tenant`          | Tenant         | Multi-tenant root            |
| `user`            | User           | User accounts                |
| `role`            | Role           | Role definitions             |
| `role_permission` | RolePermission | Role-permission mappings     |
| `organization`    | Organization   | Organizations within tenants |

### HRM Tables

| Table              | Entity         | Description               |
| ------------------ | -------------- | ------------------------- |
| `employee`         | Employee       | Employee profiles         |
| `time_log`         | TimeLog        | Time tracking entries     |
| `timesheet`        | Timesheet      | Weekly/monthly timesheets |
| `time_slot`        | TimeSlot       | 10-minute activity slots  |
| `screenshot`       | Screenshot     | Activity screenshots      |
| `activity`         | Activity       | App/URL activity tracking |
| `time_off_request` | TimeOffRequest | Leave requests            |
| `time_off_policy`  | TimeOffPolicy  | Leave policies            |

### PM Tables

| Table                         | Entity              | Description          |
| ----------------------------- | ------------------- | -------------------- |
| `organization_project`        | OrganizationProject | Projects             |
| `task`                        | Task                | Task management      |
| `task_status`                 | TaskStatus          | Custom task statuses |
| `task_priority`               | TaskPriority        | Custom priorities    |
| `organization_sprint`         | OrganizationSprint  | Sprint management    |
| `organization_project_module` | ProjectModule       | Project modules      |

### ERP Tables

| Table          | Entity      | Description            |
| -------------- | ----------- | ---------------------- |
| `invoice`      | Invoice     | Invoices and estimates |
| `invoice_item` | InvoiceItem | Invoice line items     |
| `expense`      | Expense     | Expense records        |
| `payment`      | Payment     | Payment records        |
| `income`       | Income      | Income records         |

### CRM / ATS Tables

| Table                  | Entity              | Description        |
| ---------------------- | ------------------- | ------------------ |
| `organization_contact` | OrganizationContact | Contacts/leads     |
| `pipeline`             | Pipeline            | Sales pipelines    |
| `pipeline_stage`       | PipelineStage       | Pipeline stages    |
| `candidate`            | Candidate           | Job candidates     |
| `candidate_interview`  | CandidateInterview  | Interview schedule |

### Integration Tables

| Table                        | Entity                   | Description                 |
| ---------------------------- | ------------------------ | --------------------------- |
| `integration`                | Integration              | Active integrations         |
| `integration_type`           | IntegrationType          | Available integration types |
| `integration_setting`        | IntegrationSetting       | Integration configs         |
| `integration_entity_setting` | IntegrationEntitySetting | Entity sync settings        |

## Entity Relationships

```
Tenant ──┬── Organization ──┬── Employee ──── TimeLog
         │                  ├── Project ──── Task
         │                  ├── Contact
         │                  ├── Invoice
         │                  └── Expense
         │
         ├── User ──── Role ──── RolePermission
         │
         └── Integration
```

## Database Initialization

### Auto-Migration

TypeORM can automatically synchronize the schema:

```bash
DB_SYNCHRONIZE=true     # ⚠️ Development only - drops/recreates tables
```

:::warning
Never enable `DB_SYNCHRONIZE=true` in production. Use migrations instead.
:::

### Seeding

The platform includes seed data for demo/development:

```bash
yarn seed:all           # Seed all demo data
yarn seed:module:all    # Seed module-specific data
```

See [Database Seeding](./seeding) for details.

## Related Pages

- [TypeORM Setup](./typeorm) — TypeORM configuration
- [MikroORM Setup](./mikroorm) — MikroORM configuration
- [Knex Setup](./knex) — Knex query builder
- [Migrations](./migrations) — schema migration management
- [Seeding](./seeding) — demo and test data
- [Multi-ORM Entities](./multi-orm-entities) — entity definition patterns
- [Tenant Filtering](./tenant-filtering) — tenant-scoped data access
