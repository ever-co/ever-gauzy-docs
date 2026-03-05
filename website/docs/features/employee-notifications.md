---
sidebar_position: 37
---

# Employee Notifications

Configure notification preferences and view notification history.

## Overview

The employee notification system provides:

- Real-time in-app notifications
- Configurable notification preferences per employee
- Notification history and read/unread tracking

## Notification Settings

Each employee can customize which events trigger notifications:

| Setting               | Default | Description                         |
| --------------------- | ------- | ----------------------------------- |
| `assignTask`          | ✅      | Notified when assigned to a task    |
| `unassignTask`        | ✅      | Notified when removed from a task   |
| `createdTask`         | ✅      | Notified when a new task is created |
| `mentionedInComment`  | ✅      | Notified when @mentioned            |
| `commentOnTask`       | ✅      | Notified on new task comments       |
| `statusChangeForTask` | ✅      | Notified on task status changes     |

## Notification Types

- **In-App** — displayed in the bell icon dropdown
- **Email** — sent to the user's email address (requires SMTP configuration)

## Viewing Notifications

1. Click the 🔔 bell icon in the header
2. View unread notifications
3. Click a notification to navigate to the related entity
4. Mark individual or all notifications as read

## API Reference

See [Comment & Mention Endpoints](../api/comment-mention-endpoints) for notification-triggering events.

## Related Pages

- [Entity Subscriptions](./entity-subscriptions) — subscribe to entity changes
- [Custom SMTP](./custom-smtp) — email notification delivery
- [Email Templates](./email-templates) — notification email templates
