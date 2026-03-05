---
sidebar_position: 11
---

# Slack Integration

Receive notifications and interact with Gauzy from Slack.

## Overview

The Slack integration enables:

- Timer notifications in Slack channels
- Task status updates
- Time tracking from Slack commands
- Daily digest messages
- Timesheet approval notifications

## Setup

### 1. Create Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app from scratch
3. Enable **Incoming Webhooks**
4. Add **Bot Token Scopes**: `chat:write`, `commands`
5. Install to workspace

### 2. Configure

Set environment variables:

```
GAUZY_SLACK_CLIENT_ID=your-client-id
GAUZY_SLACK_CLIENT_SECRET=your-client-secret
GAUZY_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

### 3. Connect in Gauzy

1. Navigate to **Integrations** → **Slack**
2. Click **Connect**
3. Select the Slack workspace
4. Choose the notification channel

## Notification Types

| Event              | Slack Message              |
| ------------------ | -------------------------- |
| Timer started      | "🟢 John started tracking" |
| Timer stopped      | "🔴 John stopped (2h 30m)" |
| Timesheet approved | "✅ Timesheet approved"    |
| Task assigned      | "📋 New task assigned"     |

## Related Pages

- [Microsoft Teams Integration](./teams-integration) — Teams alternative
- [Employee Notifications](../features/employee-notifications) — notification settings
