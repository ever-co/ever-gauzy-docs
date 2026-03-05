---
sidebar_position: 36
---

# Accounting Templates

Customize invoice, estimate, and receipt document templates.

## Overview

Accounting templates let you customize the layout and branding of:

- Invoices
- Estimates / quotes
- Payment receipts

## Template System

Templates use **MJML** for email-safe HTML and **Handlebars** for data interpolation.

### MJML Template

```xml
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>Invoice #{{invoiceNumber}}</mj-text>
        <mj-text>Date: {{invoiceDate}}</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

### Handlebars Variables

| Variable               | Description         |
| ---------------------- | ------------------- |
| `{{invoiceNumber}}`    | Invoice number      |
| `{{invoiceDate}}`      | Invoice date        |
| `{{dueDate}}`          | Payment due date    |
| `{{fromOrganization}}` | Sender organization |
| `{{toContact}}`        | Recipient contact   |
| `{{invoiceItems}}`     | Line items array    |
| `{{totalValue}}`       | Total amount        |
| `{{tax}}`              | Tax amount          |
| `{{discount}}`         | Discount applied    |

## Template Management

1. Go to **Settings** → **Accounting** → **Templates**
2. Select template type (Invoice/Estimate/Receipt)
3. Edit the MJML/Handlebars template
4. Preview with sample data
5. Save

## Related Pages

- [Accounting Template Endpoints](../api/accounting-template-endpoints) — API
- [Email Templates](./email-templates) — email template system
- [Invoicing](./invoicing) — invoicing feature
