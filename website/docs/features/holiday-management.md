---
sidebar_position: 74
---

# Holiday Management

Configure organization-specific holidays and non-working days.

## Setting Up Holidays

1. Go to **Settings** → **Holidays**
2. Click **Add Holiday**
3. Enter:
   - Holiday name
   - Date
   - Recurring (annual) or one-time
   - Half-day option
4. Save

## Default Holiday Calendars

Import holidays by country:

1. Go to **Settings** → **Holidays** → **Import**
2. Select country
3. Select year
4. Review and confirm
5. Holidays are added to the calendar

## Holiday Types

| Type            | Description                   |
| --------------- | ----------------------------- |
| Public Holiday  | Government-declared           |
| Company Holiday | Organization-specific         |
| Floating        | Employee chooses when to take |
| Half Day        | Work half the day             |

## Impact on Features

| Feature       | Holiday Behavior             |
| ------------- | ---------------------------- |
| Time Tracking | Excluded from expected hours |
| Timesheets    | Marked as holiday            |
| Payroll       | Paid holiday (configurable)  |
| Scheduling    | Blocked for appointments     |

## API Usage

```json
GET /api/organization-holiday
POST /api/organization-holiday
```

## Related Pages

- [Time Off Management](./time-off-management) — leave requests
- [Calendar Features](./calendar-integration) — calendar view
- [Organization Settings](./organization-settings) — org config
