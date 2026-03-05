---
sidebar_position: 58
---

# Currency Endpoints

Manage currencies for organizations.

## Base Path

```
/api/currency
```

## Endpoints

### List Currencies

```
GET /api/currency
Authorization: Bearer {token}
```

**Response:**

```json
{
  "items": [
    { "id": "uuid", "isoCode": "USD", "currency": "US Dollar" },
    { "id": "uuid", "isoCode": "EUR", "currency": "Euro" },
    { "id": "uuid", "isoCode": "GBP", "currency": "British Pound" }
  ],
  "total": 150
}
```

### Create Currency

```
POST /api/currency
Authorization: Bearer {token}
```

```json
{ "isoCode": "BTC", "currency": "Bitcoin" }
```

### Update Currency

```
PUT /api/currency/:id
Authorization: Bearer {token}
```

### Delete Currency

```
DELETE /api/currency/:id
Authorization: Bearer {token}
```

## Default Currencies

System seeds include 150+ world currencies (ISO 4217).

## Related Pages

- [Organization Settings](../features/organization-settings) — org config
- [Invoice Endpoints](./invoice-endpoints) — invoicing API
