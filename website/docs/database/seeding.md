---
sidebar_position: 6
---

# Database Seeding

Ever Gauzy includes database seeders to populate demo data, default configurations, and test fixtures.

## Seed Commands

```bash
# Seed all demo data
yarn seed:all

# Seed specific modules
yarn seed:module:all

# Seed with specific database
DB_TYPE=postgres yarn seed:all
```

## Seed Data Categories

### Default Seed Data

Always required for the platform to function:

| Data              | Description                                           |
| ----------------- | ----------------------------------------------------- |
| **Roles**         | Default role set (SUPER_ADMIN, ADMIN, EMPLOYEE, etc.) |
| **Permissions**   | Default permission-to-role mappings                   |
| **Languages**     | Supported languages (en, es, fr, ru, bg, etc.)        |
| **Countries**     | Country list for address/region selection             |
| **Currencies**    | Currency definitions (USD, EUR, GBP, etc.)            |
| **Feature Flags** | Default feature flag states                           |

### Demo Seed Data

Populated in demo/development environments:

| Data                  | Description                             |
| --------------------- | --------------------------------------- |
| **Demo Tenant**       | Default tenant ("Ever Technologies")    |
| **Demo Users**        | Admin, Employee, and Candidate accounts |
| **Demo Organization** | Sample organization with settings       |
| **Demo Employees**    | Sample employee records                 |
| **Demo Projects**     | Sample projects with tasks              |
| **Demo Time Logs**    | Sample time tracking data               |
| **Demo Invoices**     | Sample invoices and estimates           |
| **Demo Expenses**     | Sample expense records                  |

## Demo Credentials

The demo seed creates the following accounts:

| Email               | Password | Role        |
| ------------------- | -------- | ----------- |
| `admin@ever.co`     | `admin`  | SUPER_ADMIN |
| `employee@ever.co`  | `123456` | EMPLOYEE    |
| `candidate@ever.co` | `123456` | CANDIDATE   |

:::warning
These are demo credentials. Change them immediately in production deployments.
:::

## Seed Architecture

Seeders are located in `packages/core/src/lib/`:

```
packages/core/src/lib/
├── role/seed/                 # Role seeds
├── role-permission/seed/      # Permission seeds
├── tenant/seed/               # Tenant seeds
├── user/seed/                 # User seeds
├── employee/seed/             # Employee seeds
├── organization/seed/         # Organization seeds
├── time-tracking/seed/        # Time tracking seeds
├── tasks/seed/                # Task seeds
└── ...
```

### Seed Service Pattern

Each seeder follows a common pattern:

```typescript
@Injectable()
export class EmployeeSeedService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly userService: UserService,
  ) {}

  async run(tenant: ITenant, organization: IOrganization): Promise<void> {
    const employees = [
      { firstName: 'John', lastName: 'Doe', ... },
      { firstName: 'Jane', lastName: 'Smith', ... },
    ];

    for (const employee of employees) {
      // Create user
      const user = await this.userService.create({
        email: `${employee.firstName.toLowerCase()}@ever.co`,
        ...employee,
      });

      // Create employee record
      await this.employeeService.create({
        userId: user.id,
        tenantId: tenant.id,
        organizationId: organization.id,
        ...employee,
      });
    }
  }
}
```

## Configuration

### Enable/Disable Seeding

```bash
# Seed demo data on startup (development only)
DEMO=true

# Clean database before seeding
DB_RESET=false
```

### Seeding on Application Start

When `DEMO=true`, the application seeds demo data during bootstrap:

```typescript
// In bootstrap module
if (configService.get("DEMO")) {
  await seedService.executeDemoSeed();
}
```

## Custom Seeds

To create custom seed data:

1. Create a seed service in your module:

```typescript
@Injectable()
export class CustomSeedService {
  async run(tenant: ITenant, org: IOrganization): Promise<void> {
    // Your custom seed logic
  }
}
```

2. Register it in the seed orchestrator:

```typescript
@Module({
  providers: [CustomSeedService],
})
export class SeedModule {}
```

## Related Pages

- [Database Overview](./database-overview) — general database info
- [Demo & Testing](../getting-started/demo-and-testing) — demo environment setup
- [Migrations](./migrations) — schema management
