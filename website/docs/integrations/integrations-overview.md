---
sidebar_position: 1
---

# Integrations Overview

Ever Gauzy integrates with popular third-party services for project management, time tracking, hiring, and communication.

## Available Integrations

| Integration      | Category             | Sync Direction |
| ---------------- | -------------------- | :------------: |
| **GitHub**       | Project Management   | Bi-directional |
| **Upwork**       | Freelance Management |     Import     |
| **HubStaff**     | Time Tracking        |     Import     |
| **Jira**         | Project Management   | Bi-directional |
| **Wakatime**     | Activity Tracking    |     Import     |
| **Activepieces** | Automation           | Bi-directional |

## Integration Architecture

```
External Service
     │
     ├── Webhooks ──→ Integration Handler ──→ Create/Update Entities
     │
     └── API Polling ──→ Sync Service ──→ Create/Update Entities
```

## Entity Synchronization

Integrations map external entities to Gauzy entities:

| External          | Gauzy Entity  | Mapping                    |
| ----------------- | ------------- | -------------------------- |
| GitHub Issue      | Task          | title, description, status |
| GitHub PR         | Task (linked) | PR reference               |
| Upwork Contract   | Employee      | billing, hours             |
| HubStaff Activity | TimeLog       | duration, screenshots      |
| Jira Issue        | Task          | title, priority, status    |

## Integration Settings

Each integration stores:

| Field            | Description                   |
| ---------------- | ----------------------------- |
| `name`           | Integration name              |
| `entitySettings` | Which entities to sync        |
| `settingsMap`    | Configuration key-value pairs |
| `lastSyncedAt`   | Last sync timestamp           |
| `isActive`       | Active/disabled status        |

## Configuration

```bash
# GitHub
GAUZY_GITHUB_APP_ID=your-github-app-id
GAUZY_GITHUB_APP_NAME=your-github-app-name
GAUZY_GITHUB_APP_PRIVATE_KEY=base64-encoded-key
GAUZY_GITHUB_WEBHOOK_SECRET=webhook-secret
GAUZY_GITHUB_CALLBACK_URL=https://api.yourdomain.com/api/integration/github/callback

# Upwork
UPWORK_API_KEY=your-upwork-key
UPWORK_API_SECRET=your-upwork-secret
UPWORK_REDIRECT_URL=https://api.yourdomain.com/api/integration/upwork/callback

# HubStaff
HUBSTAFF_CLIENT_ID=your-hubstaff-id
HUBSTAFF_CLIENT_SECRET=your-hubstaff-secret
HUBSTAFF_REDIRECT_URL=https://api.yourdomain.com/api/integration/hubstaff/callback

# Jira
JIRA_URL=https://your-domain.atlassian.net
JIRA_API_TOKEN=your-jira-api-token
JIRA_USER_EMAIL=your-jira-email

# Activepieces
ACTIVEPIECES_BASE_URL=https://cloud.activepieces.com
GAUZY_ACTIVEPIECES_API_URL=https://api.activepieces.com/v1
GAUZY_ACTIVEPIECES_API_KEY=your-activepieces-api-key
```

## Related Pages

- [GitHub Integration](./github-integration)
- [Upwork Integration](./upwork-integration)
- [HubStaff Integration](./hubstaff-integration)
- [Jira Integration](./jira-integration)
- [Activepieces Plugin](../plugins/activepieces-plugin) — open-source automation
- [Integration Endpoints](../api/integration-endpoints) — API reference
