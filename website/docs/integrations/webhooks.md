---
sidebar_position: 6
---

# Webhooks

Configure outgoing webhooks to notify external systems of events in Ever Gauzy.

## Supported Events

| Event Category | Events                             |
| -------------- | ---------------------------------- |
| **Employee**   | Created, Updated, Deleted          |
| **Time Log**   | Started, Stopped, Created, Updated |
| **Timesheet**  | Submitted, Approved, Denied        |
| **Task**       | Created, Updated, Status Changed   |
| **Invoice**    | Created, Sent, Paid                |
| **Expense**    | Created, Approved                  |

## Webhook Payload

```json
{
  "event": "time_log.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "tenantId": "tenant-uuid",
  "organizationId": "org-uuid",
  "data": {
    "id": "time-log-uuid",
    "employeeId": "employee-uuid",
    "duration": 3600,
    "projectId": "project-uuid",
    "startedAt": "2024-01-15T09:00:00Z",
    "stoppedAt": "2024-01-15T10:00:00Z"
  }
}
```

## Security

### Webhook Signing

Webhooks include a signature header for verification:

```
X-Gauzy-Signature: sha256=hex-signature
```

Verify in your handler:

```typescript
const crypto = require("crypto");
const signature = crypto
  .createHmac("sha256", webhookSecret)
  .update(JSON.stringify(body))
  .digest("hex");

if (signature !== receivedSignature) {
  throw new Error("Invalid webhook signature");
}
```

### Retry Policy

| Attempt |   Delay    |
| :-----: | :--------: |
|    1    | Immediate  |
|    2    |  1 minute  |
|    3    | 5 minutes  |
|    4    | 15 minutes |
|    5    |   1 hour   |

After 5 failed attempts, the webhook is disabled.

## Related Pages

- [Integrations Overview](./integrations-overview)
- [Integration Endpoints](../api/integration-endpoints)
