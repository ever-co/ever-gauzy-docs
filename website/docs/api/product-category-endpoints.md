---
sidebar_position: 47
---

# Product Category Endpoints

Manage product categories for e-commerce features.

## Base Path

```
/api/product-category
```

## Endpoints

### List Categories

```
GET /api/product-category
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter | Type   | Description    |
| --------- | ------ | -------------- |
| `page`    | number | Page number    |
| `limit`   | number | Items per page |
| `name`    | string | Filter by name |

### Create Category

```
POST /api/product-category
Authorization: Bearer {token}
```

```json
{
  "name": "Electronics",
  "description": "Electronic products and accessories",
  "imageUrl": "https://example.com/electronics.png"
}
```

### Update Category

```
PUT /api/product-category/:id
Authorization: Bearer {token}
```

### Delete Category

```
DELETE /api/product-category/:id
Authorization: Bearer {token}
```

### Category Translations

```
PUT /api/product-category/:id/translations
Authorization: Bearer {token}
```

```json
{
  "languageCode": "es",
  "name": "Electrónica",
  "description": "Productos electrónicos y accesorios"
}
```

## Related Pages

- [Product Endpoints](./product-endpoints) — products API
- [Products & Inventory](../features/products-and-inventory) — feature
