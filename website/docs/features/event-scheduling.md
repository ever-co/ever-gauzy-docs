---
sidebar_position: 46
---

# Event Scheduling

Manage employee availability, appointments, and event types for scheduling.

## Overview

Gauzy provides scheduling capabilities to manage employee availability windows, create appointments, and define reusable event types for meetings and check-ins.

## Availability Slots

Define when employees are available for meetings and work:

| Field      | Description           |
| ---------- | --------------------- |
| Start Time | Available from        |
| End Time   | Available until       |
| All Day    | Full-day availability |
| Type       | Slot type             |

## Appointments

Schedule meetings with buffer time and invitees:

| Field          | Description           |
| -------------- | --------------------- |
| Agenda         | Meeting topic         |
| Description    | Detailed description  |
| Location       | Meeting location/link |
| Start DateTime | Start time            |
| End DateTime   | End time              |
| Buffer Start   | Buffer before meeting |
| Buffer End     | Buffer after meeting  |
| Invitees       | Invited employees     |

## Event Types

Define reusable event templates:

| Field     | Description      |
| --------- | ---------------- |
| Title     | Event type name  |
| Duration  | Default duration |
| Is Active | Whether bookable |

## API Reference

See [Employee Availability Endpoints](../api/employee-availability-endpoints) for the API documentation.

## Related Pages

- [Employee Management](./employee-management) — employee profiles
- [Time Off Management](./time-off) — time off requests
