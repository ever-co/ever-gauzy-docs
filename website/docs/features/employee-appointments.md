---
sidebar_position: 63
---

# Employee Appointments

Schedule and manage employee appointments.

## Overview

The appointment system allows:

- Schedule 1:1 and group meetings
- Integration with calendar apps
- Email notifications
- Recurring appointments

## Creating Appointments

1. Go to **Employees** → select employee → **Appointments**
2. Click **New Appointment**
3. Fill in:
   - **Title** and description
   - **Date and time**
   - **Duration**
   - **Attendees**
   - **Location** (in-person or video link)
4. Save

## Appointment Types

Use [Event Types](./event-scheduling) to define standard appointment templates:

| Type         | Duration | Buffer |
| ------------ | -------- | ------ |
| Quick Chat   | 15 min   | 5 min  |
| 1:1 Meeting  | 30 min   | 10 min |
| Team Standup | 15 min   | 0 min  |
| Client Call  | 60 min   | 15 min |
| Interview    | 45 min   | 15 min |

## Calendar Integration

Appointments sync with:

- Google Calendar (see [Google Calendar Integration](../integrations/google-calendar-integration))
- External calendar via iCal export

## Notifications

- Email confirmation sent to all attendees
- Reminder 15 minutes before (configurable)
- Cancellation notifications

## API

See [Employee Availability Endpoints](../api/employee-availability-endpoints).

## Related Pages

- [Event Scheduling](./event-scheduling) — event types
- [Employee Availability](./employee-availability) — availability
- [Google Calendar](../integrations/google-calendar-integration) — calendar sync
