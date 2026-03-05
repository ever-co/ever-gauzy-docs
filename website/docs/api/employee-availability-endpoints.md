---
sidebar_position: 40
---

# Employee Availability Endpoints

Manage employee schedules, availability slots, appointments, and event types.

## Base Paths

| Resource              | Path                        |
| --------------------- | --------------------------- |
| Availability Slots    | `/api/availability-slots`   |
| Employee Appointments | `/api/employee-appointment` |
| Event Types           | `/api/event-type`           |

## Availability Slot Endpoints

### List Availability Slots

```
GET /api/availability-slots
Authorization: Bearer {token}
```

### Create Availability Slot

```
POST /api/availability-slots
Authorization: Bearer {token}
Content-Type: application/json

{
  "startTime": "2024-03-15T09:00:00.000Z",
  "endTime": "2024-03-15T17:00:00.000Z",
  "allDay": false,
  "type": "DEFAULT",
  "employeeId": "uuid",
  "organizationId": "uuid"
}
```

### Update Availability Slot

```
PUT /api/availability-slots/:id
Authorization: Bearer {token}
```

### Delete Availability Slot

```
DELETE /api/availability-slots/:id
Authorization: Bearer {token}
```

## Employee Appointment Endpoints

### List Appointments

```
GET /api/employee-appointment
Authorization: Bearer {token}
```

### Create Appointment

```
POST /api/employee-appointment
Authorization: Bearer {token}
Content-Type: application/json

{
  "employeeId": "uuid",
  "agenda": "Sprint Planning Meeting",
  "description": "Bi-weekly sprint planning",
  "location": "Conference Room A",
  "startDateTime": "2024-03-15T10:00:00.000Z",
  "endDateTime": "2024-03-15T11:00:00.000Z",
  "bufferTimeStart": false,
  "bufferTimeEnd": true,
  "bufferTimeInMins": 15,
  "invitees": [{ "employeeId": "uuid" }]
}
```

### Update Appointment

```
PUT /api/employee-appointment/:id
Authorization: Bearer {token}
```

### Delete Appointment

```
DELETE /api/employee-appointment/:id
Authorization: Bearer {token}
```

## Event Type Endpoints

### List Event Types

```
GET /api/event-type
Authorization: Bearer {token}
```

### Create Event Type

```
POST /api/event-type
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "1:1 Meeting",
  "description": "Individual check-in",
  "duration": 30,
  "durationUnit": "Minute(s)",
  "isActive": true,
  "employeeId": "uuid",
  "organizationId": "uuid"
}
```

## Data Model

```typescript
interface IAvailabilitySlot {
  id: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  type: string;
  employeeId: string;
  organizationId: string;
  tenantId: string;
}

interface IEmployeeAppointment {
  id: string;
  employeeId: string;
  agenda: string;
  description?: string;
  location?: string;
  startDateTime: Date;
  endDateTime: Date;
  bufferTimeStart?: boolean;
  bufferTimeEnd?: boolean;
  bufferTimeInMins?: number;
  breakTimeInMins?: number;
  breakStartTime?: Date;
  invitees?: IAppointmentEmployee[];
}

interface IEventType {
  id: string;
  title: string;
  description?: string;
  duration: number;
  durationUnit: string;
  isActive: boolean;
  employeeId?: string;
  organizationId: string;
  tenantId: string;
}
```

## Related Pages

- [Event Scheduling Feature](../features/event-scheduling) — feature guide
- [Employee Endpoints](./employee-endpoints) — employee management
