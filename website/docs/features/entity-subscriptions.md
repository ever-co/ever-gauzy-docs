---
sidebar_position: 36
---

# Entity Subscriptions

Subscribe to entities to receive notifications when changes occur.

## Overview

Entity subscriptions allow users to watch specific tasks, projects, or other entities and receive notifications when changes happen — similar to "Watch" functionality in GitHub.

## Subscription Types

| Type         | Description                        |
| ------------ | ---------------------------------- |
| `COMMENT`    | Notify when new comments are added |
| `STATUS`     | Notify when status changes         |
| `ASSIGNMENT` | Notify when assignees change       |
| `ALL`        | Notify on all changes              |

## How to Subscribe

1. Open the entity detail view (e.g., task, project)
2. Click the **Subscribe** / 🔔 bell icon
3. Select the subscription type

## Notification Delivery

Subscription notifications are delivered through:

- **In-app notifications** — bell icon in the top bar
- **Email notifications** — if configured in employee notification settings

## API Reference

See [Entity Subscription Endpoints](../api/entity-subscription-endpoints) for the API documentation.

## Related Pages

- [Employee Notifications](./employee-notifications) — notification settings
- [Comments & Mentions](./comments-and-mentions) — commenting system
