---
sidebar_position: 22
---

# Accounting Template Endpoints

Manage invoice and estimate templates for custom document layouts.

## Base Path

```
/api/accounting-template
```

## Endpoints

### List Templates

```
GET /api/accounting-template
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter      | Type   | Description                |
| -------------- | ------ | -------------------------- |
| `templateType` | string | `INVOICE` or `ESTIMATE`    |
| `languageCode` | string | Language code (e.g., `en`) |

### Get Template by ID

```
GET /api/accounting-template/:id
Authorization: Bearer {token}
```

### Create Template

```
POST /api/accounting-template
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "Professional Invoice",
  "languageCode": "en",
  "templateType": "INVOICE",
  "mjml": "<mjml>...</mjml>",
  "hbs": "<div>{{invoiceNumber}}</div>"
}
```

### Update Template

```
PUT /api/accounting-template/:id
Authorization: Bearer {token}
```

### Delete Template

```
DELETE /api/accounting-template/:id
Authorization: Bearer {token}
```

### Generate Preview

```
POST /api/accounting-template/template/preview
Authorization: Bearer {token}
```

Renders a template with sample data for preview.

### Save Template

```
POST /api/accounting-template/template/save
Authorization: Bearer {token}
```

## Template Types

| Type       | Description             |
| ---------- | ----------------------- |
| `INVOICE`  | Invoice document        |
| `ESTIMATE` | Estimate/quote document |
| `RECEIPT`  | Payment receipt         |

## Template Variables

Templates use Handlebars syntax for data interpolation:

| Variable               | Description       |
| ---------------------- | ----------------- |
| `{{invoiceNumber}}`    | Invoice number    |
| `{{invoiceDate}}`      | Invoice date      |
| `{{dueDate}}`          | Payment due date  |
| `{{terms}}`            | Payment terms     |
| `{{fromOrganization}}` | Sender details    |
| `{{toContact}}`        | Recipient details |
| `{{invoiceItems}}`     | Line items array  |
| `{{totalValue}}`       | Invoice total     |
| `{{tax}}`              | Tax amount        |
| `{{discountValue}}`    | Discount amount   |

## Related Pages

- [Email Template Endpoints](./email-template-endpoints) — email templates
- [Invoice Endpoints](./invoice-endpoints) — invoice management
- [Invoicing Feature](../features/invoicing) — invoicing feature
