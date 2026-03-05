---
sidebar_position: 19
---

# GDPR & Compliance

Data protection and regulatory compliance in Ever Gauzy.

## GDPR Requirements

| Requirement         | Gauzy Implementation         |
| ------------------- | ---------------------------- |
| Right to access     | Employee data export         |
| Right to erasure    | Account deletion, data purge |
| Data minimization   | Configurable data collection |
| Consent management  | Screenshot consent, tracking |
| Data portability    | JSON/CSV export              |
| Breach notification | Audit logging, alerts        |

## Data Subject Rights

### Right to Access (Article 15)

Employees can export their data:

1. Go to **Profile** → **Privacy** → **Export My Data**
2. Downloads JSON with all personal data

### Right to Erasure (Article 17)

Admin can delete employee data:

1. Go to **Employees** → select employee
2. Click **Delete** → **Permanently Delete All Data**
3. Removes: user account, time logs, screenshots, activities

## Data Collection Settings

| Data Type        | Default  | Configurable |
| ---------------- | -------- | ------------ |
| Screenshots      | Enabled  | ✅ Per org   |
| Activity levels  | Enabled  | ✅ Per org   |
| App/URL tracking | Enabled  | ✅ Per org   |
| Mouse/keyboard   | Enabled  | ✅ Per org   |
| GPS location     | Disabled | ✅ Per org   |

## Data Retention

Configure automatic data cleanup:

```env
# Auto-delete screenshots older than N days
SCREENSHOT_RETENTION_DAYS=90

# Auto-delete activity logs older than N days
ACTIVITY_RETENTION_DAYS=365
```

## Audit Trail

All data access and modifications are logged. See [Audit Logging](../architecture/audit-logging).

## Related Pages

- [Data Encryption](./data-encryption) — encryption
- [Audit Logging](../architecture/audit-logging) — audit trail
- [Data Export](../features/data-export-formats) — exporting data
