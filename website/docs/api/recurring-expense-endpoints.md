---
sidebar_position: 56
---

# Recurring Expense Endpoints

Manage recurring expenses for organizations and employees.

## Base Path

```
/api/recurring-expense
```

## Endpoints

### List Recurring Expenses

```
GET /api/recurring-expense
Authorization: Bearer {token}
```

### Create Recurring Expense

```
POST /api/recurring-expense
Authorization: Bearer {token}
```

```json
{
  "categoryName": "Office Rent",
  "value": 3500.0,
  "currency": "USD",
  "startDate": "2025-01-01",
  "splitExpense": false,
  "employeeId": null
}
```

### Update Recurring Expense

```
PUT /api/recurring-expense/:id
Authorization: Bearer {token}
```

### Delete Recurring Expense

```
DELETE /api/recurring-expense/:id
Authorization: Bearer {token}
```

## Employee Recurring Expenses

```
GET /api/employee-recurring-expense
POST /api/employee-recurring-expense
PUT /api/employee-recurring-expense/:id
DELETE /api/employee-recurring-expense/:id
```

```json
{
  "employeeId": "employee-uuid",
  "categoryName": "Internet Allowance",
  "value": 100.0,
  "currency": "USD",
  "startDate": "2025-01-01"
}
```

## Related Pages

- [Expense Tracking](../features/expense-tracking) — expense feature
- [Expense Endpoints](./expense-endpoints) — one-time expenses
