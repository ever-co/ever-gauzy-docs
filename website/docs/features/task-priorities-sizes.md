---
sidebar_position: 68
---

# Task Priorities & Sizes

Configure task priority levels and size estimations.

## Priority Levels

| Priority | Color     | Description                |
| -------- | --------- | -------------------------- |
| URGENT   | 🔴 Red    | Immediate attention needed |
| HIGH     | 🟠 Orange | Important, do soon         |
| MEDIUM   | 🟡 Yellow | Normal priority            |
| LOW      | 🟢 Green  | Can wait                   |
| NONE     | ⚪ Gray   | Not prioritized            |

## Size Estimation

Task sizes help estimate effort:

| Size    | Story Points | Description          |
| ------- | ------------ | -------------------- |
| X-Small | 1            | Trivial change       |
| Small   | 2            | Few hours work       |
| Medium  | 3            | Half day to full day |
| Large   | 5            | Multiple days        |
| X-Large | 8            | Week or more         |
| XXL     | 13           | Large epic           |

## Using Priorities in the UI

1. Open any task
2. Click the **Priority** dropdown
3. Select priority level
4. Priority is shown as a colored indicator in list/board views

## Filtering by Priority

Filter tasks in list and board views:

- Click **Filters** → **Priority**
- Select one or more priority levels
- View updates in real-time

## API

```json
PUT /api/task/:id
{
  "priority": "HIGH",
  "size": "MEDIUM"
}
```

## Related Pages

- [Task Management](./task-management) — task features
- [Sprint Management](./sprint-management-deep-dive) — sprints
- [Task Endpoints](../api/task-endpoints) — task API
