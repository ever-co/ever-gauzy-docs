---
sidebar_position: 7
---

# Backup & Restore Workflow

Step-by-step backup and recovery procedures.

## Scheduled Backups

### Daily Automated Backup

```bash
#!/bin/bash
# backup.sh - run via cron daily at 2 AM
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/gauzy"

# PostgreSQL backup
pg_dump -h $DB_HOST -U $DB_USER -d gauzy \
  -F custom -Z 9 \
  -f "$BACKUP_DIR/gauzy_$DATE.dump"

# Upload to S3
aws s3 cp "$BACKUP_DIR/gauzy_$DATE.dump" \
  s3://your-backup-bucket/gauzy/

# Cleanup local (keep 7 days)
find $BACKUP_DIR -name "*.dump" -mtime +7 -delete

echo "Backup completed: gauzy_$DATE.dump"
```

### Cron Setup

```bash
# crontab -e
0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1
```

## Manual Backup

```bash
# Full database dump
pg_dump -h localhost -U postgres -d gauzy -F custom -f gauzy_manual.dump

# Schema only
pg_dump -h localhost -U postgres -d gauzy --schema-only -f schema.sql

# Data only
pg_dump -h localhost -U postgres -d gauzy --data-only -f data.sql
```

## Restore Procedures

### Full Restore

```bash
# Create fresh database
createdb -h localhost -U postgres gauzy_restored

# Restore from dump
pg_restore -h localhost -U postgres -d gauzy_restored gauzy_backup.dump

# Verify
psql -h localhost -U postgres -d gauzy_restored \
  -c "SELECT count(*) FROM employee;"
```

### Point-in-Time Recovery

Requires WAL archiving to be enabled:

```bash
# Restore to specific timestamp
recovery_target_time = '2025-03-05 15:00:00'
```

## Verification

| Check            | Command                       |
| ---------------- | ----------------------------- |
| Record counts    | Compare key table counts      |
| Recent data      | Verify latest timestamps      |
| Relationships    | Check FK integrity            |
| Application test | Start API against restored DB |

## Related Pages

- [Database Backup Strategies](../devops/database-backup) — backup methods
- [Disaster Recovery](../devops/disaster-recovery) — DR planning
- [Database Schema](../database/schema-overview) — schema
