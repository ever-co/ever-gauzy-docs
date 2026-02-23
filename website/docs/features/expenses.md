---
sidebar_position: 11
---

# Expenses

Track business expenses with categorization, receipt management, and billable expense support.

## Expense Types

| Type                  | Description            |
| --------------------- | ---------------------- |
| `BILLABLE_TO_CONTACT` | Billed to client       |
| `NON_BILLABLE`        | Internal cost          |
| `TAX_DEDUCTIBLE`      | Tax-deductible expense |

## Expense Features

- **Category management** — organize by Travel, Office, Software, etc.
- **Vendor tracking** — link expenses to vendors
- **Receipt uploads** — attach supporting documents
- **Recurring expenses** — auto-generated periodic expenses
- **Billable marking** — flag for client invoicing
- **Employee expenses** — per-employee expense reporting
- **Organization expenses** — company-wide expense tracking

## Expense Categories

Default categories:

| Category     | Examples                     |
| ------------ | ---------------------------- |
| Travel       | Flights, hotels, meals       |
| Office       | Supplies, equipment          |
| Software     | Licenses, subscriptions      |
| Marketing    | Advertising, events          |
| Utilities    | Internet, phone, electricity |
| Professional | Legal, accounting            |

## Recurring Expenses

Both employee and organization level recurring expenses:

| Field          | Description                    |
| -------------- | ------------------------------ |
| `categoryName` | Expense category               |
| `value`        | Amount                         |
| `currency`     | Currency code                  |
| `startDate`    | When recurring starts          |
| `endDate`      | When recurring ends (optional) |

## Permissions

| Action                   | Permission               |
| ------------------------ | ------------------------ |
| View expenses            | `EXPENSES_VIEW`          |
| Create/edit expenses     | `EXPENSES_EDIT`          |
| View employee expenses   | `EMPLOYEE_EXPENSES_VIEW` |
| Create employee expenses | `EMPLOYEE_EXPENSES_EDIT` |

## Related Pages

- [Expense Endpoints](../api/expense-endpoints) — API reference
- [Invoicing](./invoicing) — billing billable expenses
- [ERP Overview](./erp-overview) — ERP module overview
