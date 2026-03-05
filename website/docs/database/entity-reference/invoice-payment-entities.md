---
sidebar_position: 6
---

# Invoice & Payment Entities

Entities for invoices, estimates, invoice items, payments, and invoice history.

## Invoice

| Column               | Type     | Description               |
| -------------------- | -------- | ------------------------- |
| `invoiceDate`        | Date     | Invoice/estimate date     |
| `invoiceNumber`      | number   | Unique number             |
| `dueDate`            | Date     | Payment due date          |
| `currency`           | string   | Currency code             |
| `discountValue`      | number   | Discount amount           |
| `discountType`       | enum     | `PERCENTAGE` or `FLAT`    |
| `tax`                | number   | Tax percentage            |
| `tax2`               | number?  | Second tax percentage     |
| `taxType`            | enum?    | Tax calculation type      |
| `terms`              | string?  | Payment terms text        |
| `totalValue`         | number?  | Calculated total          |
| `status`             | enum     | Invoice status            |
| `isEstimate`         | boolean  | `true` for estimates      |
| `isAccepted`         | boolean? | Client acceptance status  |
| `sentTo`             | string?  | Recipient email           |
| `token`              | string?  | Public sharing token      |
| `toContactId`        | UUID?    | FK to recipient contact   |
| `fromOrganizationId` | UUID?    | FK to sender organization |

**Invoice Statuses:** `DRAFT`, `SENT`, `VIEWED`, `ACCEPTED`, `REJECTED`, `PARTIALLY_PAID`, `PAID`, `OVERDUE`, `VOID`

## InvoiceItem

| Column          | Type     | Description            |
| --------------- | -------- | ---------------------- |
| `description`   | string?  | Line item description  |
| `price`         | number   | Unit price             |
| `quantity`      | number   | Quantity               |
| `totalValue`    | number   | Line total             |
| `applyTax`      | boolean? | Apply tax to this item |
| `applyDiscount` | boolean? | Apply discount         |
| `invoiceId`     | UUID     | FK to invoice          |
| `taskId`        | UUID?    | FK to task             |
| `employeeId`    | UUID?    | FK to employee         |
| `projectId`     | UUID?    | FK to project          |
| `productId`     | UUID?    | FK to product          |
| `expenseId`     | UUID?    | FK to expense          |

## Payment

| Column          | Type     | Description    |
| --------------- | -------- | -------------- |
| `paymentDate`   | Date     | Payment date   |
| `amount`        | number   | Amount paid    |
| `note`          | string?  | Payment note   |
| `currency`      | string   | Currency code  |
| `paymentMethod` | enum?    | Payment method |
| `overdue`       | boolean? | Is overdue     |
| `invoiceId`     | UUID?    | FK to invoice  |
| `employeeId`    | UUID?    | FK to employee |
| `contactId`     | UUID?    | FK to contact  |
| `projectId`     | UUID?    | FK to project  |

**Payment Methods:** `CASH`, `BANK_TRANSFER`, `DEBIT_CARD`, `CREDIT_CARD`, `CHEQUE`, `ONLINE`

## EstimateEmail

| Column       | Type   | Description     |
| ------------ | ------ | --------------- |
| `token`      | string | Access token    |
| `email`      | string | Recipient email |
| `expireDate` | Date   | Token expiry    |
| `invoiceId`  | UUID   | FK to invoice   |

## InvoiceEstimateHistory

| Column      | Type   | Description            |
| ----------- | ------ | ---------------------- |
| `action`    | string | Change description     |
| `title`     | string | History entry title    |
| `invoiceId` | UUID   | FK to invoice          |
| `userId`    | UUID?  | FK to user who changed |

## Related Pages

- [Invoice Endpoints](../../api/invoice-endpoints) — API reference
- [Invoicing Feature](../../features/invoicing) — feature guide
- [Payments Feature](../../features/payments) — payments guide
