---
sidebar_position: 3
---

# MCP Tool Reference

Reference for tools available through the Ever Gauzy MCP Server.

## Tool Categories

### Employee Management

| Tool                  | Description                   |
| --------------------- | ----------------------------- |
| `employee_list`       | List employees with filtering |
| `employee_get`        | Get employee by ID            |
| `employee_create`     | Create new employee           |
| `employee_update`     | Update employee details       |
| `employee_statistics` | Get employee statistics       |

### Time Tracking

| Tool                | Description                   |
| ------------------- | ----------------------------- |
| `timer_start`       | Start timer for employee      |
| `timer_stop`        | Stop active timer             |
| `timer_status`      | Get current timer status      |
| `time_log_create`   | Create manual time log        |
| `time_log_list`     | List time logs with filters   |
| `timesheet_submit`  | Submit timesheet for approval |
| `timesheet_approve` | Approve submitted timesheet   |

### Project Management

| Tool             | Description             |
| ---------------- | ----------------------- |
| `project_list`   | List projects           |
| `project_create` | Create new project      |
| `project_update` | Update project          |
| `task_list`      | List tasks with filters |
| `task_create`    | Create task             |
| `task_update`    | Update task             |
| `task_assign`    | Assign task to employee |

### Organization

| Tool                | Description              |
| ------------------- | ------------------------ |
| `organization_list` | List organizations       |
| `organization_get`  | Get organization details |
| `department_list`   | List departments         |
| `team_list`         | List teams               |
| `team_create`       | Create team              |

### Invoicing & Finance

| Tool             | Description            |
| ---------------- | ---------------------- |
| `invoice_create` | Generate invoice       |
| `invoice_list`   | List invoices          |
| `invoice_send`   | Send invoice to client |
| `expense_create` | Create expense         |
| `expense_list`   | List expenses          |
| `payment_record` | Record payment         |

### CRM

| Tool             | Description             |
| ---------------- | ----------------------- |
| `contact_list`   | List contacts           |
| `contact_create` | Create contact          |
| `pipeline_list`  | List sales pipelines    |
| `deal_create`    | Create deal in pipeline |

### Reports

| Tool                     | Description            |
| ------------------------ | ---------------------- |
| `report_time_activity`   | Time & activity report |
| `report_weekly`          | Weekly report          |
| `report_amounts_owed`    | Amounts owed report    |
| `report_project_budgets` | Project budget report  |

## Tool Input Format

Tools accept JSON parameters:

```json
{
  "tool": "employee_list",
  "arguments": {
    "organizationId": "org-uuid",
    "isActive": true,
    "take": 10,
    "skip": 0
  }
}
```

## Related Pages

- [MCP Overview](./mcp-overview) — overview and auth
- [MCP Configuration](./mcp-configuration) — client setup
- [API Overview](../api/overview) — REST/GraphQL alternative
