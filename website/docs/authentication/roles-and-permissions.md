---
sidebar_position: 4
---

# Roles & Permissions

Ever Gauzy uses **Role-Based Access Control (RBAC)** with fine-grained permissions to control access to features and data.

## Role Hierarchy

```
SUPER_ADMIN          ← Full platform access (tenant-wide)
  └── ADMIN          ← Organization administration
       └── DATA_ENTRY ← Data entry and basic management
            └── EMPLOYEE  ← Employee self-service
                 └── CANDIDATE ← Candidate limited access
                      └── VIEWER  ← Read-only access
```

### Role Descriptions

| Role            | Scope        | Description                                                       |
| --------------- | ------------ | ----------------------------------------------------------------- |
| **SUPER_ADMIN** | Tenant       | Full access to all tenant features, user management, and settings |
| **ADMIN**       | Organization | Organization administration, employee management, project setup   |
| **DATA_ENTRY**  | Organization | Create/edit records (expenses, invoices, time logs)               |
| **EMPLOYEE**    | Self         | View own data, track time, manage own profile                     |
| **CANDIDATE**   | Self         | View interview schedule, submit applications                      |
| **VIEWER**      | Organization | Read-only access to assigned resources                            |

## Permissions

Permissions provide fine-grained access control within roles. Each permission can be **enabled** or **disabled** per role.

### Permission Categories

#### Organization

| Permission        | Description                |
| ----------------- | -------------------------- |
| `ORG_VIEW`        | View organization details  |
| `ORG_EDIT`        | Edit organization settings |
| `ORG_INVITE_VIEW` | View pending invitations   |
| `ORG_INVITE_EDIT` | Send/manage invitations    |
| `ORG_TAGS_EDIT`   | Manage organization tags   |

#### Employees

| Permission               | Description                     |
| ------------------------ | ------------------------------- |
| `EMPLOYEES_VIEW`         | View employee list and profiles |
| `EMPLOYEES_EDIT`         | Create/edit/delete employees    |
| `EMPLOYEE_EXPENSES_VIEW` | View employee expenses          |
| `EMPLOYEE_EXPENSES_EDIT` | Create/edit employee expenses   |

#### Time Tracking

| Permission              | Description                      |
| ----------------------- | -------------------------------- |
| `TIME_TRACKER`          | Use the time tracker             |
| `CAN_APPROVE_TIMESHEET` | Approve/deny timesheets          |
| `TIMESHEET_EDIT`        | Edit time entries                |
| `TIME_OFF_VIEW`         | View time-off requests           |
| `TIME_OFF_EDIT`         | Create/approve time-off requests |

#### Project Management

| Permission         | Description          |
| ------------------ | -------------------- |
| `ORG_PROJECT_VIEW` | View projects        |
| `ORG_PROJECT_EDIT` | Create/edit projects |
| `ORG_TASK_VIEW`    | View tasks           |
| `ORG_TASK_EDIT`    | Create/edit tasks    |
| `ORG_SPRINT_VIEW`  | View sprints         |
| `ORG_SPRINT_EDIT`  | Create/edit sprints  |

#### Finance

| Permission         | Description          |
| ------------------ | -------------------- |
| `INVOICES_VIEW`    | View invoices        |
| `INVOICES_EDIT`    | Create/edit invoices |
| `EXPENSES_VIEW`    | View expenses        |
| `EXPENSES_EDIT`    | Create/edit expenses |
| `PAYMENT_VIEW`     | View payments        |
| `PAYMENT_ADD_EDIT` | Create/edit payments |
| `INCOME_VIEW`      | View income          |
| `INCOME_EDIT`      | Create/edit income   |

#### CRM / ATS

| Permission         | Description            |
| ------------------ | ---------------------- |
| `ORG_CONTACT_VIEW` | View contacts          |
| `ORG_CONTACT_EDIT` | Create/edit contacts   |
| `CANDIDATES_VIEW`  | View candidates        |
| `CANDIDATES_EDIT`  | Create/edit candidates |
| `PIPELINE_VIEW`    | View sales pipelines   |
| `PIPELINE_EDIT`    | Create/edit pipelines  |

