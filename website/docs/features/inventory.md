---
sidebar_position: 17
---

# Inventory

Product and warehouse inventory management for tracking stock, orders, and merchandise.

## Features

- **Product management** — create and categorize products
- **Warehouse tracking** — multiple warehouse support
- **Stock levels** — track quantity and availability
- **Product categories** — hierarchical categorization
- **Product types** — product classification
- **Merchant management** — vendor/supplier tracking

## Product Entity

| Field               | Type             | Description         |
| ------------------- | ---------------- | ------------------- |
| `name`              | string           | Product name        |
| `code`              | string           | Product code/SKU    |
| `description`       | string           | Product description |
| `enabled`           | boolean          | Active/inactive     |
| `imageUrl`          | string           | Product image       |
| `productTypeId`     | string           | Product type        |
| `productCategoryId` | string           | Category            |
| `variants`          | ProductVariant[] | Size/color variants |

## Product Variants

Each product can have multiple variants:

| Field                    | Description      |
| ------------------------ | ---------------- |
| `quantity`               | Stock quantity   |
| `billingInvoicingPolicy` | Billing policy   |
| `internalReference`      | Internal SKU     |
| `price`                  | Variant price    |
| `setting`                | Variant settings |

## Warehouses

Track inventory across multiple locations:

| Field         | Description         |
| ------------- | ------------------- |
| `name`        | Warehouse name      |
| `contact`     | Contact information |
| `description` | Location details    |
| `active`      | Active status       |

## Merchants

Vendor/supplier management:

| Field         | Description        |
| ------------- | ------------------ |
| `name`        | Merchant name      |
| `contact`     | Contact details    |
| `description` | About the merchant |
| `logo`        | Merchant logo      |

## Related Pages

- [ERP Overview](./erp-overview) — ERP module overview
- [Invoicing](./invoicing) — product invoicing
