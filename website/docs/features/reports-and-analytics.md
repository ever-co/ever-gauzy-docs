---
sidebar_position: 20
---

# Reports & Analytics

Built-in reporting and analytics for HR, financial, and project data.

## Report Categories

### Time & Activity Reports

| Report              | Description                        |
| ------------------- | ---------------------------------- |
| **Time & Activity** | Tracked hours with activity levels |
| **Weekly Report**   | Weekly breakdown by employee       |
| **Daily Report**    | Daily time log summary             |
| **Project Budgets** | Budget usage vs tracked time       |
| **Client Budget**   | Time spent per client              |

### Financial Reports

| Report             | Description                   |
| ------------------ | ----------------------------- |
| **Amounts Owed**   | Outstanding invoices          |
| **Expense Report** | Expense breakdown by category |
| **Revenue Report** | Income by period              |
| **Payment Report** | Payment history summary       |
| **Profit & Loss**  | Revenue vs expenses           |

### HR Reports

| Report                  | Description               |
| ----------------------- | ------------------------- |
| **Apps & URLs**         | Application usage reports |
| **Manual Time Edits**   | Manual time entries log   |
| **Employee Statistics** | Per-employee metrics      |
| **Time Off Report**     | Leave usage summary       |

## Report Filters

Common filters available across reports:

| Filter         | Options                             |
| -------------- | ----------------------------------- |
| **Date Range** | Custom, this week, this month, etc. |
| **Employee**   | Single or multiple employees        |
| **Project**    | Single or multiple projects         |
| **Client**     | Organization contacts               |
| **Team**       | Team-based filtering                |

## Analytics Dashboard

The dashboard displays key metrics:

### Overview Widgets

- Total tracked hours (today/week/month)
- Activity level trends
- Top projects by hours
- Employee availability
- Outstanding invoice total
- Revenue trends

### Charts

- Time tracked over time (line chart)
- Activity by project (bar chart)
- Expense categories (pie chart)
- Employee utilization (heatmap)

## Data Export

Reports can be exported in:

| Format    | Description            |
| --------- | ---------------------- |
| **CSV**   | Comma-separated values |
| **Excel** | XLSX spreadsheet       |
| **PDF**   | Printable document     |

## CubeJS Analytics

For advanced analytics, Ever Gauzy integrates with **CubeJS**:

```bash
# .env
CUBEJS_DB_TYPE=postgres
CUBEJS_DB_HOST=localhost
CUBEJS_DB_PORT=5432
CUBEJS_DB_NAME=gauzy
CUBEJS_DB_USER=postgres
CUBEJS_DB_PASS=root
CUBEJS_API_SECRET=your-cubejs-secret
```

CubeJS enables:

- Custom dashboards
- Pre-aggregated queries
- Real-time analytics
- REST and GraphQL API for analytics data

## Related Pages

- [Time Tracking](./time-tracking) — time data source
- [Invoicing](./invoicing) — financial data
- [Goals & KPIs](./goals-and-kpis) — performance metrics
