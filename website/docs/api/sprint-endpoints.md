---
sidebar_position: 25
---

# Sprint Endpoints

Manage agile sprints — create sprints, assign tasks, track sprint employees, and manage sprint lifecycle.

## Base Path

```
/api/organization-sprint
```

## Endpoints

### List All Sprints

```
GET /api/organization-sprint
Authorization: Bearer {token}
```

**Query Parameters (JSON-encoded `data`):**

| Parameter   | Type   | Description          |
| ----------- | ------ | -------------------- |
| `findInput` | object | Filter conditions    |
| `relations` | array  | Relations to include |

### Get Sprint by ID

```
GET /api/organization-sprint/:id
Authorization: Bearer {token}
```

### Create Sprint

```
POST /api/organization-sprint
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Sprint 1",
  "projectId": "uuid",
  "organizationId": "uuid",
  "startDate": "2024-03-01",
  "endDate": "2024-03-15",
  "goal": "Complete user authentication module",
  "length": 14,
  "dayStart": 1,
  "status": "TODO"
}
```

**Response** `201 Created`.

### Update Sprint

```
PUT /api/organization-sprint/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "goal": "Updated sprint goal"
}
```

**Response** `202 Accepted`.

### Delete Sprint

```
DELETE /api/organization-sprint/:id
Authorization: Bearer {token}
```

## Sprint Statuses

| Status        | Description          |
| ------------- | -------------------- |
| `TODO`        | Planned, not started |
| `IN_PROGRESS` | Currently active     |
| `DONE`        | Completed            |

## Data Model

```typescript
interface IOrganizationSprint {
  id: string;
  name: string;
  goal?: string;
  length: number;
  startDate?: Date;
  endDate?: Date;
  dayStart?: number;
  status?: SprintStatusEnum;

  // Relations
  projectId: string;
  project?: IOrganizationProject;
  tasks?: ITask[];
  members?: IOrganizationSprintEmployee[];
  organizationId: string;
  tenantId: string;
}

interface IOrganizationSprintEmployee {
  sprintId: string;
  employeeId: string;
  roleInSprint?: string;
}

interface IOrganizationSprintTask {
  sprintId: string;
  taskId: string;
  totalWorkedHours?: number;
}
```

## Permissions

| Action         | Required Permission                   |
| -------------- | ------------------------------------- |
| View sprints   | `ALL_ORG_VIEW` or `ORG_SPRINT_VIEW`   |
| Create sprints | `ALL_ORG_EDIT` or `ORG_SPRINT_ADD`    |
| Update sprints | `ALL_ORG_EDIT` or `ORG_SPRINT_EDIT`   |
| Delete sprints | `ALL_ORG_EDIT` or `ORG_SPRINT_DELETE` |

## Related Pages

- [Project Endpoints](./project-endpoints) — project management
- [Task Endpoints](./task-endpoints) — task management
- [Sprints Feature](../features/sprints) — feature overview
