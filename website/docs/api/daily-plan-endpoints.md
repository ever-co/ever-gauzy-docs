---
sidebar_position: 24
---

# Daily Plan Endpoints

Manage daily work plans — assign tasks to specific days, track daily progress, and coordinate team schedules.

## Base Path

```
/api/daily-plan
```

## Endpoints

### Get My Daily Plans

Retrieves daily plans for the currently authenticated employee.

```
GET /api/daily-plan/me
Authorization: Bearer {token}
```

### Get Team Daily Plans

Retrieves daily plans for all members of the current user's teams.

```
GET /api/daily-plan/team
Authorization: Bearer {token}
```

### Get Employee's Daily Plans

Retrieves daily plans for a specific employee.

```
GET /api/daily-plan/employee/:id
Authorization: Bearer {token}
```

### Get Daily Plans for a Task

Retrieves all daily plans that contain a specific task.

```
GET /api/daily-plan/task/:id
Authorization: Bearer {token}
```

### List All Daily Plans

```
GET /api/daily-plan
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter   | Type   | Description          |
| ----------- | ------ | -------------------- |
| `where`     | object | Filter conditions    |
| `relations` | array  | Relations to include |
| `page`      | number | Page number          |
| `limit`     | number | Items per page       |

### Create Daily Plan

```
POST /api/daily-plan
Authorization: Bearer {token}
Content-Type: application/json

{
  "date": "2024-03-15",
  "status": "OPEN",
  "employeeId": "uuid",
  "organizationId": "uuid",
  "taskIds": ["task-uuid-1", "task-uuid-2"]
}
```

**Response** `201 Created`.

### Update Daily Plan

```
PUT /api/daily-plan/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

### Delete Daily Plan

```
DELETE /api/daily-plan/:id
Authorization: Bearer {token}
```

### Add Task to Daily Plan

```
POST /api/daily-plan/:id/task
Authorization: Bearer {token}
Content-Type: application/json

{
  "taskId": "task-uuid"
}
```

### Remove Task from Daily Plan

```
PUT /api/daily-plan/:id/task
Authorization: Bearer {token}
Content-Type: application/json

{
  "taskId": "task-uuid"
}
```

### Remove Task from Multiple Plans

Removes a task from all daily plans where it appears.

```
PUT /api/daily-plan/task/:taskId
Authorization: Bearer {token}
Content-Type: application/json

{
  "planIds": ["plan-uuid-1", "plan-uuid-2"]
}
```

## Data Model

```typescript
interface IDailyPlan {
  id: string;
  date: Date;
  status: DailyPlanStatusEnum;
  employeeId: string;
  employee?: IEmployee;
  tasks?: ITask[];
  organizationId: string;
  tenantId: string;
}

enum DailyPlanStatusEnum {
  OPEN = "open",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}
```

## Permissions

| Action            | Required Permission |
| ----------------- | ------------------- |
| View own plans    | `ORG_TASK_VIEW`     |
| View team plans   | `ORG_TASK_VIEW`     |
| Create/edit plans | `ORG_TASK_EDIT`     |

## Related Pages

- [Task Endpoints](./task-endpoints) — task management API
- [Daily Plans Feature](../features/daily-plans) — feature overview
- [Sprint Endpoints](./sprint-endpoints) — sprint management
