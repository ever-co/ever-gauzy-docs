---
sidebar_position: 43
---

# Email History Endpoints

Query email delivery history and status.

## Base Path

```
/api/email-history
```

## Endpoints

### List Email History

```
GET /api/email-history
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| `page`    | number | Page number          |
| `limit`   | number | Items per page       |
| `email`   | string | Recipient email      |
| `status`  | string | SENT, FAILED, QUEUED |

**Response:**

```json
{
  "items": [
    {
      "id": "uuid",
      "name": "WELCOME_USER",
      "email": "john@example.com",
      "content": "Welcome to Gauzy...",
      "status": "SENT",
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ],
  "total": 500
}
```

### Get Email by ID

```
GET /api/email-history/:id
Authorization: Bearer {token}
```

### Resend Email

```
POST /api/email-history/:id/resend
Authorization: Bearer {token}
```

### Delete Email History

```
DELETE /api/email-history/:id
Authorization: Bearer {token}
```

## Email Types

| Type                  | Description            |
| --------------------- | ---------------------- |
| `WELCOME_USER`        | New user welcome       |
| `INVITE_EMPLOYEE`     | Employee invitation    |
| `INVOICE_SENT`        | Invoice delivery       |
| `PASSWORD_RESET`      | Password reset link    |
| `TIMESHEET_SUBMITTED` | Timesheet notification |
| `TASK_ASSIGNED`       | Task assignment        |

## Related Pages

- [Email Template Endpoints](./email-template-endpoints) — templates
- [Email Delivery Issues](../troubleshooting/email-delivery) — troubleshooting
- [Custom SMTP](../features/custom-smtp) — SMTP configuration
