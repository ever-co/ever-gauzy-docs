---
sidebar_position: 43
---

# Employee Recent Visits

Track recently accessed entities for quick navigation.

## Overview

The recent visits feature automatically tracks which entities (tasks, projects, employees) a user visits most frequently, providing quick-access shortcuts.

## How It Works

1. When a user views a task, project, or employee detail page
2. The visit is recorded via the API
3. Recent visits appear in the quick access panel

## API

```
GET    /api/employee-recent-visit             # List recent visits
POST   /api/employee-recent-visit             # Record visit
DELETE /api/employee-recent-visit/:id         # Delete visit
```

### Record a Visit

```json
POST /api/employee-recent-visit
{
  "entityId": "task-uuid",
  "entityType": "Task"
}
```

## Entity Types

| Type                  | Description       |
| --------------------- | ----------------- |
| `Task`                | Task detail views |
| `OrganizationProject` | Project views     |
| `Employee`            | Employee profiles |
| `Contact`             | CRM contacts      |
| `Invoice`             | Invoice details   |

## UI Integration

Recent visits are displayed in the sidebar or quick access panel, sorted by most recent.

## Related Pages

- [Employee Sub-Resource Endpoints](../api/employee-sub-resource-endpoints) — API
- [Favorites](./favorites) — bookmarked entities
- [Custom Views](./custom-views) — saved views
