---
sidebar_position: 16
---

# Equipment Endpoints

API endpoints for Equipment and Equipment Sharing.

## Equipment

```bash
# List equipment
GET /api/equipment?organizationId=xxx

# Create equipment
POST /api/equipment
{
  "name": "MacBook Pro 16\"",
  "type": "Laptop",
  "serialNumber": "C02X12345",
  "manufacturedYear": 2024,
  "initialCost": 2499,
  "currency": "USD",
  "maxSharePeriod": 365,
  "autoApproveShare": false,
  "organizationId": "org-uuid"
}

# Update equipment
PUT /api/equipment/:id

# Delete equipment
DELETE /api/equipment/:id
```

## Equipment Sharing

```bash
# List sharing requests
GET /api/equipment-sharing?organizationId=xxx

# Request equipment sharing
POST /api/equipment-sharing
{
  "equipmentId": "equipment-uuid",
  "employeeIds": ["employee-uuid-1"],
  "shareStartDay": "2024-01-15",
  "shareEndDay": "2024-06-15"
}

# Approve sharing
PUT /api/equipment-sharing/:id
{
  "status": "approved"
}

# Return equipment
PUT /api/equipment-sharing/:id
{
  "status": "returned"
}
```

## Equipment Sharing Policies

```bash
# List policies
GET /api/equipment-sharing-policy

# Create policy
POST /api/equipment-sharing-policy
{
  "name": "Standard Laptop Policy",
  "description": "Laptops can be shared for up to 1 year"
}
```

## Related Pages

- [API Overview](./overview)
- [Equipment Management](../features/equipment-management) — feature guide
