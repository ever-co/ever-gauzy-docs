---
sidebar_position: 46
---

# Merchant Endpoints

Manage merchants for product and inventory management.

## Base Path

```
/api/merchant
```

## Endpoints

### List Merchants

```
GET /api/merchant
Authorization: Bearer {token}
```

### Create Merchant

```
POST /api/merchant
Authorization: Bearer {token}
```

```json
{
  "name": "Online Store",
  "code": "STORE-001",
  "email": "store@example.com",
  "description": "Primary online storefront",
  "active": true,
  "currency": "USD",
  "contact": {
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+1234567890"
  }
}
```

### Get Merchant

```
GET /api/merchant/:id
Authorization: Bearer {token}
```

### Update Merchant

```
PUT /api/merchant/:id
Authorization: Bearer {token}
```

### Delete Merchant

```
DELETE /api/merchant/:id
Authorization: Bearer {token}
```

### Add Products to Merchant

```
POST /api/merchant/:id/products
Authorization: Bearer {token}
```

## Related Pages

- [Product Endpoints](./product-endpoints) — products API
- [Warehouse Endpoints](./warehouse-endpoints) — warehouses
- [Products & Inventory](../features/products-and-inventory) — feature guide
