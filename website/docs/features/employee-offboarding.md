---
sidebar_position: 79
---

# Employee Offboarding

Process for offboarding employees from the platform.

## Offboarding Checklist

### Administrative

- [ ] Set employee end date
- [ ] Revoke system access
- [ ] Disable user account
- [ ] Transfer project ownership
- [ ] Reassign open tasks
- [ ] Close pending timesheets
- [ ] Process final timesheet approval
- [ ] Calculate remaining leave balance

### Data & Equipment

- [ ] Retrieve company equipment
- [ ] Export employee data (GDPR compliance)
- [ ] Archive time logs and screenshots
- [ ] Remove from active teams
- [ ] Update org charts

## Process in Gauzy

### 1. Set End Date

```
PUT /api/employee/:id
{ "endWork": "2025-03-31", "isActive": false }
```

### 2. Deactivate Account

1. Go to **Employees** → select employee
2. Click **Edit** → set **End Date**
3. Toggle **Active** to off
4. Employee retains read-only access until account disabled

### 3. Reassign Tasks

1. Go to employee's active tasks
2. Bulk select open tasks
3. Reassign to replacement employee

### 4. Archive Data

Employee data is preserved (soft delete) for:

- Historical reports
- Audit compliance
- Financial records

## Related Pages

- [Employee Management](./employee-management) — employee features
- [Employee Onboarding Workflow](../workflows/employee-onboarding) — onboarding
- [GDPR Compliance](../security/compliance-gdpr) — data protection
