---
sidebar_position: 38
---

# Screening Task Endpoints

Manage candidate screening tasks — assign evaluation tasks during the hiring process.

## Base Path

```
/api/screening-tasks
```

## Endpoints

### List Screening Tasks

```
GET /api/screening-tasks
Authorization: Bearer {token}
```

### Get Screening Task by ID

```
GET /api/screening-tasks/:id
Authorization: Bearer {token}
```

### Create Screening Task

```
POST /api/screening-tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Technical Assessment",
  "description": "Complete a coding challenge...",
  "status": "TODO",
  "dueDate": "2024-04-01",
  "candidateId": "candidate-uuid",
  "organizationId": "uuid"
}
```

### Update Screening Task

```
PUT /api/screening-tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "COMPLETED",
  "result": "PASS"
}
```

### Delete Screening Task

```
DELETE /api/screening-tasks/:id
Authorization: Bearer {token}
```

## Data Model

```typescript
interface IScreeningTask {
  id: string;
  title: string;
  description?: string;
  status: ScreeningTaskStatusEnum;
  dueDate?: Date;
  result?: string;

  // Relations
  candidateId: string;
  candidate?: ICandidate;
  organizationId: string;
  tenantId: string;
}
```

## Related Pages

- [Screening Tasks Feature](../features/screening-tasks) — feature guide
- [Candidate Endpoints](./candidate-endpoints) — candidate management
- [Recruitment Feature](../features/recruitment) — ATS overview
