---
sidebar_position: 27
---

# Equipment Sharing Endpoints

Manage equipment sharing requests and policies between employees.

## Base Path

```
/api/equipment-sharing
```

## Endpoints

### List Sharing Requests

```
GET /api/equipment-sharing
Authorization: Bearer {token}
```

### Get by Employee

```
GET /api/equipment-sharing/employee/:id
Authorization: Bearer {token}
```

### Get by Organization

```
GET /api/equipment-sharing/organization
Authorization: Bearer {token}
```

### Create Sharing Request

```
POST /api/equipment-sharing
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "MacBook Pro Sharing",
  "equipmentId": "equipment-uuid",
  "shareRequestDay": "2025-01-15",
  "shareStartDay": "2025-01-20",
  "shareEndDay": "2025-02-20",
  "status": "REQUESTED",
  "employees": ["employee-uuid-1"]
}
```

### Update Request

```
PUT /api/equipment-sharing/:id
Authorization: Bearer {token}
```

### Delete Request

```
DELETE /api/equipment-sharing/:id
Authorization: Bearer {token}
```

## Sharing Statuses

| Status      | Description                |
| ----------- | -------------------------- |
| `REQUESTED` | Request submitted          |
| `APPROVED`  | Request approved           |
| `REJECTED`  | Request rejected           |
| `ACTIVE`    | Equipment currently shared |
| `RETURNED`  | Equipment returned         |

## Permissions

| Action | Required Permission          |
| ------ | ---------------------------- |
| View   | `ORG_EQUIPMENT_SHARING_VIEW` |
| Edit   | `ORG_EQUIPMENT_SHARING_EDIT` |

## Related Pages

- [Equipment Endpoints](./equipment-endpoints) — equipment management
- [Approval Policy Endpoints](./approval-policy-endpoints) — approval workflows
- [Equipment Management](../features/equipment-management) — feature guide
