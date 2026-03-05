---
sidebar_position: 11
---

# Expense & Income Entities

Entities for expense tracking, income records, expense categories, and recurring expenses.

## Expense

| Column          | Type     | Description                                           |
| --------------- | -------- | ----------------------------------------------------- |
| `amount`        | number   | Expense amount                                        |
| `currency`      | string   | Currency code                                         |
| `valueDate`     | Date     | Date of expense                                       |
| `notes`         | string?  | Notes                                                 |
| `typeOfExpense` | enum?    | `BILLABLE_TO_CONTACT`, `NON_BILLABLE`, `REIMBURSABLE` |
| `status`        | enum?    | `REPORTED`, `INVOICED`, etc.                          |
| `purpose`       | string?  | Purpose description                                   |
| `taxType`       | enum?    | Tax type                                              |
| `taxLabel`      | string?  | Tax label                                             |
| `rateValue`     | number?  | Tax rate                                              |
| `receipt`       | string?  | Receipt image URL                                     |
| `splitExpense`  | boolean? | Split across members                                  |
| `reference`     | string?  | Reference number                                      |
| `categoryId`    | UUID?    | FK to expense category                                |
| `employeeId`    | UUID?    | FK to employee                                        |
| `vendorId`      | UUID?    | FK to organization vendor                             |
| `projectId`     | UUID?    | FK to project                                         |

## Income

| Column       | Type     | Description      |
| ------------ | -------- | ---------------- |
| `amount`     | number   | Income amount    |
| `currency`   | string   | Currency code    |
| `valueDate`  | Date     | Date of income   |
| `notes`      | string?  | Notes            |
| `isBonus`    | boolean? | Bonus flag       |
| `reference`  | string?  | Reference number |
| `clientId`   | UUID?    | FK to contact    |
| `employeeId` | UUID?    | FK to employee   |

## ExpenseCategory

| Column | Type   | Description   |
| ------ | ------ | ------------- |
| `name` | string | Category name |

## OrganizationRecurringExpense

| Column         | Type    | Description      |
| -------------- | ------- | ---------------- |
| `categoryName` | string  | Category name    |
| `value`        | number  | Amount           |
| `currency`     | string  | Currency code    |
| `startDate`    | Date    | Start date       |
| `endDate`      | Date?   | End date         |
| `splitExpense` | boolean | Split across org |

## Related Pages

- [Expense Endpoints](../../api/expense-endpoints) — API reference
- [Expenses Feature](../../features/expenses) — expense tracking
- [Income Management](../../features/income-management) — income tracking
