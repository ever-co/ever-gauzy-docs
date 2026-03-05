---
sidebar_position: 47
---

# Employee Availability Management

Configure and manage employee working hours and availability.

## Overview

Employee availability management allows:

- Define regular working hours per employee
- Set availability for appointment scheduling
- Mark time-off and unavailable periods
- Recurring schedule patterns

## Configuring Availability

### Set Working Hours

1. Navigate to **Employees** → select employee → **Availability**
2. Set weekly schedule:
   - Monday–Friday: 9:00 AM – 5:00 PM
   - Weekend: Off
3. Save availability

### Availability Slots

Availability slots define when an employee is open for meetings:

```json
{
  "dayOfWeek": 1,
  "startTime": "09:00",
  "endTime": "17:00",
  "isActive": true
}
```

## Event Types

Configure appointment types with duration and availability:

| Setting       | Description                 |
| ------------- | --------------------------- |
| Duration      | Meeting length (15-120 min) |
| Buffer Before | Gap before meeting          |
| Buffer After  | Gap after meeting           |
| Max per Day   | Maximum appointments/day    |

## Calendar Integration

Sync with Google Calendar for real-time availability. See [Google Calendar Integration](../integrations/google-calendar-integration).

## Related Pages

- [Employee Availability Endpoints](../api/employee-availability-endpoints) — API
- [Event Scheduling](./event-scheduling) — scheduling features
- [Google Calendar](../integrations/google-calendar-integration) — calendar sync
