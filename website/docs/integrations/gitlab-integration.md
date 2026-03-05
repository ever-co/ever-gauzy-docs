---
sidebar_position: 10
---

# GitLab Integration

Connect Ever Gauzy with GitLab for commit tracking, time synchronization, and project management.

## Overview

The GitLab integration syncs:

- Commits → linked to time logs and tasks
- Issues → mapped to Gauzy tasks
- Merge requests → tracked as activity

## Setup

### 1. Create GitLab Application

1. Go to GitLab → **Settings** → **Applications**
2. Set redirect URI to `{API_BASE_URL}/api/integration/gitlab/callback`
3. Select scopes: `api`, `read_user`, `read_repository`
4. Note the Application ID and Secret

### 2. Configure Gauzy

Set environment variables:

```
GAUZY_GITLAB_CLIENT_ID=your-app-id
GAUZY_GITLAB_CLIENT_SECRET=your-app-secret
GAUZY_GITLAB_CALLBACK_URL=http://localhost:3000/api/integration/gitlab/callback
```

### 3. Connect in Gauzy

1. Navigate to **Integrations** → **GitLab**
2. Click **Connect**
3. Authorize the GitLab application
4. Select repositories to sync

## Synced Data

| GitLab Entity | Gauzy Entity         | Sync Direction |
| ------------- | -------------------- | -------------- |
| Project       | Organization Project | GitLab → Gauzy |
| Issue         | Task                 | Bidirectional  |
| Commit        | Activity             | GitLab → Gauzy |
| Merge Request | Task activity        | GitLab → Gauzy |
| User          | Employee             | GitLab → Gauzy |

## Related Pages

- [GitHub Integration](./github-integration) — GitHub setup
- [Integration Endpoints](../api/integration-endpoints) — API reference
- [Custom Integrations](./custom-integrations) — build your own
