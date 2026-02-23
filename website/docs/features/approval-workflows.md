---
sidebar_position: 21
---

# Approval Workflows

Request approval system for leave, equipment, expenses, and custom workflows.

## Overview

The approval system provides multi-level request handling with configurable policies and team-based approvals.

## Approval Flow

```
Employee submits request
  │
  ├── Auto-approved? → ✅ Done
  │
  └── Manual review
        ├── Team lead approves
        ├── Manager approves
        └── ✅ Request approved / ❌ Rejected
```

## Core Entities

### Approval Policy

| Field          | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| `name`         | string | Policy name                          |
| `description`  | string | Policy details                       |
| `approvalType` | enum   | Time Off, Equipment, Expense, Custom |

### Request Approval

| Field               | Type       | Description                 |
| ------------------- | ---------- | --------------------------- |
| `name`              | string     | Request title               |
| `type`              | string     | Request type                |
| `status`            | enum       | Pending, Approved, Refused  |
| `min_count`         | number     | Minimum approvals needed    |
| `approvalPolicyId`  | UUID       | Associated policy           |
| `employeeApprovals` | Employee[] | Required employee approvers |
| `teamApprovals`     | Team[]     | Required team approvers     |

## Approval Types

| Type          | Use Case                     |
| ------------- | ---------------------------- |
| **Time Off**  | Leave/vacation requests      |
| **Equipment** | Equipment sharing requests   |
| **Expense**   | Expense report approvals     |
| **Custom**    | Any custom approval workflow |

## API Endpoints

```bash
# Approval Policies
GET    /api/approval-policy
POST   /api/approval-policy
PUT    /api/approval-policy/:id

# Request Approvals
GET    /api/request-approval
POST   /api/request-approval
PUT    /api/request-approval/:id

# Approve/Refuse
PUT    /api/request-approval/:id/approve
PUT    /api/request-approval/:id/refuse
```

## Related Pages

- [Employee Management](../features/employee-management)
- [HRM Features](../features/hrm-overview)
- [Equipment Management](./equipment-management)
