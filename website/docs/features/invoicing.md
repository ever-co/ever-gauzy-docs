---
sidebar_position: 10
---

# Invoicing

Create, send, and manage invoices and estimates with support for multiple currencies, taxes, and discounts.

## Invoice Features

- **Custom invoice numbers** with auto-increment
- **Multiple line items** with quantity, rate, and description
- **Tax calculations** (single or dual tax rates)
- **Discount support** (percentage or fixed amount)
- **PDF generation** for email and download
- **Email delivery** directly from the platform
- **Status tracking** from draft to paid
- **Multi-currency** support

## Invoice Lifecycle

```
DRAFT → SENT → VIEWED → ACCEPTED → PAID
  │       │                          ↑
  │       └── OVERDUE ───────────────┘ (partial payment)
  │
  └── VOID (cancelled)
```

## Invoice Items

Each invoice contains line items:

| Field           | Description                 |
| --------------- | --------------------------- |
| `description`   | Item/service description    |
| `quantity`      | Number of units             |
| `price`         | Rate per unit               |
| `totalValue`    | quantity × price            |
| `applyTax`      | Apply tax to this item      |
| `applyDiscount` | Apply discount to this item |

### Item Types

Invoices can itemize different sources:

| Type            | Description                 |
| --------------- | --------------------------- |
| **By Task**     | Bill for tracked tasks      |
| **By Employee** | Bill for employee hours     |
| **By Project**  | Bill for project milestones |
| **By Expense**  | Reimburse marked expenses   |

## Estimates

Estimates use the same system with `isEstimate: true`:

- Create estimates for potential work
- Send estimates to clients for approval
- Convert approved estimates into invoices
- Track estimate acceptance rates

## Permissions

| Action                | Permission       |
| --------------------- | ---------------- |
| View invoices         | `INVOICES_VIEW`  |
| Create/edit invoices  | `INVOICES_EDIT`  |
| View estimates        | `ESTIMATES_VIEW` |
| Create/edit estimates | `ESTIMATES_EDIT` |

## Related Pages

- [Invoice Endpoints](../api/invoice-endpoints) — API reference
- [Payments](./payments) — payment recording
- [ERP Overview](./erp-overview) — ERP module overview
