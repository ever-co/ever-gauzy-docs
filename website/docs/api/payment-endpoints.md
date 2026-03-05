---
sidebar_position: 29
---

# Payment Endpoints

Manage payment records linked to invoices and contacts.

## Base Path

```
/api/payment
```

## Endpoints

### List Payments

```
GET /api/payment
Authorization: Bearer {token}
```

### Get Payment by ID

```
GET /api/payment/:id
Authorization: Bearer {token}
```

### Create Payment

```
POST /api/payment
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "paymentDate": "2025-01-31",
  "amount": 2500,
  "currency": "USD",
  "note": "Partial payment for Invoice #1001",
  "paymentMethod": "BANK_TRANSFER",
  "invoiceId": "invoice-uuid",
  "contactId": "contact-uuid",
  "projectId": "project-uuid"
}
```

### Update Payment

```
PUT /api/payment/:id
Authorization: Bearer {token}
```

### Delete Payment

```
DELETE /api/payment/:id
Authorization: Bearer {token}
```

## Payment Methods

| Method        | Code            |
| ------------- | --------------- |
| Cash          | `CASH`          |
| Bank Transfer | `BANK_TRANSFER` |
| Debit Card    | `DEBIT_CARD`    |
| Credit Card   | `CREDIT_CARD`   |
| Cheque        | `CHEQUE`        |
| Online        | `ONLINE`        |

## Permissions

| Action | Required Permission |
| ------ | ------------------- |
| View   | `ORG_PAYMENT_VIEW`  |
| Add    | `ORG_PAYMENT_ADD`   |
| Edit   | `ORG_PAYMENT_EDIT`  |

## Related Pages

- [Invoice Endpoints](./invoice-endpoints) — invoicing
- [Payments Feature](../features/payments) — feature guide
