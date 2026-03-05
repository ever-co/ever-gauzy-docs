---
sidebar_position: 9
---

# Data Migration Guide

Migrate data between Gauzy instances or from other platforms.

## Exporting Data

### API Export

```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.example.com/api/export?entities=Employee,Task,TimeLog \
  -o gauzy-export.json
```

### Database Export

```bash
pg_dump -h $DB_HOST -U $DB_USER gauzy > gauzy_full_backup.sql
```

## Importing Data

### From JSON

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -F "file=@gauzy-export.json" \
  https://api.example.com/api/import
```

### From Other Platforms

| Platform | Method                    |
| -------- | ------------------------- |
| Hubstaff | Built-in integration sync |
| Upwork   | Built-in integration sync |
| Toggl    | CSV export → Gauzy import |
| Harvest  | CSV export → Gauzy import |
| Custom   | Use the REST API          |

## CSV Import Format

### Employees

```csv
firstName,lastName,email,startedWorkOn
John,Doe,john@example.com,2024-01-15
Jane,Smith,jane@example.com,2024-02-01
```

### Time Logs

```csv
employeeEmail,startedAt,stoppedAt,projectName,taskTitle
john@example.com,2024-01-15T09:00:00Z,2024-01-15T17:00:00Z,Project A,Task 1
```

## Migration Steps

1. **Export** data from source system
2. **Transform** data to match Gauzy format
3. **Import** via API or direct database insert
4. **Verify** data integrity
5. **Test** functionality with migrated data

## Related Pages

- [Import/Export](../admin/import-export) — import/export guide
- [Database Backup](../devops/database-backup) — backup strategy
