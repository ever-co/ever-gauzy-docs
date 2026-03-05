---
sidebar_position: 35
---

# Employee Onboarding Workflow

Set up and manage structured onboarding for new employees.

## Overview

Gauzy provides tools to streamline new employee onboarding:

- Pre-configured task checklists
- Automated account creation
- Role and permission assignment
- Team assignment
- Equipment provisioning

## Onboarding Steps

### 1. Create Employee Account

Via API or UI:

- Basic info (name, email)
- Start date
- Department and position
- Reporting manager

### 2. Send Invitation

```
POST /api/invite
{
  "emailIds": ["new-hire@example.com"],
  "roleId": "employee-role-uuid",
  "invitedById": "manager-uuid",
  "inviteType": "EMPLOYEE",
  "startedWorkOn": "2025-02-01"
}
```

### 3. Configure Permissions

Assign role with appropriate permissions based on the employee's function.

### 4. Team Assignment

Add to relevant teams and departments.

### 5. Equipment Provisioning

Create equipment sharing requests for necessary hardware/software.

## Onboarding Checklist

| Step                     | Automated | Manual |
| ------------------------ | --------- | ------ |
| Create account           | ✅        |        |
| Send invitation email    | ✅        |        |
| Configure permissions    |           | ✅     |
| Assign to team(s)        |           | ✅     |
| Provision equipment      |           | ✅     |
| Set up time tracking     | ✅        |        |
| Schedule onboarding meet |           | ✅     |

## Related Pages

- [Invite Endpoints](../api/invite-endpoints) — invitation API
- [Employee Endpoints](../api/employee-endpoints) — employee API
- [User & Role Management](../admin/user-role-management) — RBAC
