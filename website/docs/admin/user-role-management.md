---
sidebar_position: 3
---

# User & Role Management

Manage users, roles, and permissions for access control.

## Overview

Ever Gauzy uses a role-based access control (RBAC) system with five built-in roles and granular permissions.

## Built-in Roles

| Role            | Description                      | Can Delete? |
| --------------- | -------------------------------- | ----------- |
| **SUPER_ADMIN** | Full system access, cross-tenant | No          |
| **ADMIN**       | Full tenant/org management       | No          |
| **MANAGER**     | Team and project management      | Yes\*       |
| **VIEWER**      | Read-only data access            | Yes\*       |
| **EMPLOYEE**    | Self-service employee access     | No          |

## Managing Users

### Creating a User

1. Navigate to **Employees** → **Manage**
2. Click **Add Employee**
3. Fill in user details and assign a role
4. The user receives an invitation email

### User Properties

| Property               | Description      |
| ---------------------- | ---------------- |
| First Name / Last Name | Display name     |
| Email                  | Login email      |
| Role                   | Access level     |
| Preferred Language     | UI language      |
| Preferred Layout       | Component layout |

## Permissions

Permissions are granular and assigned to roles:

| Category      | Example Permissions                             |
| ------------- | ----------------------------------------------- |
| Users         | `ORG_USERS_VIEW`, `ORG_USERS_EDIT`              |
| Employees     | `ORG_EMPLOYEES_VIEW`, `ORG_EMPLOYEES_EDIT`      |
| Projects      | `ORG_PROJECT_VIEW`, `ORG_PROJECT_EDIT`          |
| Tasks         | `ORG_TASK_VIEW`, `ORG_TASK_ADD`                 |
| Contacts      | `ORG_CONTACT_VIEW`, `ORG_CONTACT_EDIT`          |
| Expenses      | `ORG_EXPENSES_VIEW`, `ORG_EXPENSES_EDIT`        |
| Time Tracking | `TIME_TRACKER`, `CAN_APPROVE_TIMESHEET`         |
| Admin         | `CHANGE_ROLES_PERMISSIONS`, `ADMIN_EDIT_DELETE` |

## Managing Roles

### Creating a Custom Role

1. Navigate to **Settings** → **Roles & Permissions**
2. Click **Add Role**
3. Name the role
4. Assign specific permissions
5. Save

### Editing Permissions

1. Select a role from the list
2. Check/uncheck individual permissions
3. Changes take effect immediately

## API Reference

- [Role & Permission Endpoints](../api/role-permission-endpoints) — API reference
- [User Endpoints](../api/user-endpoints) — user API
- [Invite Endpoints](../api/invite-endpoints) — invitation API

## Related Pages

- [Admin Dashboard](./admin-dashboard) — dashboard overview
- [API Security Best Practices](../security/api-security-best-practices) — security
- [Tenant Isolation](../security/tenant-isolation) — data isolation
