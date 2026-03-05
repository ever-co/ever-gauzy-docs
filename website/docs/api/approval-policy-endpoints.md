---
sidebar_position: 21
---

# Approval Policy Endpoints

Manage approval policies for time-off requests, expense reports, and equipment sharing.

## Base Path

```
/api/approval-policy
```

## Endpoints

### List Approval Policies

```
GET /api/approval-policy
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter | Type   | Description    |
| --------- | ------ | -------------- |
| `page`    | number | Page number    |
| `limit`   | number | Items per page |

### Get Policy by ID

```
GET /api/approval-policy/:id
Authorization: Bearer {token}
```

### Create Approval Policy

```
POST /api/approval-policy
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "Time Off Approval",
  "description": "Policy for time-off requests",
  "approvalAlgorithm": "SEQUENTIAL",
  "approverGroups": [
    {
      "approverIds": ["employee-uuid-1", "employee-uuid-2"],
      "approvalMinCount": 1
    }
  ]
}
```

### Update Policy

```
PUT /api/approval-policy/:id
Authorization: Bearer {token}
```

### Delete Policy

```
DELETE /api/approval-policy/:id
Authorization: Bearer {token}
```

## Approval Algorithms

| Algorithm    | Description                            |
| ------------ | -------------------------------------- |
| `SEQUENTIAL` | Approvers must approve in order        |
| `PARALLEL`   | Any approver can approve independently |

## Permissions

| Action | Required Permission    |
| ------ | ---------------------- |
| View   | `APPROVAL_POLICY_VIEW` |
| Edit   | `APPROVAL_POLICY_EDIT` |

## Related Pages

- [Time Off Management](../features/time-off-management) — time-off approvals
- [Equipment Sharing](../features/equipment-sharing) — equipment approvals
- [Approval Workflows](../features/approval-workflows) — workflow features
