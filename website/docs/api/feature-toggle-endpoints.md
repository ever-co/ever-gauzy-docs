---
sidebar_position: 35
---

# Feature Toggle Endpoints

Manage feature flags to enable/disable platform features per tenant or organization.

## Base Path

```
/api/feature/toggle
```

## Endpoints

### List Feature Toggles

```
GET /api/feature/toggle
Authorization: Bearer {token}
```

### Get Parent Features

```
GET /api/feature/toggle/parent
Authorization: Bearer {token}
```

### Get Feature Blocks

Retrieves all feature blocks (grouped feature flags).

```
GET /api/feature/toggle/blocks
Authorization: Bearer {token}
```

### Update Feature Toggle

```
POST /api/feature/toggle/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "isEnabled": true,
  "organizationId": "uuid"
}
```

## Feature Categories

| Feature Code                             | Category | Description                 |
| ---------------------------------------- | -------- | --------------------------- |
| `FEATURE_DASHBOARD`                      | Core     | Dashboard access            |
| `FEATURE_TIME_TRACKING`                  | HRM      | Time tracking module        |
| `FEATURE_ESTIMATE`                       | ERP      | Estimates and quotes        |
| `FEATURE_INVOICE`                        | ERP      | Invoicing module            |
| `FEATURE_INCOME`                         | ERP      | Income tracking             |
| `FEATURE_EXPENSE`                        | ERP      | Expense tracking            |
| `FEATURE_PAYMENT`                        | ERP      | Payment management          |
| `FEATURE_PROPOSAL`                       | ERP      | Proposals                   |
| `FEATURE_PROPOSAL_TEMPLATE`              | ERP      | Proposal templates          |
| `FEATURE_PIPELINE`                       | CRM      | Sales pipelines             |
| `FEATURE_PIPELINE_DEAL`                  | CRM      | Pipeline deals              |
| `FEATURE_ORGANIZATION_CONTACT`           | CRM      | Contacts management         |
| `FEATURE_ORGANIZATION_PROJECT`           | PM       | Project management          |
| `FEATURE_ORGANIZATION_TEAM`              | PM       | Team management             |
| `FEATURE_ORGANIZATION_DOCUMENT`          | Core     | Document management         |
| `FEATURE_ORGANIZATION_EQUIPMENT`         | HRM      | Equipment management        |
| `FEATURE_ORGANIZATION_RECURRING_EXPENSE` | ERP      | Recurring expenses          |
| `FEATURE_EMPLOYEE_TIMESHEET`             | HRM      | Timesheets                  |
| `FEATURE_EMPLOYEE_RECURRING_EXPENSE`     | HRM      | Employee recurring expenses |
| `FEATURE_ORGANIZATION_TAG`               | Core     | Tags management             |
| `FEATURE_EMPLOYEE`                       | HRM      | Employee management         |
| `FEATURE_EMPLOYEE_TIME_ACTIVITY`         | HRM      | Activity monitoring         |
| `FEATURE_JOB`                            | ATS      | Job boards                  |

## Data Model

```typescript
interface IFeature {
  id: string;
  name: string;
  code: string;
  description?: string;
  image?: string;
  link?: string;
  isEnabled: boolean;
  isPaid?: boolean;
  parentId?: string;
  children?: IFeature[];
}

interface IFeatureOrganization {
  id: string;
  isEnabled: boolean;
  featureId: string;
  feature: IFeature;
  organizationId: string;
  tenantId: string;
}
```

## Related Pages

- [Feature Flags](../development/feature-flags) — development guide
- [Admin Feature Flags](../admin/feature-flags) — admin UI guide
