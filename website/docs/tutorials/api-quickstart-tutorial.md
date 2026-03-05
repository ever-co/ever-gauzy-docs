---
sidebar_position: 9
---

# Tutorial: API Quickstart

Make your first API calls to the Ever Gauzy REST API.

## Step 1: Get an Auth Token

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ever.co",
    "password": "admin"
  }'
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "email": "admin@ever.co" }
}
```

Save the `token` value for subsequent requests.

## Step 2: List Employees

```bash
curl http://localhost:3000/api/employee \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Step 3: Create a Task

```bash
curl -X POST http://localhost:3000/api/task \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First API Task",
    "status": "TODO",
    "priority": "MEDIUM",
    "projectId": "PROJECT_UUID",
    "organizationId": "ORG_UUID",
    "tenantId": "TENANT_UUID"
  }'
```

## Step 4: Start a Timer

```bash
curl -X POST http://localhost:3000/api/timesheet/timer/start \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_UUID",
    "taskId": "TASK_UUID",
    "organizationId": "ORG_UUID",
    "tenantId": "TENANT_UUID",
    "logType": "TRACKED"
  }'
```

## Step 5: Stop the Timer

```bash
curl -X POST http://localhost:3000/api/timesheet/timer/stop \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "organizationId": "ORG_UUID",
    "tenantId": "TENANT_UUID"
  }'
```

## Common Patterns

### Pagination

```bash
curl "http://localhost:3000/api/task?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Filtering

```bash
curl "http://localhost:3000/api/task?status=IN_PROGRESS&projectId=UUID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Including Relations

```bash
curl "http://localhost:3000/api/employee?relations[]=user&relations[]=teams" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Swagger UI

Access interactive API docs at:

```
http://localhost:3000/swg
```

## Related Pages

- [API Overview](../api/overview) — full API reference
- [Authentication Endpoints](../api/auth-endpoints) — auth API
- [Pagination & Filtering](../api/pagination-and-filtering) — query patterns
