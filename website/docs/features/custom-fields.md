---
sidebar_position: 53
---

# Custom Fields

Extend entities with custom metadata fields.

## Overview

Custom fields allow organizations to add custom properties to standard entities without modifying the codebase.

## Supported Entity Types

| Entity   | Custom Fields Support |
| -------- | --------------------- |
| Employee | ✅                    |
| Task     | ✅                    |
| Project  | ✅                    |
| Contact  | ✅                    |
| Invoice  | ✅                    |

## Field Types

| Type     | Description      | Example              |
| -------- | ---------------- | -------------------- |
| Text     | Single-line text | "Department Code"    |
| Textarea | Multi-line text  | "Notes"              |
| Number   | Numeric value    | "Employee ID"        |
| Date     | Date picker      | "Certification Date" |
| Select   | Dropdown options | "Shirt Size"         |
| Checkbox | Boolean toggle   | "Remote Worker"      |
| URL      | Web link         | "Portfolio URL"      |

## Creating Custom Fields

1. Go to **Settings** → **Custom Fields**
2. Click **Add Field**
3. Configure:
   - Entity type
   - Field name and label
   - Field type
   - Required/optional
   - Default value
   - Options (for Select type)
4. Save

## Implementation

Custom fields are stored as JSON in the entity's `customFields` column:

```json
{
  "customFields": {
    "department_code": "ENG-42",
    "remote_worker": true,
    "portfolio_url": "https://example.com"
  }
}
```

## API Usage

Include custom fields in API requests:

```json
POST /api/employee
{
  "firstName": "John",
  "customFields": {
    "department_code": "ENG-42"
  }
}
```

## Related Pages

- [Employee Endpoints](../api/employee-endpoints) — employee API
- [Task Endpoints](../api/task-endpoints) — task API
