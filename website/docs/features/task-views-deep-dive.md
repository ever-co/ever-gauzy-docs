---
sidebar_position: 46
---

# Task Views Deep Dive

Advanced task visualization modes and custom view configurations.

## Available Views

| View     | Description                    | Best For          |
| -------- | ------------------------------ | ----------------- |
| List     | Traditional list with columns  | Quick scanning    |
| Board    | Kanban-style columns by status | Sprint workflows  |
| Grid     | Card-based grid layout         | Visual overview   |
| Gantt    | Timeline with dependencies     | Project planning  |
| Calendar | Date-based event view          | Deadline tracking |

## Switching Views

Click the view toggle buttons above the task list to switch between views.

## Custom Views

### Saving a Custom View

1. Configure filters, sorting, and column visibility
2. Click **Save View**
3. Name your view
4. Optional: make it the default view

### Sharing Views

Custom views can be:

- **Personal** — visible only to creator
- **Team** — shared with team members
- **Organization** — visible to all members

## View Filters

| Filter     | Options                       |
| ---------- | ----------------------------- |
| Status     | Open, In Progress, Done, etc. |
| Priority   | Urgent, High, Medium, Low     |
| Assignee   | Specific employees            |
| Project    | Specific projects             |
| Sprint     | Active sprint, backlog        |
| Tags       | Tagged with specific tags     |
| Date Range | Due date range                |

## Board View Configuration

Customize board columns:

1. Go to task board view
2. Click **Board Settings**
3. Choose column grouping:
   - By Status (default)
   - By Priority
   - By Sprint
   - By Assignee

## Gantt View

- Drag to resize task duration
- Draw dependencies between tasks
- Zoom: Day / Week / Month
- Critical path highlighting

## Related Pages

- [Task Endpoints](../api/task-endpoints) — task API
- [Custom Views](./custom-views) — view management
- [Sprints & Agile](./sprints) — sprint workflows
