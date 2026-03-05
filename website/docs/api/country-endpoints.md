---
sidebar_position: 61
---

# Country Endpoints

Manage countries for business configuration.

## Base Path

```
/api/country
```

## Endpoints

### List Countries

```
GET /api/country
Authorization: Bearer {token}
```

**Response:**

```json
{
  "items": [
    { "id": "uuid", "isoCode": "US", "country": "United States" },
    { "id": "uuid", "isoCode": "GB", "country": "United Kingdom" },
    { "id": "uuid", "isoCode": "DE", "country": "Germany" }
  ],
  "total": 250
}
```

### Get Country

```
GET /api/country/:id
Authorization: Bearer {token}
```

## System Countries

All 250+ countries are seeded automatically during initial setup. Countries are used for:

- Organization address
- Employee location
- Contact/client addresses
- Tax and compliance rules
- Holiday calendar imports

## Related Pages

- [Currency Endpoints](./currency-endpoints) — currency API
- [Organization Settings](../features/organization-settings) — org config
