---
sidebar_position: 4
---

# Audit Logging

Track changes to critical data with audit logging.

## Audited Actions

| Entity       | Actions Logged                    |
| ------------ | --------------------------------- |
| User         | Login, logout, password change    |
| Employee     | Create, update, deactivate        |
| Organization | Create, update, settings change   |
| Role         | Create, update, permission change |
| Invoice      | Create, send, status change       |
| Time Log     | Create, update, delete            |

## Audit Log Fields

| Field            | Description                         |
| ---------------- | ----------------------------------- |
| `action`         | CREATE, UPDATE, DELETE, LOGIN, etc. |
| `entity`         | Entity type (User, Employee, etc.)  |
| `entityId`       | ID of affected entity               |
| `userId`         | User who performed action           |
| `previousValues` | State before change                 |
| `updatedValues`  | State after change                  |
| `ipAddress`      | Client IP address                   |
| `timestamp`      | When action occurred                |

## Retention

Audit logs follow configurable retention policies. Default: 24 months.

## Related Pages

- [Security Overview](./security-overview)
- [Data Protection](./data-protection) — compliance requirements
