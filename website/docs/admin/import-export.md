---
sidebar_position: 5
---

# Import & Export Operations

Bulk import and export data for migration, backup, and integration.

## Overview

Gauzy supports importing and exporting data in CSV/JSON formats for:

- Data migration from other platforms
- Bulk data updates
- Backup and restore operations
- Integration with external systems

## Supported Entities for Import

| Entity        | Format   | Description             |
| ------------- | -------- | ----------------------- |
| Employees     | CSV/JSON | Employee profiles       |
| Users         | CSV/JSON | User accounts           |
| Roles         | JSON     | Role definitions        |
| Organizations | JSON     | Organization data       |
| Time Logs     | CSV      | Historical time entries |
| Expenses      | CSV      | Expense records         |
| Income        | CSV      | Income records          |
| Tasks         | CSV/JSON | Task data               |
| Contacts      | CSV      | CRM contacts            |

## Export

### Via UI

1. Navigate to the relevant module (e.g., Employees)
2. Click **Export** → select format (CSV or JSON)
3. Download the generated file

### Via API

```
GET /api/export?type=csv&entities=Employee
Authorization: Bearer {token}
```

## Import

### Via UI

1. Navigate to **Settings** → **Import/Export**
2. Select the entity type to import
3. Upload your file (CSV/JSON)
4. Map columns to entity fields
5. Preview and confirm the import

### Bulk Import

For large datasets, use the bulk import API:

```
POST /api/import/{entity}
Content-Type: multipart/form-data
Authorization: Bearer {token}
```

## Related Pages

- [Admin Dashboard](./admin-dashboard) — dashboard overview
