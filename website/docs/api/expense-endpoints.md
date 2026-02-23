---
sidebar_position: 11
---

# Expense Endpoints

API endpoints for expense tracking, income management, and recurring expenses.

## Expenses

### List Expenses

```http
GET /api/expense?take=20&skip=0&startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "...",
      "amount": 250.0,
      "currency": "USD",
      "valueDate": "2024-01-15T00:00:00.000Z",
      "notes": "Office supplies",
      "purpose": "Office",
      "vendor": { "name": "Office Depot" },
      "category": { "name": "Supplies" },
      "status": "REPORTED",
      "organizationId": "..."
    }
  ],
  "total": 30
}
```

### Create Expense

```http
POST /api/expense
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 250.00,
  "currency": "USD",
  "valueDate": "2024-01-15",
  "notes": "Office supplies",
  "purpose": "Office",
  "typeOfExpense": "BILLABLE_TO_CONTACT",
  "categoryId": "category-uuid",
  "vendorId": "vendor-uuid",
  "organizationId": "org-uuid"
}
```

### Expense Statuses

| Status     | Description            |
| ---------- | ---------------------- |
| `REPORTED` | Expense reported       |
| `INVOICED` | Included in an invoice |
| `PAID`     | Reimbursed             |

### Expense Types

| Type                  | Description            |
| --------------------- | ---------------------- |
| `BILLABLE_TO_CONTACT` | Bill to client         |
| `NON_BILLABLE`        | Internal expense       |
| `TAX_DEDUCTIBLE`      | Tax-deductible expense |

## Income

### List Income

```http
GET /api/income?take=20&skip=0
Authorization: Bearer {token}
```

### Create Income

```http
POST /api/income
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 5000.00,
  "currency": "USD",
  "valueDate": "2024-01-15",
  "notes": "Client payment for January",
  "clientId": "contact-uuid",
  "organizationId": "org-uuid"
}
```

## Expense Categories

### List Categories

```http
GET /api/expense-categories
Authorization: Bearer {token}
```

### Create Category

```http
POST /api/expense-categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Travel",
  "organizationId": "org-uuid"
}
```

## Organization Recurring Expenses

### List Recurring Expenses

```http
GET /api/organization-recurring-expense?where[organizationId]={org-id}
Authorization: Bearer {token}
```

### Create Recurring Expense

```http
POST /api/organization-recurring-expense
Authorization: Bearer {token}
Content-Type: application/json

{
  "categoryName": "Cloud Hosting",
  "value": 500,
  "currency": "USD",
  "startDate": "2024-01-01",
  "organizationId": "org-uuid"
}
```

## Related Pages

- [Invoice Endpoints](./invoice-endpoints) — invoicing and payments
- [API Overview](./overview) — general API information
