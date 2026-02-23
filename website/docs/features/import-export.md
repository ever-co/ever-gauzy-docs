---
sidebar_position: 22
---

# Import & Export

Data import/export capabilities for migration, backup, and bulk operations.

## Overview

The export-import module enables bulk data operations with support for multiple formats and entity types.

## Supported Formats

| Format    | Import | Export | Best For              |
| --------- | :----: | :----: | --------------------- |
| **JSON**  |   ✅   |   ✅   | Full data fidelity    |
| **CSV**   |   ✅   |   ✅   | Spreadsheet workflows |
| **Excel** |   ✅   |   ✅   | Business users        |

## Exportable Entities

| Entity            | Description                 |
| ----------------- | --------------------------- |
| **Employees**     | Employee records with roles |
| **Time Logs**     | Time tracking data          |
| **Tasks**         | Tasks with assignments      |
| **Projects**      | Project details             |
| **Invoices**      | Invoice records             |
| **Expenses**      | Expense entries             |
| **Contacts**      | CRM contacts                |
| **Organizations** | Organization settings       |
| **Products**      | Product catalog             |

## Export Flow

```
Select entities to export
  │
  ├── Apply filters (date range, org, etc.)
  ├── Choose format (JSON/CSV/Excel)
  ├── Generate export file
  └── Download / store in file system
```

## Import Flow

```
Upload file
  │
  ├── Validate file format
  ├── Parse and map fields
  ├── Validate data (types, required fields)
  ├── Handle duplicates (skip/update/create)
  └── Import records with tenant context
```

## API Endpoints

```bash
# Export
POST   /api/export
GET    /api/export/download/:filename

# Import
POST   /api/import
POST   /api/import/validate
GET    /api/import/history
```

## Data Migration

For migrating between Ever Gauzy instances:

1. **Export** all data from the source instance
2. **Transfer** export files to the target server
3. **Import** data into the target instance
4. **Verify** record counts and data integrity

## Related Pages

- [HRM Features](../features/hrm-overview)
- [Database Seeding](../database/seeding) — initial data setup
