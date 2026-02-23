---
sidebar_position: 15
---

# Product Endpoints

API endpoints for Products, Variants, Categories, and Warehouses.

## Products

```bash
# List products
GET /api/products?organizationId=xxx

# Get product by ID
GET /api/products/:id

# Create product
POST /api/products
{
  "name": "Ergonomic Keyboard",
  "code": "KB-ERG-001",
  "description": "Mechanical ergonomic keyboard",
  "categoryId": "category-uuid",
  "typeId": "type-uuid",
  "enabled": true,
  "organizationId": "org-uuid"
}

# Update product
PUT /api/products/:id

# Delete product
DELETE /api/products/:id
```

## Product Variants

```bash
# List variants for a product
GET /api/product-variants?productId=xxx

# Create variant
POST /api/product-variants
{
  "productId": "product-uuid",
  "internalReference": "KB-ERG-001-BLK",
  "quantity": 100,
  "enabled": true,
  "options": [
    { "name": "Color", "value": "Black" }
  ],
  "price": {
    "unitCost": 45.00,
    "unitCostCurrency": "USD",
    "retailPrice": 89.99,
    "retailPriceCurrency": "USD"
  }
}
```

## Product Categories

```bash
# List categories
GET /api/product-categories

# Create category
POST /api/product-categories
{
  "name": "Electronics",
  "description": "Electronic devices and accessories"
}
```

## Product Types

```bash
GET /api/product-types
POST /api/product-types
```

## Warehouses

```bash
# List warehouses
GET /api/warehouses

# Create warehouse
POST /api/warehouses
{
  "name": "Main Warehouse",
  "code": "WH-MAIN",
  "active": true
}

# Add product to warehouse
POST /api/warehouses/:id/products
```

## Related Pages

- [API Overview](./overview)
- [Products & Inventory](../features/products-and-inventory) — feature guide
