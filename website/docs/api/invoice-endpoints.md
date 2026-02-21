---
sidebar_position: 10
---

# Invoice Endpoints

API endpoints for invoice management, estimates, and payments.

## Invoices

### List Invoices

```http
GET /api/invoices?take=20&skip=0&relations[]=toContact&relations[]=fromOrganization
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "...",
      "invoiceNumber": "INV-001",
      "invoiceDate": "2024-01-15T00:00:00.000Z",
      "dueDate": "2024-02-15T00:00:00.000Z",
      "currency": "USD",
      "discountValue": 10,
      "discountType": "PERCENT",
      "tax": 7.5,
      "tax2": 0,
      "totalValue": 5000,
      "status": "SENT",
      "sentTo": "client@example.com",
      "isEstimate": false,
      "organizationId": "...",
      "toContactId": "..."
    }
  ],
  "total": 25
}
```

### Create Invoice

```http
POST /api/invoices
Authorization: Bearer {token}
Content-Type: application/json

{
  "invoiceNumber": "INV-002",
  "invoiceDate": "2024-01-15",
  "dueDate": "2024-02-15",
  "currency": "USD",
  "discountValue": 10,
  "discountType": "PERCENT",
  "tax": 7.5,
  "totalValue": 5000,
  "toContactId": "contact-uuid",
  "organizationId": "org-uuid",
  "invoiceItems": [
    {
      "description": "Development services",
      "quantity": 40,
      "price": 125,
      "totalValue": 5000,
      "applyTax": true,
      "applyDiscount": true
    }
  ]
}
```

### Send Invoice

```http
PUT /api/invoices/{id}/email
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "client@example.com"
}
```

### Invoice Statuses

| Status           | Description              |
| ---------------- | ------------------------ |
| `DRAFT`          | Created but not sent     |
| `SENT`           | Sent to client           |
| `VIEWED`         | Viewed by client         |
| `ACCEPTED`       | Accepted by client       |
| `PAID`           | Payment received         |
| `PARTIALLY_PAID` | Partial payment received |
| `OVERDUE`        | Past due date            |
| `VOID`           | Cancelled/voided         |

## Estimates

Estimates use the same endpoint with `isEstimate: true`:

```http
POST /api/invoices
Content-Type: application/json

{
  "isEstimate": true,
  "invoiceNumber": "EST-001",
  ...
}
```

### Convert Estimate to Invoice

```http
PUT /api/invoices/{estimate-id}/convert
Authorization: Bearer {token}
```

## Payments

### List Payments

```http
GET /api/payment?where[invoiceId]={invoice-id}
Authorization: Bearer {token}
```

### Create Payment

```http
POST /api/payment
Authorization: Bearer {token}
Content-Type: application/json

{
  "invoiceId": "invoice-uuid",
  "paymentDate": "2024-02-10",
  "amount": 2500,
  "currency": "USD",
  "paymentMethod": "BANK_TRANSFER",
  "note": "Partial payment",
  "organizationId": "org-uuid"
}
```

### Payment Methods

| Method          | Description                   |
| --------------- | ----------------------------- |
| `BANK_TRANSFER` | Wire/bank transfer            |
| `CASH`          | Cash payment                  |
| `CHEQUE`        | Check payment                 |
| `CREDIT_CARD`   | Credit card                   |
| `DEBIT`         | Debit card                    |
| `ONLINE`        | Online payment (PayPal, etc.) |

## Related Pages

- [Expense Endpoints](./expense-endpoints) — expense and income tracking
- [API Overview](./overview) — general API information
