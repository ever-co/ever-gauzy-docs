---
sidebar_position: 89
---

# Notification Preferences

Configure how and when you receive notifications.

## Preference Categories

| Category         | In-App | Email | Push |
| ---------------- | ------ | ----- | ---- |
| Task assigned    | ✅     | ✅    | ✅   |
| Task updated     | ✅     | ❌    | ❌   |
| @mentioned       | ✅     | ✅    | ✅   |
| Timesheet status | ✅     | ✅    | ❌   |
| Expense status   | ✅     | ✅    | ❌   |
| Team activity    | ✅     | ❌    | ❌   |
| Timer reminders  | ✅     | ❌    | ✅   |
| Invoice status   | ✅     | ✅    | ❌   |

## Configuring Preferences

1. Click **Profile** → **Notification Preferences**
2. Toggle each category on/off per channel
3. Set quiet hours (no push notifications)
4. Save

## Quiet Hours

Configure do-not-disturb:

- **Start time**: e.g., 10:00 PM
- **End time**: e.g., 8:00 AM
- **Days**: weekdays only, all days
- During quiet hours: suppress push, defer email

## Email Digest

Instead of individual emails:

1. **Instant**: Each event triggers email
2. **Hourly digest**: Batched every hour
3. **Daily digest**: Once per day summary
4. **Off**: No email notifications

## API

```
GET /api/employee-notification-setting
PUT /api/employee-notification-setting
```

## Related Pages

- [Notification System](./notification-system) — notification features
- [Notification Architecture](../architecture/notification-architecture) — architecture
- [Email Templates](./email-templates-deep-dive) — email config
