---
sidebar_position: 28
---

# Income Endpoints

Manage income records for employees and organizations.

## Base Path

```
/api/income
```

## Endpoints

### List Income

```
GET /api/income
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter    | Type   | Description        |
| ------------ | ------ | ------------------ |
| `employeeId` | UUID   | Filter by employee |
| `startDate`  | Date   | From date          |
| `endDate`    | Date   | To date            |
| `page`       | number | Page number        |
| `limit`      | number | Items per page     |

### Get Income by ID

```
GET /api/income/:id
Authorization: Bearer {token}
```

### Create Income Record

```
POST /api/income
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "amount": 5000,
  "currency": "USD",
  "valueDate": "2025-01-31",
  "notes": "Project milestone payment",
  "isBonus": false,
  "clientId": "contact-uuid",
  "employeeId": "employee-uuid"
}
```

### Update Income

```
PUT /api/income/:id
Authorization: Bearer {token}
```

### Delete Income

```
DELETE /api/income/:id
Authorization: Bearer {token}
```

## Permissions

| Action | Required Permission |
| ------ | ------------------- |
| View   | `ORG_INCOMES_VIEW`  |
| Edit   | `ORG_INCOMES_EDIT`  |

## Related Pages

- [Expense Endpoints](./expense-endpoints) — expenses
- [Income Management](../features/income-management) — feature guide
