---
sidebar_position: 55
---

# Warehouse Management

Manage warehouses, inventory, and stock levels.

## Overview

Warehouse management in Gauzy enables:

- Multiple warehouse locations
- Product inventory tracking
- Stock level management
- Warehouse-product relationships

## Setting Up Warehouses

1. Navigate to **Inventory** → **Warehouses**
2. Click **Add Warehouse**
3. Enter details:
   - Name and code
   - Contact information
   - Address/location
   - Description
4. Save

## Inventory Management

### Add Products to Warehouse

1. Open a warehouse
2. Click **Add Products**
3. Select products
4. Enter initial stock quantities
5. Save

### Update Stock

```json
PUT /api/warehouse/:id/inventory
{
  "productId": "uuid",
  "quantity": 150
}
```

## Stock Reports

| Report               | Description            |
| -------------------- | ---------------------- |
| Stock Levels         | Current quantities     |
| Low Stock Alert      | Items below threshold  |
| Stock Movement       | In/out history         |
| Warehouse Comparison | Stock across locations |

## Related Pages

- [Warehouse Endpoints](../api/warehouse-endpoints) — API
- [Products & Inventory](./products-and-inventory) — products
- [Merchant Endpoints](../api/merchant-endpoints) — merchants
