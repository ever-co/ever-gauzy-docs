---
sidebar_position: 42
---

# API Call Log Endpoints

Query the API request audit log for monitoring and debugging.

## Base Path

```
/api/api-call-log
```

## Endpoints

### List API Calls

```
GET /api/api-call-log
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter    | Type   | Description            |
| ------------ | ------ | ---------------------- |
| `page`       | number | Page number            |
| `limit`      | number | Items per page         |
| `method`     | string | HTTP method (GET,POST) |
| `url`        | string | URL pattern filter     |
| `statusCode` | number | Response status code   |
| `startDate`  | date   | From date              |
| `endDate`    | date   | To date                |

**Response:**

```json
{
  "items": [
    {
      "id": "uuid",
      "method": "GET",
      "url": "/api/employee",
      "statusCode": 200,
      "requestTime": 45,
      "ipAddress": "192.168.1.1",
      "userId": "uuid",
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "total": 1250
}
```

### Get Call by ID

```
GET /api/api-call-log/:id
Authorization: Bearer {token}
```

### Delete Old Logs

```
DELETE /api/api-call-log/older-than/:days
Authorization: Bearer {token}
```

Requires admin permissions.

## Use Cases

- API performance monitoring
- Security auditing
- Debugging failed requests
- Rate limiting analysis

## Related Pages

- [Monitoring & Observability](../devops/monitoring) — monitoring setup
- [Audit Logging](../architecture/audit-logging) — audit architecture
