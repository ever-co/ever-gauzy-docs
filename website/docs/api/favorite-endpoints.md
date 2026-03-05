---
sidebar_position: 34
---

# Favorite Endpoints

Manage user favorites — bookmark entities (tasks, projects, contacts) for quick access.

## Base Path

```
/api/favorite
```

## Endpoints

### List Favorites

```
GET /api/favorite
Authorization: Bearer {token}
```

### Add to Favorites

```
POST /api/favorite
Authorization: Bearer {token}
Content-Type: application/json

{
  "entity": "OrganizationProject",
  "entityId": "project-uuid",
  "organizationId": "uuid"
}
```

### Remove from Favorites

```
DELETE /api/favorite/:id
Authorization: Bearer {token}
```

## Supported Entities

| Entity Type           | Description  |
| --------------------- | ------------ |
| `Task`                | Tasks        |
| `OrganizationProject` | Projects     |
| `OrganizationContact` | CRM contacts |
| `OrganizationTeam`    | Teams        |
| `Employee`            | Employees    |

## Data Model

```typescript
interface IFavorite {
  id: string;
  entity: string;
  entityId: string;
  employeeId: string;
  organizationId: string;
  tenantId: string;
}
```

## Related Pages

- [Favorites Feature](../features/favorites) — feature guide
