---
sidebar_position: 10
---

# Feature Flags

Control feature visibility and availability through feature flags.

## Overview

Feature flags control which modules and features are available for each organization and tenant.

## Default Feature Flags

| Feature                                  | Default | Description        |
| ---------------------------------------- | :-----: | ------------------ |
| `FEATURE_DASHBOARD`                      |   ✅    | Dashboard          |
| `FEATURE_TIME_TRACKING`                  |   ✅    | Time tracking      |
| `FEATURE_ESTIMATE`                       |   ✅    | Estimates          |
| `FEATURE_INVOICE`                        |   ✅    | Invoicing          |
| `FEATURE_INVOICE_RECURRING`              |   ✅    | Recurring invoices |
| `FEATURE_IMPORT_EXPORT`                  |   ✅    | Data import/export |
| `FEATURE_EMPLOYEE_RECURRING_EXPENSE`     |   ✅    | Employee expenses  |
| `FEATURE_ORGANIZATION_RECURRING_EXPENSE` |   ✅    | Org expenses       |
| `FEATURE_EMPLOYEE_EXPENSE`               |   ✅    | Expense tracking   |
| `FEATURE_ORGANIZATION_PROJECT`           |   ✅    | Projects           |
| `FEATURE_ORGANIZATION_TASK`              |   ✅    | Tasks              |
| `FEATURE_ORGANIZATION_CONTACT`           |   ✅    | Contacts CRM       |
| `FEATURE_ORGANIZATION_TEAM`              |   ✅    | Teams              |
| `FEATURE_EMPLOYEE_LEVEL`                 |   ✅    | Employee levels    |
| `FEATURE_ORGANIZATION_DEPARTMENT`        |   ✅    | Departments        |

## Feature Flag Scopes

| Scope            | Description                    |
| ---------------- | ------------------------------ |
| **Global**       | Applies to all tenants         |
| **Tenant**       | Tenant-specific override       |
| **Organization** | Organization-specific override |

## API

```bash
# Get available features
GET /api/feature/toggle

# Toggle a feature
PUT /api/feature/toggle
{
  "featureId": "feature-uuid",
  "enabled": false,
  "organizationId": "org-uuid"
}
```

## Frontend Usage

```typescript
@Component({ ... })
export class SomeComponent {
  constructor(private featureService: FeatureService) {}

  get isTimeTrackingEnabled(): boolean {
    return this.featureService.isFeatureEnabled('FEATURE_TIME_TRACKING');
  }
}
```

## Related Pages

- [Development Guide](./development-guide)
- [Roles & Permissions](../authentication/roles-and-permissions)
