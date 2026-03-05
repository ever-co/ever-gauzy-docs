---
sidebar_position: 7
---

# Audit Logging

Track user actions and system events for compliance and security auditing.

## Overview

Ever Gauzy maintains comprehensive audit logs through two mechanisms:

1. **Activity Logs** — entity-level change tracking
2. **API Call Logs** — HTTP request/response logging

## Activity Logs

Every entity change is recorded with:

| Field           | Description                     |
| --------------- | ------------------------------- |
| Entity          | Changed entity type             |
| Entity ID       | Changed entity identifier       |
| Action          | `CREATED`, `UPDATED`, `DELETED` |
| Actor Type      | `User` or `System`              |
| Updated Fields  | List of changed field names     |
| Updated Values  | New field values                |
| Previous Values | Old field values                |
| Creator         | User who made the change        |
| Timestamp       | When the change occurred        |

## API Call Logs

HTTP request/response recording:

| Field           | Description       |
| --------------- | ----------------- |
| URL             | Request URL       |
| Method          | HTTP method       |
| Status Code     | Response status   |
| Request Headers | Request headers   |
| Request Body    | Request payload   |
| Response Body   | Response payload  |
| IP Address      | Client IP address |

## Viewing Audit Logs

Audit logs are accessible via:

- **API**: [`GET /api/activity-log`](../api/activity-log-endpoints)
- **Admin UI**: **Settings** → **Audit Logs**

## Related Pages

- [Activity Log Endpoints](../api/activity-log-endpoints) — API reference
- [API Security Best Practices](./api-security-best-practices) — security guide
