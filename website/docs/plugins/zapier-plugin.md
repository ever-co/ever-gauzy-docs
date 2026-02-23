---
sidebar_position: 4
---

# Zapier Plugin

Connect Ever Gauzy with 5,000+ apps through Zapier automation workflows.

## Overview

| Property       | Value                                      |
| -------------- | ------------------------------------------ |
| **Package**    | `@ever-co/gauzy-plugin-integration-zapier` |
| **Source**     | `packages/plugins/integration-zapier`      |
| **UI Package** | `packages/plugins/integration-zapier-ui`   |

## Features

- **Triggers** — fire Zaps when events occur in Gauzy
- **Actions** — create/update Gauzy records from other apps
- **Multi-Step Workflows** — chain Gauzy actions with other services

## Supported Triggers

| Trigger             | Description                |
| ------------------- | -------------------------- |
| New Employee        | Employee is created        |
| New Time Log        | Time log is recorded       |
| Timer Started       | Employee starts the timer  |
| Timer Stopped       | Employee stops the timer   |
| Task Status Changed | Task moves to a new status |
| Invoice Created     | New invoice is generated   |
| Payment Received    | Payment is recorded        |

## Supported Actions

| Action          | Description                |
| --------------- | -------------------------- |
| Create Employee | Add a new employee         |
| Create Time Log | Log time for an employee   |
| Create Task     | Create a new task          |
| Create Project  | Create a new project       |
| Create Invoice  | Generate an invoice        |
| Update Task     | Update task status/details |

## Configuration

```bash
# Zapier Integration
ZAPIER_CLIENT_ID=your-client-id
ZAPIER_CLIENT_SECRET=your-client-secret
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
```

## Example Zap

**"When a timer stops in Gauzy, create a Toggl entry and send a Slack message"**

1. **Trigger**: Timer Stopped in Gauzy
2. **Action 1**: Create time entry in Toggl
3. **Action 2**: Send message to Slack channel

## Related Pages

- [Plugins Overview](./plugins-overview)
- [Webhooks](../integrations/webhooks) — direct webhook integration
- [Make Plugin](./make-plugin) — alternative automation platform
