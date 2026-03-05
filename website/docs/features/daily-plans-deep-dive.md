---
sidebar_position: 52
---

# Daily Plans Deep Dive

Plan daily work with structured daily plans.

## Overview

Daily plans let employees and managers:

- Plan tasks for each day
- Set time estimates per task
- Track actual vs planned time
- Review daily productivity

## Creating a Daily Plan

1. Go to **Time Tracking** → **Daily Plans**
2. Select date
3. Add tasks from existing task list or create ad-hoc items
4. Set estimated time per task
5. Save plan

## Daily Plan Structure

```json
{
  "date": "2025-03-05",
  "status": "OPEN",
  "tasks": [
    {
      "taskId": "uuid",
      "estimatedTime": 120,
      "actualTime": null,
      "order": 1
    }
  ]
}
```

## Plan Statuses

| Status      | Description               |
| ----------- | ------------------------- |
| OPEN        | Plan created, not started |
| IN_PROGRESS | Working on planned tasks  |
| COMPLETED   | All tasks done            |

## Features

- **Drag & drop** task ordering
- **Time estimates** per task
- **Carry-over** unfinished tasks to next day
- **Manager review** of team daily plans
- **Productivity metrics** — planned vs actual

## API

See [Daily Plan Endpoints](../api/daily-plan-endpoints).

## Related Pages

- [Task Management](./task-management) — task features
- [Time Tracking](./time-tracking) — time tracking
- [Reports](./reports-and-analytics) — reporting
