---
sidebar_position: 14
---

# Project Management

Create and manage projects with billing, budgets, team assignments, and integration sync.

## Project Features

- **Multiple billing types** — hourly, flat fee, milestone-based
- **Budget tracking** — cost or hours-based budgets
- **Team assignments** — assign employees and teams
- **Client linking** — associate with organization contacts
- **Task views** — grid (Kanban) or sprint board
- **Integration sync** — GitHub, Jira issue synchronization
- **Module organization** — organize tasks into project modules

## Project Configuration

| Field          | Description               |
| -------------- | ------------------------- |
| `billing`      | RATE, FLAT, or MILESTONES |
| `budgetType`   | COST or HOURS             |
| `budget`       | Budget amount/hours       |
| `taskListType` | GRID or SPRINT            |
| `startDate`    | Project start             |
| `endDate`      | Project deadline          |
| `color`        | Display color             |

## Project Modules

Organize related tasks into logical groups:

```
Project: "Gauzy Platform"
├── Module: Authentication
│   ├── Task: Login page
│   └── Task: OAuth integration
├── Module: Dashboard
│   ├── Task: Analytics widgets
│   └── Task: Data visualization
└── Module: API
    ├── Task: REST endpoints
    └── Task: GraphQL schema
```

## Sprint Management

For projects using sprint-based workflow:

| Field       | Description               |
| ----------- | ------------------------- |
| `name`      | Sprint name               |
| `goal`      | Sprint goal description   |
| `startDate` | Sprint start              |
| `endDate`   | Sprint end                |
| `length`    | Sprint duration (days)    |
| `status`    | Active, Completed, Future |

## Integration Features

### GitHub Sync

- Auto-create tasks from GitHub issues
- Sync task status with issue status
- Link pull requests to tasks
- Auto-close tasks on PR merge

### Jira Sync

- Import Jira issues as tasks
- Bi-directional status sync
- Sprint mapping

## Permissions

| Action               | Permission         |
| -------------------- | ------------------ |
| View projects        | `ORG_PROJECT_VIEW` |
| Create/edit projects | `ORG_PROJECT_EDIT` |
| View sprints         | `ORG_SPRINT_VIEW`  |
| Create/edit sprints  | `ORG_SPRINT_EDIT`  |

## Related Pages

- [Task Management](./task-management) — task features
- [Project Endpoints](../api/project-endpoints) — API reference
- [Goals & KPIs](./goals-and-kpis)
