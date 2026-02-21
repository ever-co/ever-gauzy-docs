---
sidebar_position: 13
---

# Dashboard Endpoints

API endpoints for dashboard widgets, statistics, and summary data.

## Employee Statistics

```bash
GET /api/employee-statistics/count
GET /api/employee-statistics/months
```

### Response Example

```json
{
  "total": 45,
  "active": 40,
  "inactive": 5
}
```

## Dashboard Widgets

```bash
GET /api/dashboard/widgets
```

### Available Widgets

| Widget                  | Description                 |
| ----------------------- | --------------------------- |
| `employee-count`        | Active/total employee count |
| `time-tracking-summary` | Today's tracked hours       |
| `project-status`        | Projects by status          |
| `invoice-summary`       | Outstanding/paid invoices   |
| `expense-summary`       | Monthly expense totals      |
| `task-summary`          | Tasks by status             |

## Organization Statistics

```bash
GET /api/stats/organization
```

### Response

```json
{
  "employeeCount": 45,
  "projectCount": 12,
  "activeTimers": 8,
  "todayTrackedHours": 156.5,
  "outstandingInvoices": 15000.0,
  "monthlyExpenses": 8500.0
}
```

## Report Endpoints

```bash
# Time & Activity
GET /api/report/time-activity

# Weekly report
GET /api/report/weekly

# Amounts owed
GET /api/report/amounts-owed

# Project budgets
GET /api/report/project-budgets

# Manual time edits
GET /api/report/manual-time

# Expense report
GET /api/report/expense
```

## Related Pages

- [API Overview](./overview) — getting started
- [Reports & Analytics](../features/reports-and-analytics) — feature guide
