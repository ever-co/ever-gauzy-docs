---
sidebar_position: 19
---

# Products & Inventory

Product catalog, variants, pricing, and warehouse management.

## Overview

The Products module provides a complete inventory management system with multi-variant support, warehousing, and merchant configuration.

## Core Entities

### Product

| Field         | Type             | Description         |
| ------------- | ---------------- | ------------------- |
| `name`        | string           | Product name        |
| `code`        | string           | SKU / product code  |
| `description` | string           | Product description |
| `enabled`     | boolean          | Active/inactive     |
| `categoryId`  | UUID             | Product category    |
| `typeId`      | UUID             | Product type        |
| `imageUrl`    | string           | Primary image       |
| `variants`    | ProductVariant[] | Size/color variants |

### Product Variant

| Field                    | Type            | Description           |
| ------------------------ | --------------- | --------------------- |
| `quantity`               | number          | Stock quantity        |
| `billingInvoicingPolicy` | enum            | Ordered / Delivered   |
| `internalReference`      | string          | Internal SKU          |
| `enabled`                | boolean         | Variant active        |
| `prices`                 | VariantPrice[]  | Multi-currency prices |
| `options`                | ProductOption[] | Variant attributes    |

### Product Category

Hierarchical categorization:

```
Electronics
  ├── Laptops
  │     ├── Gaming
  │     └── Business
  └── Accessories
        ├── Keyboards
        └── Monitors
```

### Warehouse

| Field      | Type               | Description      |
| ---------- | ------------------ | ---------------- |
| `name`     | string             | Warehouse name   |
| `code`     | string             | Warehouse code   |
| `active`   | boolean            | Active status    |
| `contact`  | Contact            | Location/address |
| `products` | WarehouseProduct[] | Stocked products |

## Pricing

Multi-currency variant pricing:

| Field                 | Type   | Description     |
| --------------------- | ------ | --------------- |
| `unitCost`            | number | Cost price      |
| `unitCostCurrency`    | string | Cost currency   |
| `retailPrice`         | number | Retail price    |
| `retailPriceCurrency` | string | Retail currency |

## Merchant Configuration

| Field        | Description           |
| ------------ | --------------------- |
| `name`       | Merchant/store name   |
| `logo`       | Store logo            |
| `currency`   | Default currency      |
| `contact`    | Store contact info    |
| `warehouses` | Associated warehouses |

## API Endpoints

```bash
# Products
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

# Categories
GET    /api/product-categories
POST   /api/product-categories

# Variants
GET    /api/product-variants
POST   /api/product-variants

# Warehouses
GET    /api/warehouses
POST   /api/warehouses
PUT    /api/warehouses/:id
```

## Related Pages

- [HRM Features](../features/hrm-overview)
- [Equipment Management](./equipment-management)
