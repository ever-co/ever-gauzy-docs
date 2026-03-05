---
sidebar_position: 39
---

# Activity Log Endpoints

Query activity logs and API call logs for auditing and debugging purposes.

## Base Paths

| Resource      | Path                |
| ------------- | ------------------- |
| Activity Logs | `/api/activity-log` |
| API Call Logs | `/api/api-call-log` |

## Activity Log Endpoints

### List Activity Logs

```
GET /api/activity-log
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter   | Type   | Description           |
| ----------- | ------ | --------------------- |
| `entity`    | string | Filter by entity type |
| `entityId`  | string | Filter by entity ID   |
| `action`    | string | Filter by action type |
| `actorType` | string | Filter by actor type  |

### Get Activity Log by ID

```
GET /api/activity-log/:id
Authorization: Bearer {token}
```

## API Call Log Endpoints

### List API Call Logs

```
GET /api/api-call-log
Authorization: Bearer {token}
```

### Create API Call Log

```
POST /api/api-call-log
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "/api/tasks",
  "method": "GET",
  "statusCode": 200,
  "requestHeaders": "{}",
  "responseBody": "{}",
  "ipAddress": "127.0.0.1"
}
```

## Action Types

| Action    | Description        |
| --------- | ------------------ |
| `CREATED` | Entity was created |
| `UPDATED` | Entity was updated |
| `DELETED` | Entity was deleted |

## Actor Types

| Actor Type | Description             |
| ---------- | ----------------------- |
| `User`     | Human user action       |
| `System`   | System/automated action |

## Data Model

```typescript
interface IActivityLog {
  id: string;
  entity: string;
  entityId: string;
  action: ActionTypeEnum;
  actorType?: ActorTypeEnum;
  description?: string;
  updatedFields?: string[];
  updatedValues?: Record<string, any>;
  previousValues?: Record<string, any>;

  // Relations
  creatorId?: string;
  organizationId: string;
  tenantId: string;
}

interface IApiCallLog {
  id: string;
  url: string;
  method: string;
  statusCode: number;
  requestHeaders?: string;
  requestBody?: string;
  responseBody?: string;
  ipAddress?: string;
  organizationId?: string;
  tenantId: string;
}
```

## Related Pages

- [Audit Logging](../security/audit-logging) — security audit
- [API Call Logging](../advanced/api-call-logging) — logging deep dive
- [Monitoring](../performance/monitoring) — observability
