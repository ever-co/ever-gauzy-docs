---
sidebar_position: 62
---

# Tag Endpoints

Manage tags for flexible entity categorization.

## Base Path

```
/api/tag
```

## Endpoints

### List Tags

```
GET /api/tag
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter | Type   | Description     |
| --------- | ------ | --------------- |
| `name`    | string | Filter by name  |
| `color`   | string | Filter by color |

**Response:**

```json
{
  "items": [
    { "id": "uuid", "name": "Urgent", "color": "#FF0000", "isSystem": false },
    { "id": "uuid", "name": "Frontend", "color": "#61DAFB", "isSystem": false }
  ],
  "total": 15
}
```

### Create Tag

```
POST /api/tag
Authorization: Bearer {token}
```

```json
{
  "name": "Backend",
  "color": "#68A063",
  "description": "Backend related items"
}
```

### Update Tag

```
PUT /api/tag/:id
Authorization: Bearer {token}
```

### Delete Tag

```
DELETE /api/tag/:id
Authorization: Bearer {token}
```

### Get Tag Usage

```
GET /api/tag/:id/count
Authorization: Bearer {token}
```

Returns count of entities using this tag.

## Taggable Entities

Tags can be applied to: Tasks, Employees, Projects, Contacts, Invoices, Expenses, Equipment, Proposals.

## Related Pages

- [Tags Management](../features/tags-management) — feature guide
- [Task Endpoints](./task-endpoints) — tasks API
