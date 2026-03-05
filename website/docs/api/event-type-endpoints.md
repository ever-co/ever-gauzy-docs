---
sidebar_position: 44
---

# Event Type Endpoints

Manage event types for employee appointment scheduling.

## Base Path

```
/api/event-type
```

## Endpoints

### List Event Types

```
GET /api/event-type
Authorization: Bearer {token}
```

**Response:**

```json
{
  "items": [
    {
      "id": "uuid",
      "title": "30-Minute Meeting",
      "description": "Quick sync meeting",
      "durationUnit": "Minute(s)",
      "duration": 30,
      "isActive": true,
      "employeeId": "uuid"
    }
  ],
  "total": 5
}
```

### Create Event Type

```
POST /api/event-type
Authorization: Bearer {token}
```

```json
{
  "title": "1-Hour Consultation",
  "description": "Detailed consultation session",
  "durationUnit": "Minute(s)",
  "duration": 60,
  "isActive": true
}
```

### Update Event Type

```
PUT /api/event-type/:id
Authorization: Bearer {token}
```

### Delete Event Type

```
DELETE /api/event-type/:id
Authorization: Bearer {token}
```

## Duration Units

| Unit        | Description |
| ----------- | ----------- |
| `Minute(s)` | Minutes     |
| `Hour(s)`   | Hours       |
| `Day(s)`    | Days        |

## Related Pages

- [Event Scheduling](../features/event-scheduling) — scheduling feature
- [Employee Availability](../features/employee-availability) — availability
- [Google Calendar](../integrations/google-calendar-integration) — calendar sync
