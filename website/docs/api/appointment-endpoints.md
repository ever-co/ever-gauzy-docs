---
sidebar_position: 64
---

# Appointment Endpoints

Manage employee appointments and scheduling.

## Base Path

```
/api/appointment-employee
```

## Endpoints

### List Appointments

```
GET /api/appointment-employee
Authorization: Bearer {token}
```

### Create Appointment

```
POST /api/appointment-employee
Authorization: Bearer {token}
```

```json
{
  "employeeId": "employee-uuid",
  "agenda": "Q1 Performance Review",
  "description": "Quarterly review meeting",
  "location": "Google Meet",
  "startDateTime": "2025-03-10T10:00:00.000Z",
  "endDateTime": "2025-03-10T11:00:00.000Z",
  "bufferTimeStart": false,
  "bufferTimeEnd": false,
  "bufferTimeInMins": 0,
  "invitees": [{ "id": "employee-uuid-2" }]
}
```

### Update Appointment

```
PUT /api/appointment-employee/:id
Authorization: Bearer {token}
```

### Delete Appointment

```
DELETE /api/appointment-employee/:id
Authorization: Bearer {token}
```

### Sign Appointment

```
PUT /api/appointment-employee/:id/sign
Authorization: Bearer {token}
```

## Related Pages

- [Employee Appointments](../features/employee-appointments) — feature guide
- [Interview Scheduling](../features/interview-scheduling) — interviews
- [Calendar Integration](../features/calendar-integration) — calendar