#### Integrations

| Permission         | Description            |
| ------------------ | ---------------------- |
| `INTEGRATION_VIEW` | View integrations      |
| `INTEGRATION_EDIT` | Configure integrations |

#### Settings

| Permission                  | Description                     |
| --------------------------- | ------------------------------- |
| `CHANGE_ROLES_PERMISSIONS`  | Modify role-permission mappings |
| `CHANGE_SELECTED_CANDIDATE` | Change candidate status         |
| `ACCESS_DELETE_ACCOUNT`     | Delete user account             |
| `ACCESS_DELETE_ALL_DATA`    | Delete all tenant data          |

## Applying Guards

### Role-Based Guard

```typescript
@Controller("admin")
@UseGuards(TenantPermissionGuard, RoleGuard)
@Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
export class AdminController {
  // Only SUPER_ADMIN and ADMIN can access
}
```

### Permission-Based Guard

```typescript
@Controller("employee")
@UseGuards(TenantPermissionGuard, PermissionGuard)
export class EmployeeController {
  @Get()
  @Permissions(PermissionsEnum.EMPLOYEES_VIEW)
  async findAll() {
    // Only users with EMPLOYEES_VIEW permission
  }

  @Post()
  @Permissions(PermissionsEnum.EMPLOYEES_EDIT)
  async create() {
    // Only users with EMPLOYEES_EDIT permission
  }
}
```

### Combined Guards

```typescript
@UseGuards(TenantPermissionGuard, RoleGuard, PermissionGuard)
@Roles(RolesEnum.ADMIN)
@Permissions(PermissionsEnum.CHANGE_ROLES_PERMISSIONS)
async updateRolePermissions() {
  // Must be ADMIN AND have CHANGE_ROLES_PERMISSIONS
}
```

## Managing Roles via API

### List Roles

```http
GET /api/role?relations[]=rolePermissions
Authorization: Bearer {token}
```

### Get Role Permissions

```http
GET /api/role-permission?where[roleId]={role-id}
Authorization: Bearer {token}
```

### Update Role Permissions

```http
PUT /api/role-permission/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "enabled": true
}
```

## Default Role Permissions

When a new tenant is created, all roles are created with default permissions:

| Permission                 | Super Admin | Admin | Data Entry | Employee | Candidate | Viewer |
| -------------------------- | :---------: | :---: | :--------: | :------: | :-------: | :----: |
| `ORG_VIEW`                 |     ✅      |  ✅   |     ✅     |    ✅    |    ❌     |   ✅   |
| `ORG_EDIT`                 |     ✅      |  ✅   |     ❌     |    ❌    |    ❌     |   ❌   |
| `EMPLOYEES_VIEW`           |     ✅      |  ✅   |     ✅     |    ✅    |    ❌     |   ✅   |
| `EMPLOYEES_EDIT`           |     ✅      |  ✅   |     ❌     |    ❌    |    ❌     |   ❌   |
| `TIME_TRACKER`             |     ✅      |  ✅   |     ✅     |    ✅    |    ❌     |   ❌   |
| `INVOICES_VIEW`            |     ✅      |  ✅   |     ✅     |    ❌    |    ❌     |   ✅   |
| `INVOICES_EDIT`            |     ✅      |  ✅   |     ✅     |    ❌    |    ❌     |   ❌   |
| `CHANGE_ROLES_PERMISSIONS` |     ✅      |  ❌   |     ❌     |    ❌    |    ❌     |   ❌   |

## Feature Flags

Role creation can be restricted:

```bash
# .env
ALLOW_SUPER_ADMIN_ROLE=true    # Allow creating SUPER_ADMIN role
```

When `false`, no new SUPER_ADMIN users can be created (enhances security for multi-tenant production).

## Related Pages

- [Auth Overview](./auth-overview) — authentication architecture
- [Registration & Onboarding](./registration-and-onboarding) — role assignment during registration
- [Multi-Tenancy](../architecture/multi-tenancy) — tenant-scoped access control
