---
sidebar_position: 13
---

# Income Management

Track revenue and income from various sources including client payments, bonuses, and other revenue streams.

## Income Features

- **Multiple income sources** — client payments, bonuses, commissions
- **Client linking** — associate income with contacts
- **Employee income** — track per-employee earnings
- **Date tracking** — value date for accounting
- **Notes** — add context to income records
- **Currency support** — multi-currency income tracking

## Income Entity

| Field            | Type   | Description         |
| ---------------- | ------ | ------------------- |
| `amount`         | number | Income amount       |
| `currency`       | string | Currency code       |
| `valueDate`      | date   | Income date         |
| `notes`          | string | Description/notes   |
| `clientId`       | string | Associated contact  |
| `employeeId`     | string | Associated employee |
| `organizationId` | string | Organization        |

## Bonus Calculations

Organization-level bonus settings:

| Setting           | Description                   |
| ----------------- | ----------------------------- |
| `bonusType`       | PROFIT_BASED or REVENUE_BASED |
| `bonusPercentage` | Default bonus percentage      |

### Bonus Formulas

- **Profit-based:** `bonus = (revenue - expenses) × bonusPercentage`
- **Revenue-based:** `bonus = revenue × bonusPercentage`

## Permissions

| Action             | Permission    |
| ------------------ | ------------- |
| View income        | `INCOME_VIEW` |
| Create/edit income | `INCOME_EDIT` |

## Related Pages

- [Payments](./payments) — payment recording
- [Expenses](./expenses) — expense tracking
- [ERP Overview](./erp-overview)
