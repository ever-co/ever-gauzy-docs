---
sidebar_position: 53
---

# Skills Endpoints

Manage organizational and employee skills.

## Base Path

```
/api/skill
```

## Endpoints

### List Skills

```
GET /api/skill
Authorization: Bearer {token}
```

**Response:**

```json
{
  "items": [
    { "id": "uuid", "name": "TypeScript", "color": "#3178C6" },
    { "id": "uuid", "name": "React", "color": "#61DAFB" }
  ],
  "total": 25
}
```

### Create Skill

```
POST /api/skill
Authorization: Bearer {token}
```

```json
{
  "name": "GraphQL",
  "color": "#E535AB",
  "description": "GraphQL API development"
}
```

### Update Skill

```
PUT /api/skill/:id
Authorization: Bearer {token}
```

### Delete Skill

```
DELETE /api/skill/:id
Authorization: Bearer {token}
```

### Assign Skill to Employee

Skills are assigned through the employee update endpoint:

```json
PUT /api/employee/:id
{
  "skills": [{ "id": "skill-uuid-1" }, { "id": "skill-uuid-2" }]
}
```

## Related Pages

- [Skills Management](../features/skills-management) — feature guide
- [Employee Endpoints](./employee-endpoints) — employee API
