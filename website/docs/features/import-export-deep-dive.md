---
sidebar_position: 93
---

# Import & Export Deep Dive

Bulk data import and export capabilities.

## Export Formats

| Format | Use Case              |
| ------ | --------------------- |
| CSV    | Spreadsheet analysis  |
| XLSX   | Excel with formatting |
| JSON   | API/programmatic use  |
| PDF    | Reports and invoices  |

## Exporting Data

### From UI

1. Navigate to any list view (Employees, Tasks, Invoices)
2. Apply filters as needed
3. Click **Export** → select format
4. Download file

### Via API

```bash
GET /api/employee/export
Authorization: Bearer {token}
Accept: text/csv
```

## Importing Data

### Supported Entities

| Entity    | Import | Export |
| --------- | ------ | ------ |
| Employees | ✅     | ✅     |
| Tasks     | ✅     | ✅     |
| Invoices  | ❌     | ✅     |
| Contacts  | ✅     | ✅     |
| Time Logs | ✅     | ✅     |
| Expenses  | ✅     | ✅     |
| Products  | ✅     | ✅     |

### Import Process

1. Download template CSV
2. Fill in data following the template format
3. Go to **Settings** → **Import/Export**
4. Upload CSV file
5. Map columns to fields
6. Preview and confirm
7. Import executes

### Validation

During import, each row is validated:

- Required fields present
- Data types correct
- Foreign keys resolve (project, org)
- Duplicates detected

## Bulk Operations

```bash
POST /api/employee/import
Content-Type: multipart/form-data

# Upload CSV/XLSX with employee data
```

## Related Pages

- [Import/Export](./import-export) — overview
- [Data Export Formats](./data-export-formats) — format details
- [Bulk Operations](./bulk-operations) — bulk actions
