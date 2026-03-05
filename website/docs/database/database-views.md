---
sidebar_position: 13
---

# Database Views

Using database views for complex reporting queries.

## Overview

Database views simplify complex queries by predefining joins and aggregations:

```sql
CREATE VIEW employee_time_summary AS
SELECT
  e.id AS employee_id,
  u."firstName",
  u."lastName",
  o.name AS organization_name,
  SUM(tl.duration) AS total_duration,
  COUNT(DISTINCT tl.id) AS log_count,
  MAX(tl."stoppedAt") AS last_tracked
FROM employee e
JOIN "user" u ON e."userId" = u.id
JOIN organization o ON e."organizationId" = o.id
LEFT JOIN time_log tl ON tl."employeeId" = e.id
GROUP BY e.id, u."firstName", u."lastName", o.name;
```

## Common Views

| View Name                | Purpose                      |
| ------------------------ | ---------------------------- |
| `employee_time_summary`  | Time totals per employee     |
| `project_budget_status`  | Budget vs actual per project |
| `monthly_invoice_totals` | Revenue per month            |
| `task_completion_rates`  | Task status distribution     |

## Materialized Views

For computationally expensive queries:

```sql
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT
  date_trunc('month', i."invoiceDate") AS month,
  i."organizationId",
  SUM(i."totalValue") AS total_revenue,
  COUNT(*) AS invoice_count
FROM invoice i
WHERE i.status = 'PAID'
GROUP BY 1, 2;

-- Refresh periodically
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;
```

## Usage in TypeORM

```typescript
@ViewEntity({
  expression: `SELECT ...`, // or reference a DB view
})
export class EmployeeTimeSummary {
  @ViewColumn()
  employeeId: string;

  @ViewColumn()
  totalDuration: number;
}
```

## Related Pages

- [Query Builder](./query-builder) — complex queries
- [Indexing Strategy](./indexing-strategy) — performance
- [Reports](../features/reports-and-analytics) — reporting
