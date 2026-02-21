---
sidebar_position: 9
---

# Project Endpoints

API endpoints for project management, modules, and sprints.

## Projects

### List Projects

```http
GET /api/organization-projects?take=20&skip=0&relations[]=members&relations[]=organizationContact
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "...",
      "name": "Gauzy Platform",
      "description": "Open-source business management platform",
      "billing": "RATE",
      "currency": "USD",
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": null,
      "budget": 100000,
      "budgetType": "COST",
      "openSource": true,
      "taskListType": "GRID",
      "membersCount": 15,
      "isActive": true,
      "organizationId": "...",
      "organizationContactId": "..."
    }
  ],
  "total": 8
}
```

### Get Project by ID

```http
GET /api/organization-projects/{id}?relations[]=teams&relations[]=modules
Authorization: Bearer {token}
```

### Create Project

```http
POST /api/organization-projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description",
  "billing": "RATE",
  "currency": "USD",
  "startDate": "2024-01-01",
  "budget": 50000,
  "budgetType": "COST",
  "taskListType": "SPRINT",
  "organizationId": "org-uuid",
  "members": [{ "id": "employee-uuid" }]
}
```

### Update Project

```http
PUT /api/organization-projects/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "billing": "MILESTONES"
}
```

### Delete Project

```http
DELETE /api/organization-projects/{id}
Authorization: Bearer {token}
```

## Project Billing Types

| Type         | Description             |
| ------------ | ----------------------- |
| `RATE`       | Hourly rate billing     |
| `FLAT`       | Flat project fee        |
| `MILESTONES` | Milestone-based billing |

## Project Budget Types

| Type    | Description               |
| ------- | ------------------------- |
| `COST`  | Budget in monetary amount |
| `HOURS` | Budget in working hours   |

## Project Task List Views

| Type     | Description       |
| -------- | ----------------- |
| `GRID`   | Kanban/grid view  |
| `SPRINT` | Sprint board view |

## Project Modules

### List Modules

```http
GET /api/organization-project-module?where[projectId]={project-id}
Authorization: Bearer {token}
```

### Create Module

```http
POST /api/organization-project-module
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Authentication Module",
  "description": "User authentication and authorization",
  "projectId": "project-uuid",
  "organizationId": "org-uuid",
  "startDate": "2024-01-15",
  "endDate": "2024-02-15"
}
```

## Project Settings

### Get Project Settings

```http
GET /api/organization-projects/{id}/settings
Authorization: Bearer {token}
```

### Update Project Settings

```http
PUT /api/organization-projects/{id}/settings
Authorization: Bearer {token}
Content-Type: application/json

{
  "isTasksAutoSync": true,
  "isTasksAutoSyncOnLabel": true,
  "syncTag": "gauzy"
}
```

## Required Permissions

| Endpoint                                | Permission         |
| --------------------------------------- | ------------------ |
| `GET /api/organization-projects`        | `ORG_PROJECT_VIEW` |
| `POST /api/organization-projects`       | `ORG_PROJECT_EDIT` |
| `PUT /api/organization-projects/:id`    | `ORG_PROJECT_EDIT` |
| `DELETE /api/organization-projects/:id` | `ORG_PROJECT_EDIT` |
