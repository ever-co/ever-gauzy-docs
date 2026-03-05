---
sidebar_position: 59
---

# Estimate Endpoints

Manage quotes and cost estimates for clients.

## Base Path

```
/api/estimate-email
```

## Estimate CRUD

### List Estimates

```
GET /api/invoice?isEstimate=true
Authorization: Bearer {token}
```

### Create Estimate

```
POST /api/invoice
Authorization: Bearer {token}
```

```json
{
  "isEstimate": true,
  "invoiceNumber": "EST-001",
  "invoiceDate": "2025-03-05",
  "dueDate": "2025-04-05",
  "currency": "USD",
  "discountValue": 0,
  "tax": 0,
  "totalValue": 5000,
  "toContactId": "contact-uuid",
  "items": [
    {
      "name": "Web Development",
      "description": "Full-stack development",
      "quantity": 100,
      "price": 50
    }
  ]
}
```

### Send Estimate

```
POST /api/estimate-email
Authorization: Bearer {token}
```

```json
{
  "email": "client@example.com",
  "invoiceId": "estimate-uuid",
  "isEstimate": true
}
```

### Convert to Invoice

```
PUT /api/invoice/:id
Authorization: Bearer {token}
```

```json
{ "isEstimate": false }
```

## Related Pages

- [Invoice Endpoints](./invoice-endpoints) — invoicing API
- [Accounting Overview](../features/accounting-overview) — financial features
