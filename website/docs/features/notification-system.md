---
sidebar_position: 56
---

# Notification System

Configure and manage notifications across the platform.

## Notification Types

| Type   | Channel        | Description             |
| ------ | -------------- | ----------------------- |
| In-app | Web/Desktop    | Bell icon notifications |
| Email  | SMTP           | Email notifications     |
| Push   | Browser/Mobile | Push notifications      |

## In-App Notifications

### Viewing

1. Click the **Bell (🔔)** icon in the header
2. View unread/read notifications
3. Click to navigate to the related entity
4. Mark all as read

### Notification Events

| Event               | Recipients        |
| ------------------- | ----------------- |
| Task assigned       | Assignee          |
| Timesheet submitted | Manager           |
| Timesheet approved  | Employee          |
| Invoice paid        | Invoice creator   |
| Comment on task     | Task participants |
| Mention (@user)     | Mentioned user    |
| Equipment request   | Approvers         |

## Configuration

### Per-Employee Settings

1. Go to **Profile** → **Notification Settings**
2. Toggle notification types per event
3. Set quiet hours

### Organization Settings

Admins can configure:

- Default notification preferences
- Required notifications (cannot be disabled)
- Email digest frequency

## API

See [Employee Notification Endpoints](../api/employee-sub-resource-endpoints#notification-settings).

## Related Pages

- [Employee Notifications](./employee-notifications) — notification feature
- [Email Templates](./email-templates) — email templates
- [Real-Time Updates](../frontend/real-time-updates) — WebSocket
