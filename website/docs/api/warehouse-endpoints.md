---
sidebar_position: 28
---

# Warehouse Endpoints

Manage warehouses, warehouse products, and product variant inventory.

## Base Path

```
/api/warehouses
```

## Endpoints

### List Warehouses

```
GET /api/warehouses
Authorization: Bearer {token}
```

### Get Warehouse by ID

```
GET /api/warehouses/:id
Authorization: Bearer {token}
```

### Create Warehouse

```
POST /api/warehouses
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Main Warehouse",
  "code": "WH001",
  "email": "warehouse@example.com",
  "description": "Primary storage facility",
  "active": true,
  "organizationId": "uuid",
  "contact": {
    "name": "Warehouse Manager",
    "phone": "+1-555-0123"
  }
}
```

### Update Warehouse

```
PUT /api/warehouses/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Warehouse Name",
  "active": false
}
```

### Delete Warehouse

```
DELETE /api/warehouses/:id
Authorization: Bearer {token}
```

## Data Model

```typescript
interface IWarehouse {
  id: string;
  name: string;
  code: string;
  email?: string;
  description?: string;
  active: boolean;
  logo?: string;

  // Relations
  contact?: IContact;
  products?: IWarehouseProduct[];
  tags?: ITag[];
  organizationId: string;
  tenantId: string;
}

interface IWarehouseProduct {
  id: string;
  quantity: number;
  warehouseId: string;
  productId: string;
  product?: IProduct;
  variants?: IWarehouseProductVariant[];
}

interface IWarehouseProductVariant {
  id: string;
  quantity: number;
  warehouseProductId: string;
  variantId: string;
  variant?: IProductVariant;
}
```

## Related Pages

- [Inventory Feature](../features/inventory) — inventory management
- [Products & Inventory](../features/products-and-inventory) — product management
- [Warehousing Feature](../features/warehousing) — warehousing guide
