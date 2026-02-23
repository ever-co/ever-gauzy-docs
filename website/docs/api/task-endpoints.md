---
sidebar_position: 8
---

# Task Endpoints

API endpoints for task management, statuses, priorities, and related features.

## Tasks

### List Tasks

```http
GET /api/tasks?take=20&skip=0&relations[]=project&relations[]=creator
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "...",
      "title": "Implement user dashboard",
      "description": "Create the main dashboard view",
      "number": 42,
      "prefix": "PROJ",
      "status": "IN_PROGRESS",
      "priority": "HIGH",
      "size": "MEDIUM",
      "estimate": 28800,
      "dueDate": "2024-02-01T00:00:00.000Z",
      "projectId": "...",
      "organizationId": "...",
      "creator": { "id": "...", "name": "John Doe" },
      "tags": [{ "name": "Frontend" }],
      "taskStatusId": "...",
      "taskPriorityId": "...",
      "taskSizeId": "..."
    }
  ],
  "total": 150
}
```

### Get Task by ID

```http
GET /api/tasks/{id}?relations[]=members&relations[]=teams
Authorization: Bearer {token}
```

### Create Task

```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "New Feature Task",
  "description": "Implement the new feature",
  "status": "TODO",
  "priority": "MEDIUM",
  "size": "LARGE",
  "estimate": 57600,
  "dueDate": "2024-02-15",
  "projectId": "project-uuid",
  "organizationId": "org-uuid",
  "members": [{ "id": "employee-uuid" }],
  "tags": [{ "id": "tag-uuid" }]
}
```

### Update Task

```http
PUT /api/tasks/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Task Title",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```

### Delete Task

```http
DELETE /api/tasks/{id}
Authorization: Bearer {token}
```

## Task Statuses

### List Statuses

```http
GET /api/tasks/statuses?where[projectId]={project-id}
Authorization: Bearer {token}
```

**Default Statuses:** `OPEN`, `IN_PROGRESS`, `READY_FOR_REVIEW`, `IN_REVIEW`, `BLOCKED`, `DONE`

### Create Custom Status

```http
POST /api/tasks/statuses
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "QA Testing",
  "value": "qa-testing",
  "icon": "checkmark-circle-outline",
  "color": "#FFA500",
  "order": 5,
  "projectId": "project-uuid",
  "organizationId": "org-uuid"
}
```

## Task Priorities

### List Priorities

```http
GET /api/tasks/priorities
Authorization: Bearer {token}
```

**Default Priorities:** `URGENT`, `HIGH`, `MEDIUM`, `LOW`

### Create Custom Priority

```http
POST /api/tasks/priorities
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Critical",
  "value": "critical",
  "icon": "alert-triangle-outline",
  "color": "#FF0000",
  "organizationId": "org-uuid"
}
```

## Task Sizes

### List Sizes

```http
GET /api/tasks/sizes
Authorization: Bearer {token}
```

**Default Sizes:** `X_LARGE`, `LARGE`, `MEDIUM`, `SMALL`, `TINY`

## Issue Types

### List Issue Types

```http
GET /api/tasks/issue-types
Authorization: Bearer {token}
```

**Default Types:** `BUG`, `STORY`, `TASK`, `EPIC`

## Task Views

### Daily Board View

```http
GET /api/tasks/daily?date=2024-01-15&employeeId={id}
Authorization: Bearer {token}
```

### Team Tasks

```http
GET /api/tasks/team?where[organizationTeamId]={team-id}
Authorization: Bearer {token}
```

### My Tasks

```http
GET /api/tasks/employee/{employee-id}
Authorization: Bearer {token}
```

## Sprint Management

### List Sprints

```http
GET /api/organization-sprint?where[projectId]={project-id}
Authorization: Bearer {token}
```

### Create Sprint

```http
POST /api/organization-sprint
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Sprint 1",
  "projectId": "project-uuid",
  "startDate": "2024-01-15",
  "endDate": "2024-01-29",
  "goal": "Complete dashboard features",
  "organizationId": "org-uuid"
}
```

## Goals & KPIs

### List Goals

```http
GET /api/goals
Authorization: Bearer {token}
```

### Create Goal

```http
POST /api/goals
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Q1 Revenue Target",
  "deadline": "END_OF_QUARTER",
  "level": "ORGANIZATION",
  "organizationId": "org-uuid"
}
```

### Key Results

```http
GET /api/key-results?where[goalId]={goal-id}
Authorization: Bearer {token}
```

## Related Pages

- [Project Endpoints](./project-endpoints) — project management API
- [API Overview](./overview) — general API information
