---
sidebar_position: 61
---

# Data Export Formats

Supported export formats and configuration.

## Available Formats

| Format | Description                | Use Case          |
| ------ | -------------------------- | ----------------- |
| CSV    | Comma-separated values     | Spreadsheets      |
| Excel  | .xlsx format               | Advanced analysis |
| PDF    | Portable Document Format   | Reports, invoices |
| JSON   | JavaScript Object Notation | API integrations  |

## Exportable Data

| Data Type | CSV | Excel | PDF | JSON |
| --------- | --- | ----- | --- | ---- |
| Time Logs | ✅  | ✅    | ✅  | ✅   |
| Employees | ✅  | ✅    | ❌  | ✅   |
| Tasks     | ✅  | ✅    | ❌  | ✅   |
| Invoices  | ❌  | ❌    | ✅  | ✅   |
| Expenses  | ✅  | ✅    | ✅  | ✅   |
| Reports   | ✅  | ✅    | ✅  | ❌   |

## Exporting (UI)

1. Go to any list view or report
2. Click **Export** button
3. Select format
4. Choose date range and filters
5. Download file

## Exporting (API)

```bash
# Export all data
GET /api/export/all

# Export specific entity
GET /api/export?entity=Task&format=csv&startDate=2025-01-01&endDate=2025-12-31
```

## Related Pages

- [Import/Export](./import-export) — full import/export guide
- [Reports](./reports-and-analytics) — reporting features
- [Data Migration](../troubleshooting/data-migration) — migration
