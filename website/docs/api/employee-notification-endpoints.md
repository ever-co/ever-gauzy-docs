---
sidebar_position: 52
---

# Employee Notification Endpoints

Manage employee notification preferences and settings.

## Base Path

```
/api/employee-notification-setting
```

## Endpoints

### Get Notification Settings

```
GET /api/employee-notification-setting
Authorization: Bearer {token}
```

**Response:**

```json
{
  "assignTask": true,
  "teams": true,
  "mention": true,
  "submit": true,
  "approval": true,
  "email": false,
  "push": true,
  "inApp": true
}
```

### Update Notification Settings

```
PUT /api/employee-notification-setting/:id
Authorization: Bearer {token}
```

```json
{
  "assignTask": true,
  "teams": true,
  "mention": true,
  "submit": true,
  "approval": true,
  "email": true,
  "push": true,
  "inApp": true
}
```

## Notification Events

| Event        | Description               | Channels |
| ------------ | ------------------------- | -------- |
| `assignTask` | Task assigned to employee | All      |
| `teams`      | Team updates              | In-app   |
| `mention`    | @mentioned in comment     | All      |
| `submit`     | Timesheet submitted       | Email    |
| `approval`   | Timesheet approved/denied | All      |

## Related Pages

- [Notification System](../features/notification-system) — feature guide
- [Employee Endpoints](./employee-endpoints) — employee API
- [Real-Time Updates](../frontend/real-time-updates) — WebSocket
