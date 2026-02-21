---
sidebar_position: 18
---

# Time Off Management

Manage employee leave requests, approval workflows, and time-off policies.

## Features

- **Leave request submission** — employees request time off
- **Approval workflow** — manager review and approval
- **Policy management** — define leave types and allowances
- **Balance tracking** — track remaining days per policy
- **Calendar integration** — view time off on team calendar
- **Holiday management** — define organizational holidays

## Time Off Policies

| Field              | Description                        |
| ------------------ | ---------------------------------- |
| `name`             | Policy name (e.g., "Annual Leave") |
| `requiresApproval` | Needs manager approval             |
| `accrualEnabled`   | Days accrue over time              |
| `maxDaysPerMonth`  | Maximum accrued per month          |
| `paid`             | Paid or unpaid leave               |

### Default Policies

| Policy              | Paid | Approval | Typical Days |
| ------------------- | :--: | :------: | :----------: |
| Annual Leave        |  ✅  |    ✅    |      20      |
| Sick Leave          |  ✅  |    ✅    |      10      |
| Personal Day        |  ✅  |    ✅    |      5       |
| Unpaid Leave        |  ❌  |    ✅    |  Unlimited   |
| Maternity/Paternity |  ✅  |    ✅    |    Varies    |

## Request Lifecycle

```
Employee submits request
        │
  Status: REQUESTED
        │
  Manager reviews
        │
  ┌─────┴─────┐
  │           │
APPROVED   DENIED
  │
Days deducted from balance
```

## Request Statuses

| Status      | Description         |
| ----------- | ------------------- |
| `REQUESTED` | Pending approval    |
| `APPROVED`  | Approved by manager |
| `DENIED`    | Denied by manager   |

## Holidays

Organization-level holidays:

| Field       | Description      |
| ----------- | ---------------- |
| `name`      | Holiday name     |
| `date`      | Holiday date     |
| `recurring` | Repeats annually |

## Permissions

| Action           | Permission                |
| ---------------- | ------------------------- |
| View time off    | `TIME_OFF_VIEW`           |
| Request time off | `TIME_OFF_EDIT`           |
| Approve requests | `TIME_OFF_EDIT` (Manager) |

## Related Pages

- [Employee Management](./employee-management)
- [HRM Overview](./hrm-overview)
