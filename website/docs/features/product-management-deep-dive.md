---
sidebar_position: 82
---

# Product Management Deep Dive

Manage products, variants, and product categories.

## Product Catalog

### Creating Products

1. Go to **Inventory** → **Products**
2. Click **Add Product**
3. Fill in:
   - Product name and code
   - Description (rich text)
   - Category and type
   - Images
   - Price and currency
   - Tax settings

### Product Fields

| Field        | Type    | Required |
| ------------ | ------- | -------- |
| Name         | String  | ✅       |
| Code         | String  | ✅       |
| Product Type | Enum    | ✅       |
| Category     | Ref     | ❌       |
| Description  | Text    | ❌       |
| Image URL    | String  | ❌       |
| Enabled      | Boolean | ✅       |

## Product Variants

Create variants for products with different options:

| Variant Option | Example Values    |
| -------------- | ----------------- |
| Size           | S, M, L, XL       |
| Color          | Red, Blue, Green  |
| Material       | Cotton, Polyester |

### Variant Pricing

Each variant can have:

- Unique price
- Unique SKU
- Independent stock tracking

## Product Categories

Organize products hierarchically:

```
Electronics/
├── Laptops/
│   ├── MacBook Pro
│   └── Dell XPS
├── Monitors/
│   ├── 27" 4K
│   └── 32" Ultrawide
└── Accessories/
    ├── Keyboards
    └── Mice
```

## Integration with Invoicing

Products can be used in invoices:

1. Create invoice line item
2. Select from product catalog
3. Price auto-fills from product settings
4. Quantity and totals calculated

## Related Pages

- [Inventory Management](./inventory) — stock tracking
- [Invoice Management](./invoicing) — invoicing
- [Product Endpoints](../api/product-endpoints) — API
