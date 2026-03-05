---
sidebar_position: 12
---

# Tutorial: Migrating from Other Platforms

Step-by-step guide for migrating your data from other time tracking and project management tools.

## From Hubstaff

Gauzy has a built-in Hubstaff integration:

1. Go to **Integrations** → **Hubstaff**
2. Enter your Hubstaff API token
3. Select data to import:
   - Organizations → Gauzy organizations
   - Projects → Gauzy projects
   - Tasks → Gauzy tasks
   - Time logs → Gauzy time logs
   - Members → Gauzy employees
4. Click **Sync**

## From Upwork

1. Go to **Integrations** → **Upwork**
2. Authorize with Upwork credentials
3. Select teams and contracts to import
4. Map Upwork freelancers to Gauzy employees
5. Sync time logs and screenshots

## From Toggl

Toggl doesn't have a direct integration. Use CSV export:

1. **Export from Toggl**: Reports → Detailed → Export CSV
2. **Format CSV** to match Gauzy import format:
   ```csv
   employeeEmail,startedAt,stoppedAt,projectName,taskTitle,description
   ```
3. **Import into Gauzy**: Settings → Import/Export → Import CSV

## From Harvest

1. Export time entries from Harvest as CSV
2. Map Harvest fields to Gauzy fields
3. Import via the Gauzy API or CSV import

## From Clockify

1. Export workspace data from Clockify (CSV format)
2. Transform to match Gauzy format
3. Import via API or bulk import tool

## General Migration Checklist

- [ ] Export all historical time data
- [ ] Export employee/member list
- [ ] Export project structures
- [ ] Export client/contact information
- [ ] Import into Gauzy in order: Contacts → Projects → Employees → Time Logs
- [ ] Verify data integrity
- [ ] Train team on new platform

## Related Pages

- [Data Migration](../troubleshooting/data-migration) — technical guide
- [Import/Export](../features/import-export) — import/export feature
