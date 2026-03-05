---
sidebar_position: 49
---

# Product Variant Endpoints

Manage product variants (sizes, colors, configurations).

## Base Path

```
/api/product-variant
```

## Endpoints

### List Variants

```
GET /api/product-variant
Authorization: Bearer {token}
```

### Create Variant

```
POST /api/product-variant
Authorization: Bearer {token}
```

```json
{
  "productId": "uuid",
  "options": [
    { "name": "Size", "value": "Large" },
    { "name": "Color", "value": "Blue" }
  ],
  "price": { "unitCost": 29.99, "retailPrice": 49.99 },
  "settings": {
    "isSubscription": false,
    "isPurchaseAutomatically": true,
    "canBeSold": true,
    "canBePurchased": true,
    "canBeRented": false,
    "trackInventory": true
  },
  "quantity": 100
}
```

### Update Variant

```
PUT /api/product-variant/:id
Authorization: Bearer {token}
```

### Delete Variant

```
DELETE /api/product-variant/:id
Authorization: Bearer {token}
```

### Update Variant Price

```
PUT /api/product-variant-price/:id
Authorization: Bearer {token}
```

### Update Variant Settings

```
PUT /api/product-variant-setting/:id
Authorization: Bearer {token}
```

## Related Pages

- [Product Endpoints](./product-endpoints) — products
- [Product Category Endpoints](./product-category-endpoints) — categories
- [Products & Inventory](../features/products-and-inventory) — feature
