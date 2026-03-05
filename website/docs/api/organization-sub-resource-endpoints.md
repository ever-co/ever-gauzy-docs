---
sidebar_position: 30
---

# Organization Sub-Resource Endpoints

Manage departments, positions, teams, vendors, and organization settings.

## Organization Departments

### Base Path: `/api/organization-department`

```
GET    /api/organization-department           # List departments
GET    /api/organization-department/:id       # Get by ID
POST   /api/organization-department           # Create
PUT    /api/organization-department/:id       # Update
DELETE /api/organization-department/:id       # Delete
```

**Create Body:**

```json
{
  "name": "Engineering",
  "tags": [{ "id": "tag-uuid" }],
  "members": [{ "id": "employee-uuid" }]
}
```

## Organization Positions

### Base Path: `/api/organization-position`

```
GET    /api/organization-position             # List positions
GET    /api/organization-position/:id         # Get by ID
POST   /api/organization-position             # Create
PUT    /api/organization-position/:id         # Update
DELETE /api/organization-position/:id         # Delete
```

## Organization Teams

### Base Path: `/api/organization-team`

```
GET    /api/organization-team                 # List teams
GET    /api/organization-team/:id             # Get by ID
POST   /api/organization-team                 # Create
PUT    /api/organization-team/:id             # Update
DELETE /api/organization-team/:id             # Delete
GET    /api/organization-team/me              # My teams
GET    /api/organization-team/count           # Team count
```

**Create Team Body:**

```json
{
  "name": "Frontend Team",
  "prefix": "FE",
  "members": [{ "id": "employee-uuid", "role": "MANAGER" }],
  "tags": [{ "id": "tag-uuid" }]
}
```

## Organization Vendors

### Base Path: `/api/organization-vendor`

```
GET    /api/organization-vendor               # List vendors
GET    /api/organization-vendor/:id           # Get by ID
POST   /api/organization-vendor               # Create
PUT    /api/organization-vendor/:id           # Update
DELETE /api/organization-vendor/:id           # Delete
```

## Organization Languages

### Base Path: `/api/organization-language`

```
GET    /api/organization-language             # List
POST   /api/organization-language             # Add language
DELETE /api/organization-language/:id         # Remove language
```

## Organization Settings

### Base Path: `/api/organization-setting`

```
GET    /api/organization-setting              # Get settings
POST   /api/organization-setting              # Create
PUT    /api/organization-setting/:id          # Update
```

## Organization Recurring Expense

### Base Path: `/api/organization-recurring-expense`

```
GET    /api/organization-recurring-expense             # List
GET    /api/organization-recurring-expense/:id         # Get by ID
POST   /api/organization-recurring-expense             # Create
PUT    /api/organization-recurring-expense/:id         # Update
DELETE /api/organization-recurring-expense/:id         # Delete
GET    /api/organization-recurring-expense/start-date  # By date
```

## Permissions

| Resource   | View Permission       | Edit Permission       |
| ---------- | --------------------- | --------------------- |
| Department | `ORG_DEPARTMENT_VIEW` | `ORG_DEPARTMENT_EDIT` |
| Position   | —                     | `ORG_EMPLOYEES_EDIT`  |
| Team       | `ORG_TEAM_VIEW`       | `ORG_TEAM_EDIT`       |
| Vendor     | `ORG_VENDORS_VIEW`    | `ORG_VENDORS_EDIT`    |

## Related Pages

- [Organization Endpoints](./organization-endpoints) — main org API
- [Departments & Positions](../features/departments-and-positions) — feature guide
- [Teams](../features/teams) — team management
