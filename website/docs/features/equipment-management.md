---
sidebar_position: 20
---

# Equipment Management

Track and manage organizational equipment, sharing policies, and allocations.

## Overview

Manage company assets — laptops, monitors, phones, vehicles — with sharing policies and employee assignments.

## Core Entities

### Equipment

| Field              | Type    | Description                      |
| ------------------ | ------- | -------------------------------- |
| `name`             | string  | Equipment name                   |
| `type`             | string  | Category (Laptop, Monitor, etc.) |
| `serialNumber`     | string  | Serial number                    |
| `manufacturedYear` | number  | Year manufactured                |
| `initialCost`      | number  | Purchase price                   |
| `currency`         | string  | Price currency                   |
| `maxSharePeriod`   | number  | Max sharing days                 |
| `autoApproveShare` | boolean | Auto-approve sharing             |

### Equipment Sharing

| Field             | Type   | Description                           |
| ----------------- | ------ | ------------------------------------- |
| `equipmentId`     | UUID   | Equipment item                        |
| `employeeIds`     | UUID[] | Assigned employees                    |
| `shareRequestDay` | Date   | Request date                          |
| `shareStartDay`   | Date   | Start of sharing                      |
| `shareEndDay`     | Date   | End of sharing                        |
| `status`          | enum   | Requested, Approved, Active, Returned |

### Equipment Sharing Policy

| Field         | Type   | Description    |
| ------------- | ------ | -------------- |
| `name`        | string | Policy name    |
| `description` | string | Policy details |

## API Endpoints

```bash
# Equipment
GET    /api/equipment
POST   /api/equipment
PUT    /api/equipment/:id
DELETE /api/equipment/:id

# Equipment Sharing
GET    /api/equipment-sharing
POST   /api/equipment-sharing
PUT    /api/equipment-sharing/:id

# Policies
GET    /api/equipment-sharing-policy
POST   /api/equipment-sharing-policy
```

## Related Pages

- [HRM Features](../features/hrm-overview)
- [Products & Inventory](./products-and-inventory)
- [Approval Workflows](./approval-workflows)
