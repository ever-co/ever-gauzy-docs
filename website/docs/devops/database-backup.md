---
sidebar_position: 4
---

# Database Backup & Recovery

Strategies for backing up and restoring the Gauzy database.

## PostgreSQL Backup

### Automated Daily Backups

```bash
# Cron job for daily backups at 2 AM
0 2 * * * pg_dump -h localhost -U postgres gauzy | gzip > /backups/gauzy_$(date +\%Y\%m\%d).sql.gz
```

### Manual Backup

```bash
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME -F c -f gauzy_backup.dump
```

### Point-in-Time Recovery

Enable WAL archiving for PITR:

```bash
# postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'cp %p /wal_archive/%f'
```

## SQLite Backup

For development/small deployments using SQLite:

```bash
sqlite3 gauzy.sqlite3 ".backup 'gauzy_backup.sqlite3'"
```

## Restore Procedure

```bash
# PostgreSQL restore
pg_restore -h $DB_HOST -U $DB_USER -d $DB_NAME -c gauzy_backup.dump

# If using SQL format
psql -h $DB_HOST -U $DB_USER -d $DB_NAME < gauzy_backup.sql
```

## Backup Checklist

- [ ] Automated daily backups configured
- [ ] Backups stored off-site (S3, GCS)
- [ ] Retention policy set (30 days recommended)
- [ ] Restore procedure tested monthly
- [ ] File storage (uploads) backed up separately

## Related Pages

- [Production Deployment](./production-deployment) — deployment setup
- [Scaling & High Availability](./scaling) — HA architecture
