---
sidebar_position: 32
---

# Report Endpoints

Manage reports, report categories, and report configurations for analytics and data visualization.

## Base Paths

| Resource          | Path                   |
| ----------------- | ---------------------- |
| Reports           | `/api/report`          |
| Report Categories | `/api/report-category` |

## Report Endpoints

### List Reports

```
GET /api/report
Authorization: Bearer {token}
```

### Get Report by Slug

```
GET /api/report/:slug
Authorization: Bearer {token}
```

### Update Report Configuration

```
PUT /api/report/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Report Name",
  "showInMenu": true
}
```

## Report Category Endpoints

### List Categories

```
GET /api/report-category
Authorization: Bearer {token}
```

### Create Category

```
POST /api/report-category
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Custom Reports",
  "iconClass": "fas fa-chart-bar"
}
```

## Built-in Reports

| Report Slug         | Category      | Description                   |
| ------------------- | ------------- | ----------------------------- |
| `time-activity`     | Time Tracking | Time and activity summary     |
| `weekly`            | Time Tracking | Weekly timesheet report       |
| `apps-urls`         | Time Tracking | Applications and URLs visited |
| `manual-time-edits` | Time Tracking | Manual time entry changes     |
| `expense`           | Accounting    | Expense report                |
| `amounts-owed`      | Accounting    | Outstanding amounts           |
| `payments`          | Accounting    | Payment records               |
| `daily-limits`      | Time Tracking | Daily time limits             |
| `project-budgets`   | Projects      | Budget vs actual for projects |
| `client-budgets`    | Projects      | Budget vs actual for clients  |

## Data Model

```typescript
interface IReport {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  iconClass?: string;
  showInMenu?: boolean;
  categoryId: string;
  category?: IReportCategory;
  organizationId?: string;
  tenantId: string;
}

interface IReportCategory {
  id: string;
  name: string;
  iconClass?: string;
  reports?: IReport[];
}
```

## Related Pages

- [Reports & Analytics Feature](../features/reports-and-analytics) — feature guide
- [Dashboard Widgets](../features/dashboard-widgets) — dashboard configuration
