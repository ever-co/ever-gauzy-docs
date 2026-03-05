---
sidebar_position: 23
---

# Role & Permission Endpoints

Manage roles, permissions, and role-permission assignments. Roles define what actions users can perform within a tenant.

## Base Paths

| Resource         | Path                    |
| ---------------- | ----------------------- |
| Roles            | `/api/roles`            |
| Role Permissions | `/api/role-permissions` |

## Built-in Roles

| Role          | Description                              |
| ------------- | ---------------------------------------- |
| `SUPER_ADMIN` | Full system access, tenant management    |
| `ADMIN`       | Organization management, user management |
| `DATA_ENTRY`  | Data input and basic CRUD operations     |
| `EMPLOYEE`    | Standard employee with limited access    |
| `CANDIDATE`   | Job candidate with minimal access        |
| `MANAGER`     | Team/department management               |
| `VIEWER`      | Read-only access                         |

## Role Endpoints

### List All Roles

```
GET /api/roles
Authorization: Bearer {token}
```

**Response** `200 OK`:

```json
{
  "items": [
    {
      "id": "uuid",
      "name": "ADMIN",
      "isSystem": true,
      "tenantId": "uuid"
    }
  ],
  "total": 7
}
```

### Find Role by Options

```
GET /api/roles/options?name=EMPLOYEE
Authorization: Bearer {token}
```

### Create Role

```
POST /api/roles
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "CUSTOM_ROLE"
}
```

### Update Role

```
PUT /api/roles/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "UPDATED_ROLE_NAME"
}
```

### Delete Role

```
DELETE /api/roles/:id
Authorization: Bearer {token}
```

### Import Roles (Cloud Migration)

```
POST /api/roles/import/migrate
Authorization: Bearer {token}
Content-Type: application/json

[
  { "name": "CUSTOM_ROLE_1", "isSystem": false }
]
```

## Role Permission Endpoints

### List Permissions for Role

```
GET /api/role-permissions?roleId={roleId}
Authorization: Bearer {token}
```

### Assign Permission to Role

```
POST /api/role-permissions
Authorization: Bearer {token}
Content-Type: application/json

{
  "roleId": "uuid",
  "permission": "ORG_USERS_VIEW",
  "enabled": true
}
```

### Update Permission

```
PUT /api/role-permissions/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "enabled": false
}
```

### Remove Permission from Role

```
DELETE /api/role-permissions/:id
Authorization: Bearer {token}
```

## Available Permissions

| Category         | Permissions                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| **Organization** | `ORG_USERS_VIEW`, `ORG_USERS_EDIT`, `ALL_ORG_VIEW`, `ALL_ORG_EDIT`          |
| **Employees**    | `ORG_EMPLOYEES_VIEW`, `ORG_EMPLOYEES_EDIT`                                  |
| **Time**         | `TIME_TRACKER`, `ALLOW_MANUAL_TIME`, `ALLOW_DELETE_TIME`                    |
| **Tasks**        | `ORG_TASK_VIEW`, `ORG_TASK_EDIT`, `ORG_TASK_ADD`                            |
| **Projects**     | `ORG_PROJECT_VIEW`, `ORG_PROJECT_EDIT`, `ORG_PROJECT_ADD`                   |
| **Sprints**      | `ORG_SPRINT_VIEW`, `ORG_SPRINT_ADD`, `ORG_SPRINT_EDIT`, `ORG_SPRINT_DELETE` |
| **Invoices**     | `ORG_EXPENSES_VIEW`, `ORG_EXPENSES_EDIT`, `INVOICES_VIEW`, `INVOICES_EDIT`  |
| **CRM**          | `VIEW_SALES_PIPELINES`, `EDIT_SALES_PIPELINES`                              |
| **Roles**        | `CHANGE_ROLES_PERMISSIONS`                                                  |
| **Integration**  | `INTEGRATION_VIEW`, `INTEGRATION_EDIT`                                      |
| **System**       | `MIGRATE_GAUZY_CLOUD`, `ACCESS_DELETE_ACCOUNT`, `ACCESS_DELETE_ALL_DATA`    |

## Data Model

```typescript
interface IRole {
  id: string;
  name: string;
  isSystem: boolean;
  tenantId: string;
  rolePermissions?: IRolePermission[];
}

interface IRolePermission {
  id: string;
  roleId: string;
  permission: string;
  enabled: boolean;
  tenantId: string;
}
```

## Permissions

| Action            | Required Permission        |
| ----------------- | -------------------------- |
| View/manage roles | `CHANGE_ROLES_PERMISSIONS` |
| View roles (team) | `ORG_TEAM_ADD`             |

## Related Pages

- [Roles and Permissions](../authentication/roles-and-permissions) — conceptual guide
- [User Endpoints](./user-endpoints) — user management
- [Authentication Flows](../security/authentication-flows) — auth security
