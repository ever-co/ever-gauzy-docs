---
sidebar_position: 5
---

# Jira Integration

Synchronize Jira issues, sprints, and projects with Ever Gauzy.

## Features

- **Issue sync** — Jira issues ↔ Gauzy tasks
- **Sprint mapping** — Jira sprints → Gauzy sprints
- **Status sync** — Jira workflow → task statuses
- **Priority mapping** — Jira priorities → Gauzy priorities
- **Project linking** — Jira projects → Gauzy projects

## Setup

```bash
JIRA_URL=https://your-domain.atlassian.net
JIRA_API_TOKEN=your-jira-api-token
JIRA_USER_EMAIL=your-jira-email
```

### Configuration

1. Navigate to **Settings → Integrations → Jira**
2. Enter your Jira URL and API token
3. Select projects to sync
4. Configure status mapping

## Status Mapping

| Jira Status | Gauzy Task Status |
| ----------- | ----------------- |
| To Do       | Open              |
| In Progress | In Progress       |
| In Review   | Ready for Review  |
| Done        | Done              |

## Priority Mapping

| Jira Priority | Gauzy Priority |
| ------------- | -------------- |
| Highest       | Urgent         |
| High          | High           |
| Medium        | Medium         |
| Low           | Low            |
| Lowest        | Low            |

## Sync Direction

| Entity         | Import | Export |
| -------------- | :----: | :----: |
| Issues → Tasks |   ✅   |   ✅   |
| Sprints        |   ✅   |   ❌   |
| Statuses       |   ✅   |   ❌   |
| Labels         |   ✅   |   ❌   |

## Related Pages

- [Integrations Overview](./integrations-overview)
- [Task Management](../features/task-management)
- [Project Management](../features/project-management)
