---
sidebar_position: 48
---

# Tags Management

Organize entities with a flexible tagging system.

## Overview

Tags provide flexible categorization across all major entities:

- Tasks, projects, employees
- Contacts, deals, invoices
- Expenses, income, equipment

## Tag Structure

| Field      | Type   | Description        |
| ---------- | ------ | ------------------ |
| `name`     | string | Tag label          |
| `color`    | string | Hex color code     |
| `icon`     | string | Optional icon      |
| `isSystem` | bool   | System-created tag |

## Managing Tags

### Create Tags

1. Go to **Settings** → **Tags**
2. Click **Add Tag**
3. Enter name and select color
4. Save

### Apply Tags

Tags can be applied to any entity:

```json
POST /api/task
{
  "title": "My Task",
  "tags": [
    { "id": "tag-uuid-1" },
    { "id": "tag-uuid-2" }
  ]
}
```

### Filter by Tags

Use tag filters in list views to find tagged entities:

```
GET /api/task?tags[]=tag-uuid-1&tags[]=tag-uuid-2
```

## Use Cases

| Use Case   | Tags Example                |
| ---------- | --------------------------- |
| Priority   | `Urgent`, `High`, `Low`     |
| Department | `Engineering`, `Marketing`  |
| Client     | `Client A`, `Client B`      |
| Type       | `Bug`, `Feature`, `Support` |
| Status     | `Blocked`, `Needs Review`   |

## Related Pages

- [Tags & Skills Endpoints](../api/tags-and-skills-endpoints) — API
- [Skills Management](./skills-management) — skills system
