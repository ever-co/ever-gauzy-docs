---
sidebar_position: 90
---

# Project Budget Tracking

Monitor and control project budgets against actual spending.

## Budget Setup

### Per-Project Budget

1. Open a project → **Settings** → **Budget**
2. Set:
   - **Budget type**: Hours or Currency
   - **Budget amount**: Total budget
   - **Notification thresholds**: e.g., 75%, 90%

### Budget Types

| Type           | Tracked              | Unit  |
| -------------- | -------------------- | ----- |
| Hours-based    | Total time logged    | Hours |
| Currency-based | Hours × billing rate | $     |
| Fixed price    | Against project cost | $     |

## Real-Time Tracking

```
Budget:    $10,000
Spent:     $6,500 (65%)
Remaining: $3,500
Burn Rate: $325/day
Projected: $11,050 (⚠️ over budget)
```

## Visual Indicators

| Status   | Color | Condition   |
| -------- | ----- | ----------- |
| On Track | 🟢    | < 75% used  |
| Warning  | 🟡    | 75-90% used |
| Critical | 🔴    | > 90% used  |
| Over     | ⛔    | > 100% used |

## Budget Reports

| Report             | Description                   |
| ------------------ | ----------------------------- |
| Budget vs Actual   | Compare planned vs spent      |
| Burn Rate Trend    | Daily/weekly spending trend   |
| Team Allocation    | Budget consumed per member    |
| Project Comparison | Budget health across projects |

## Related Pages

- [Budgets & Forecasting](./budgets-forecasting) — forecasting
- [Project Management](./project-management) — projects
- [Reports & Analytics](./reports-and-analytics) — reporting
