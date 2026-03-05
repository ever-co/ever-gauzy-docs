---
sidebar_position: 19
---

# Webhook Event Catalog

Complete list of webhook events available from Ever Gauzy.

## Configuration

See [Webhooks Integration](../integrations/webhooks) for setup.

## Employee Events

| Event                  | Payload Key  | Description              |
| ---------------------- | ------------ | ------------------------ |
| `employee.created`     | `employee`   | New employee added       |
| `employee.updated`     | `employee`   | Employee profile changed |
| `employee.deleted`     | `employeeId` | Employee removed         |
| `employee.activated`   | `employee`   | Employee set active      |
| `employee.deactivated` | `employee`   | Employee deactivated     |

## Time Tracking Events

| Event                 | Payload Key | Description         |
| --------------------- | ----------- | ------------------- |
| `timer.started`       | `timeLog`   | Timer started       |
| `timer.stopped`       | `timeLog`   | Timer stopped       |
| `timer.toggled`       | `timeLog`   | Timer toggled       |
| `timesheet.submitted` | `timesheet` | Timesheet submitted |
| `timesheet.approved`  | `timesheet` | Timesheet approved  |
| `timesheet.denied`    | `timesheet` | Timesheet denied    |

## Task Events

| Event                 | Payload Key        | Description    |
| --------------------- | ------------------ | -------------- |
| `task.created`        | `task`             | Task created   |
| `task.updated`        | `task`             | Task modified  |
| `task.deleted`        | `taskId`           | Task removed   |
| `task.status.changed` | `task, prevStatus` | Status changed |

## Invoice Events

| Event             | Payload Key        | Description      |
| ----------------- | ------------------ | ---------------- |
| `invoice.created` | `invoice`          | Invoice created  |
| `invoice.sent`    | `invoice`          | Invoice emailed  |
| `invoice.paid`    | `invoice, payment` | Payment received |
| `invoice.overdue` | `invoice`          | Invoice past due |

## Project Events

| Event              | Payload Key | Description      |
| ------------------ | ----------- | ---------------- |
| `project.created`  | `project`   | Project created  |
| `project.updated`  | `project`   | Project modified |
| `project.archived` | `project`   | Project archived |

## Payload Format

```json
{
  "event": "task.status.changed",
  "timestamp": "2025-03-05T16:00:00.000Z",
  "tenantId": "tenant-uuid",
  "organizationId": "org-uuid",
  "data": {
    "task": { "id": "...", "title": "...", "status": "DONE" },
    "previousStatus": "IN_PROGRESS"
  }
}
```

## Related Pages

- [Webhooks](../integrations/webhooks) — webhook setup
- [Zapier Integration](../integrations/zapier-integration) — Zapier
- [Custom Integrations](../integrations/custom-integrations) — building integrations
