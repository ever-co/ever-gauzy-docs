---
sidebar_position: 17
---

# Tags & Skills Endpoints

API endpoints for Tags and Skills management.

## Tags

Tags provide flexible categorization across all entities.

```bash
# List tags
GET /api/tags?organizationId=xxx

# Create tag
POST /api/tags
{
  "name": "Urgent",
  "color": "#FF0000",
  "description": "High-priority items",
  "organizationId": "org-uuid"
}

# Update tag
PUT /api/tags/:id
{
  "name": "Critical",
  "color": "#CC0000"
}

# Delete tag
DELETE /api/tags/:id
```

### Tag Types

```bash
# List tag types
GET /api/tag-types

# Tag types define which entities a tag can apply to
POST /api/tag-types
{
  "type": "task",
  "organizationId": "org-uuid"
}
```

### Tagging Entities

Tags can be applied to many entity types:

| Entity    | How to Tag                                             |
| --------- | ------------------------------------------------------ |
| Tasks     | `PUT /api/tasks/:id` with `tags` array                 |
| Employees | `PUT /api/employee/:id` with `tags` array              |
| Projects  | `PUT /api/organization-projects/:id` with `tags` array |
| Invoices  | `PUT /api/invoices/:id` with `tags` array              |
| Expenses  | `PUT /api/expense/:id` with `tags` array               |

## Skills

Skills are used for employee profiles and candidate matching.

```bash
# List skills
GET /api/skills?organizationId=xxx

# Create skill
POST /api/skills
{
  "name": "TypeScript",
  "description": "TypeScript programming language",
  "color": "#3178C6",
  "organizationId": "org-uuid"
}

# Update skill
PUT /api/skills/:id

# Delete skill
DELETE /api/skills/:id
```

### Assigning Skills to Employees

```bash
PUT /api/employee/:id
{
  "skills": [
    { "id": "skill-uuid-1" },
    { "id": "skill-uuid-2" }
  ]
}
```

## Related Pages

- [API Overview](./overview)
- [Employee Management](../features/employee-management)
