---
sidebar_position: 54
---

# Bulk Operations

Perform actions on multiple entities simultaneously.

## Supported Bulk Operations

| Entity    | Operations                    |
| --------- | ----------------------------- |
| Tasks     | Update status, assign, delete |
| Employees | Update department, tags       |
| Invoices  | Send, mark as paid, delete    |
| Contacts  | Update tags, export, delete   |
| Time Logs | Approve, reject, delete       |
| Expenses  | Categorize, approve, delete   |

## Using Bulk Operations (UI)

1. Navigate to a list view (e.g., Tasks)
2. Select items using checkboxes
3. The **Bulk Actions** toolbar appears
4. Choose an action:
   - Update Status
   - Assign to Employee
   - Add/Remove Tags
   - Delete Selected
5. Confirm the action

## API Bulk Operations

### Bulk Update Tasks

```json
PUT /api/task/bulk
{
  "ids": ["uuid-1", "uuid-2", "uuid-3"],
  "update": {
    "status": "DONE",
    "projectId": "new-project-uuid"
  }
}
```

### Bulk Delete

```json
DELETE /api/task/bulk
{
  "ids": ["uuid-1", "uuid-2", "uuid-3"]
}
```

### Bulk Create Time Logs

```json
POST /api/time-log/bulk
{
  "entries": [
    { "startedAt": "...", "stoppedAt": "...", "projectId": "..." },
    { "startedAt": "...", "stoppedAt": "...", "projectId": "..." }
  ]
}
```

## Performance Considerations

- Bulk operations are processed in transactions
- Maximum batch size: 100 items per request
- Large bulk operations are queued in background jobs

## Related Pages

- [Task Endpoints](../api/task-endpoints) — task API
- [Import/Export](./import-export) — bulk import/export
- [Data Migration](../troubleshooting/data-migration) — migration guide
