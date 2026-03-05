---
sidebar_position: 31
---

# Expense Category Endpoints

Manage expense categories for organizing expense records.

## Base Path

```
/api/expense-categories
```

## Endpoints

### List Categories

```
GET /api/expense-categories
Authorization: Bearer {token}
```

### Get Category by ID

```
GET /api/expense-categories/:id
Authorization: Bearer {token}
```

### Create Category

```
POST /api/expense-categories
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "Travel"
}
```

### Update Category

```
PUT /api/expense-categories/:id
Authorization: Bearer {token}
```

### Delete Category

```
DELETE /api/expense-categories/:id
Authorization: Bearer {token}
```

## Built-in Categories

| Category        | Description            |
| --------------- | ---------------------- |
| Travel          | Travel expenses        |
| Meals           | Food and beverage      |
| Office Supplies | Stationery, equipment  |
| Software        | Software subscriptions |
| Hardware        | Hardware purchases     |
| Training        | Education and training |
| Marketing       | Marketing expenses     |
| Insurance       | Insurance premiums     |
| Utilities       | Office utilities       |
| Miscellaneous   | Other expenses         |

## Related Pages

- [Expense Endpoints](./expense-endpoints) — expense management
- [Expenses Feature](../features/expenses) — expense tracking
