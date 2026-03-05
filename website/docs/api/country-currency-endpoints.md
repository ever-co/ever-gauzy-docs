---
sidebar_position: 24
---

# Country & Currency Endpoints

Reference data endpoints for countries and currencies.

## Country Endpoints

### Base Path: `/api/country`

### List Countries

```
GET /api/country
Authorization: Bearer {token}
```

Returns all available countries with ISO codes.

**Response:**

```json
{
  "items": [
    { "id": "uuid", "isoCode": "US", "country": "United States" },
    { "id": "uuid", "isoCode": "GB", "country": "United Kingdom" }
  ],
  "total": 195
}
```

### Find by ISO Code

```
GET /api/country?where={"isoCode":"US"}
Authorization: Bearer {token}
```

## Currency Endpoints

### Base Path: `/api/currency`

### List Currencies

```
GET /api/currency
Authorization: Bearer {token}
```

Returns all available currencies with ISO codes.

**Response:**

```json
{
  "items": [
    { "id": "uuid", "isoCode": "USD", "currency": "US Dollar" },
    { "id": "uuid", "isoCode": "EUR", "currency": "Euro" }
  ],
  "total": 160
}
```

## Notes

- Countries and currencies are seeded during initial setup
- These are reference/lookup tables — no CRUD operations needed
- Used by organization settings, invoices, and payments

## Related Pages

- [Organization Endpoints](./organization-endpoints) — org currency settings
- [Invoice Endpoints](./invoice-endpoints) — invoice currency
- [Payment Endpoints](./payment-endpoints) — payment currency
