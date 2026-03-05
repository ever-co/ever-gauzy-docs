---
sidebar_position: 37
---

# Entity Subscription Endpoints

Subscribe to entities (tasks, projects, etc.) to receive notifications when changes occur.

## Base Path

```
/api/entity-subscription
```

## Endpoints

### List Subscriptions

```
GET /api/entity-subscription
Authorization: Bearer {token}
```

### Create Subscription

```
POST /api/entity-subscription
Authorization: Bearer {token}
Content-Type: application/json

{
  "entity": "Task",
  "entityId": "task-uuid",
  "type": "COMMENT"
}
```

### Delete Subscription

```
DELETE /api/entity-subscription/:id
Authorization: Bearer {token}
```

## Subscription Types

| Type         | Notification Trigger  |
| ------------ | --------------------- |
| `COMMENT`    | New comment on entity |
| `STATUS`     | Status change         |
| `ASSIGNMENT` | Assignment change     |
| `ALL`        | All changes           |

## Data Model

```typescript
interface IEntitySubscription {
  id: string;
  entity: string;
  entityId: string;
  type: EntitySubscriptionTypeEnum;
  employeeId: string;
  organizationId: string;
  tenantId: string;
}
```

## Related Pages

- [Entity Subscriptions Feature](../features/entity-subscriptions) — feature guide
- [Employee Notifications](../features/employee-notifications) — notification system
