---
sidebar_position: 15
---

# Task Management

Comprehensive task management with custom statuses, priorities, sizes, issue types, and views.

## Task Features

- **Custom statuses** — define project-specific workflow stages
- **Custom priorities** — customize priority levels
- **Issue types** — Bug, Story, Task, Epic
- **Task sizes** — estimate complexity
- **Due dates** — deadline tracking
- **Time estimation** — estimated hours per task
- **Member assignment** — assign employees or teams
- **Tags and labels** — categorize tasks
- **Related issues** — link tasks together
- **Views** — Kanban, sprint, list, and daily views

## Custom Statuses

Default statuses (customizable per project):

| Status           | Color  | Description           |
| ---------------- | ------ | --------------------- |
| Open             | Blue   | New task              |
| In Progress      | Yellow | Being worked on       |
| Ready for Review | Purple | Awaiting review       |
| In Review        | Orange | Under review          |
| Blocked          | Red    | Blocked by dependency |
| Done             | Green  | Completed             |

## Task Views

| View       | Description                       |
| ---------- | --------------------------------- |
| **Kanban** | Cards grouped by status columns   |
| **Sprint** | Sprint-based task board           |
| **List**   | Table view with sorting/filtering |
| **Daily**  | Tasks for today per employee      |
| **Team**   | Tasks grouped by team             |

## Task Relationships

| Type               | Description                |
| ------------------ | -------------------------- |
| `IS_BLOCKED_BY`    | Task is blocked by another |
| `BLOCKS`           | Task blocks another        |
| `IS_CLONED_BY`     | Task is a clone            |
| `IS_DUPLICATED_BY` | Duplicate task reference   |
| `RELATES_TO`       | General relationship       |

## Task Data Model

```typescript
interface ITask {
  title: string;
  number: number; // Auto-increment per project
  prefix: string; // Project prefix (e.g., "PROJ")
  description?: string;
  status: string;
  priority: string;
  size: string;
  issueType?: string;
  estimate?: number; // Seconds
  dueDate?: Date;
  startDate?: Date;

  // Relations
  projectId?: string;
  creatorId: string;
  members?: IEmployee[];
  teams?: IOrganizationTeam[];
  tags?: ITag[];
  parentId?: string; // Sub-task support
}
```

## Task Filtering

| Filter     | Description                    |
| ---------- | ------------------------------ |
| Status     | Filter by one or more statuses |
| Priority   | Filter by priority level       |
| Assignee   | Filter by assigned employee    |
| Sprint     | Filter by sprint               |
| Tag        | Filter by tag                  |
| Due Date   | Filter by date range           |
| Issue Type | Filter by Bug, Story, etc.     |

## Permissions

| Action            | Permission      |
| ----------------- | --------------- |
| View tasks        | `ORG_TASK_VIEW` |
| Create/edit tasks | `ORG_TASK_EDIT` |

## Related Pages

- [Task Endpoints](../api/task-endpoints) — API reference
- [Project Management](./project-management) — project features
