---
sidebar_position: 7
---

# Product & Inventory Entities

Entities for products, variants, categories, types, options, warehouses, and merchants.

## Product

| Column              | Type    | Description          |
| ------------------- | ------- | -------------------- |
| `name`              | string  | Product name         |
| `code`              | string  | SKU/product code     |
| `description`       | string? | Description          |
| `enabled`           | boolean | Availability status  |
| `imageUrl`          | string? | Product image        |
| `featuredImageId`   | UUID?   | FK to featured image |
| `productTypeId`     | UUID?   | FK to product type   |
| `productCategoryId` | UUID?   | FK to category       |

**Relations:** `variants` (OneToMany), `category` (ManyToOne), `type` (ManyToOne), `options` (ManyToMany), `tags` (ManyToMany), `translations` (OneToMany)

## ProductVariant

| Column                   | Type    | Description         |
| ------------------------ | ------- | ------------------- |
| `taxes`                  | number? | Tax rate            |
| `notes`                  | string? | Notes               |
| `quantity`               | number  | Stock quantity      |
| `billingInvoicingPolicy` | enum?   | Invoicing policy    |
| `internalReference`      | string? | Internal ref number |
| `enabled`                | boolean | Is available        |
| `productId`              | UUID    | FK to product       |
| `imageId`                | UUID?   | FK to image asset   |

**Relations:** `price` (OneToOne ProductVariantPrice), `settings` (OneToMany ProductSetting)

## ProductCategory

| Column         | Type      | Description     |
| -------------- | --------- | --------------- |
| `imageUrl`     | string?   | Category image  |
| `translations` | OneToMany | Localized names |

## ProductType

| Column         | Type      | Description     |
| -------------- | --------- | --------------- |
| `icon`         | string?   | Type icon       |
| `translations` | OneToMany | Localized names |

## ProductOption / ProductOptionGroup

Multi-level product options (e.g., Size → Small/Medium/Large).

| Column    | Type   | Description        |
| --------- | ------ | ------------------ |
| `name`    | string | Option name        |
| `code`    | string | Option code        |
| `groupId` | UUID?  | FK to option group |

## Warehouse

| Column        | Type    | Description    |
| ------------- | ------- | -------------- |
| `name`        | string  | Warehouse name |
| `code`        | string  | Warehouse code |
| `email`       | string? | Contact email  |
| `description` | string? | Description    |
| `active`      | boolean | Active status  |
| `logo`        | string? | Logo image URL |

**Relations:** `products` (OneToMany WarehouseProduct), `contact` (ManyToOne Contact), `tags` (ManyToMany Tag)

## Merchant

| Column        | Type    | Description      |
| ------------- | ------- | ---------------- |
| `name`        | string  | Merchant name    |
| `code`        | string  | Merchant code    |
| `email`       | string? | Contact email    |
| `phone`       | string? | Phone number     |
| `description` | string? | Description      |
| `active`      | boolean | Active status    |
| `currency`    | string  | Default currency |
| `logo`        | string? | Logo URL         |

**Relations:** `contact` (ManyToOne Contact), `tags` (ManyToMany Tag), `warehouses` (ManyToMany Warehouse)

## Related Pages

- [Product Endpoints](../../api/product-endpoints) — API reference
- [Warehouse Endpoints](../../api/warehouse-endpoints) — warehouse API
- [Products & Inventory](../../features/products-and-inventory) — feature guide
