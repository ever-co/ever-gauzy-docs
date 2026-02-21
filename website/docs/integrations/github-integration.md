---
sidebar_position: 2
---

# GitHub Integration

Bi-directional synchronization between GitHub repositories and Gauzy projects/tasks.

## Features

- **Issue sync** — GitHub issues ↔ Gauzy tasks
- **PR linking** — link pull requests to tasks
- **Status sync** — issue status maps to task status
- **Label sync** — GitHub labels map to task tags
- **Webhook events** — real-time updates via webhooks
- **Multi-repo** — connect multiple repositories

## Setup

### 1. Install GitHub App

Navigate to **Settings → Integrations → GitHub** and install the Gauzy GitHub App on your organization.

### 2. Configure Repository Mapping

Map GitHub repositories to Gauzy projects:

| GitHub Repo    | →   | Gauzy Project |
| -------------- | --- | ------------- |
| `org/frontend` | →   | Frontend App  |
| `org/backend`  | →   | Backend API   |

### 3. Entity Sync Settings

| Entity               | Sync Direction | Default |
| -------------------- | :------------: | :-----: |
| Issues → Tasks       |   ✅ Import    |   On    |
| Tasks → Issues       |   ✅ Export    |   Off   |
| Labels → Tags        |   ✅ Import    |   On    |
| Milestones → Sprints |   ✅ Import    |   Off   |

## Configuration

```bash
GAUZY_GITHUB_APP_ID=123456
GAUZY_GITHUB_APP_NAME=ever-gauzy-dev
GAUZY_GITHUB_APP_PRIVATE_KEY=base64-encoded-private-key
GAUZY_GITHUB_WEBHOOK_SECRET=your-webhook-secret
GAUZY_GITHUB_CALLBACK_URL=https://api.yourdomain.com/api/integration/github/callback
GAUZY_GITHUB_POST_INSTALL_URL=https://app.yourdomain.com/pages/integrations/github/setup
```

## Webhook Events

Handled webhook events:

| Event                  | Action               |
| ---------------------- | -------------------- |
| `issues.opened`        | Create task          |
| `issues.edited`        | Update task          |
| `issues.closed`        | Close task           |
| `issues.reopened`      | Reopen task          |
| `issues.labeled`       | Add tag              |
| `issues.unlabeled`     | Remove tag           |
| `pull_request.opened`  | Link PR to task      |
| `pull_request.merged`  | Update task status   |
| `installation.created` | Activate integration |

## Status Mapping

| GitHub Issue State | Gauzy Task Status |
| ------------------ | ----------------- |
| `open`             | Open              |
| `closed`           | Done              |

## Related Pages

- [Integrations Overview](./integrations-overview)
- [Task Management](../features/task-management)
- [Integration Endpoints](../api/integration-endpoints)
