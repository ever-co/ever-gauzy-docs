---
sidebar_position: 12
---

# Microsoft Teams Integration

Receive notifications and interact with Gauzy from Microsoft Teams.

## Overview

Similar to the Slack integration, Microsoft Teams enables:

- Channel notifications for team activity
- Time tracking status updates
- Task assignment notifications

## Setup

### 1. Register Azure AD App

1. Go to Azure Portal → **App registrations**
2. Register a new application
3. Add API permissions: `Channel.ReadBasic.All`, `ChannelMessage.Send`
4. Generate a client secret

### 2. Configure

```
GAUZY_TEAMS_CLIENT_ID=your-azure-app-id
GAUZY_TEAMS_CLIENT_SECRET=your-secret
GAUZY_TEAMS_TENANT_ID=your-azure-tenant-id
```

### 3. Connect in Gauzy

1. Navigate to **Integrations** → **Microsoft Teams**
2. Click **Connect**
3. Authenticate with Microsoft
4. Select channels for notifications

## Related Pages

- [Slack Integration](./slack-integration) — Slack alternative
- [Employee Notifications](../features/employee-notifications) — notifications
