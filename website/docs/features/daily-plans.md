---
sidebar_position: 30
---

# Daily Plans

Plan daily work by assigning tasks to specific calendar days. Each employee can create daily plans to organize their workload.

## Overview

Daily plans provide a structured way to:

- Plan tasks for specific dates
- Track daily progress and completion rates
- View team daily plans for coordination
- Link tasks across multiple plans

## Creating a Daily Plan

1. Navigate to **Tasks** → **Daily Plans**
2. Select a date
3. Add tasks from your project backlog
4. Set the plan status

## Plan Statuses

| Status          | Description                        |
| --------------- | ---------------------------------- |
| **Open**        | Plan is scheduled, not yet started |
| **In Progress** | Currently working on planned tasks |
| **Completed**   | All planned tasks completed        |

## Views

### My Plans

View your own daily plans with task assignments and progress.

### Team Plans

View daily plans for all team members to coordinate workload and identify blockers.

### Employee Plans

Managers can view any employee's daily plans for oversight.

## Task Management

| Action                          | Description                          |
| ------------------------------- | ------------------------------------ |
| Add task to plan                | Assign an existing task to the day   |
| Remove task from plan           | Remove task from current plan        |
| Remove task from multiple plans | Bulk remove a task from several days |

## Integration with Task Views

Daily plans integrate with other task views:

- **Daily View** in task management shows today's planned tasks
- Tasks assigned to daily plans show a calendar indicator
- Completed daily plan tasks update the main task status

## Data Model

```typescript
interface IDailyPlan {
  id: string;
  date: Date;
  status: DailyPlanStatusEnum;
  employeeId: string;
  tasks?: ITask[];
  organizationId: string;
  tenantId: string;
}
```

## API Reference

See [Daily Plan Endpoints](../api/daily-plan-endpoints) for the complete API documentation.

## Related Pages

- [Task Management](./task-management) — task features
- [Sprints](./sprints) — sprint planning
- [Time Tracking](./time-tracking) — logging time on tasks
