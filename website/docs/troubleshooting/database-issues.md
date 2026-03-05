---
sidebar_position: 2
---

# Database Connection Issues

Troubleshoot database connectivity problems.

## PostgreSQL Connection Refused

**Symptom:** `ECONNREFUSED 127.0.0.1:5432`

**Fixes:**

1. Check PostgreSQL is running: `pg_isready`
2. Verify `DB_HOST` and `DB_PORT` in `.env`
3. Check PostgreSQL `pg_hba.conf` allows connections

## Authentication Failed

**Symptom:** `password authentication failed for user`

**Fixes:**

1. Verify `DB_USER` and `DB_PASS` in `.env`
2. Check user exists: `\du` in psql
3. Reset password: `ALTER USER gauzy WITH PASSWORD 'new-password';`

## SSL Required

**Symptom:** `no pg_hba.conf entry for host ... SSL off`

**Fix:** Set SSL mode:

```
DB_SSL_MODE=true
```

## Connection Pool Exhausted

**Symptom:** `too many clients already` or slow queries

**Fixes:**

1. Increase pool size: `DB_POOL_SIZE=60`
2. Use PgBouncer for connection pooling
3. Check for connection leaks (unclosed connections)

## Migration Errors

**Symptom:** `relation "xxx" does not exist`

**Fix:**

```bash
# Run pending migrations
yarn typeorm migration:run

# Check migration status
yarn typeorm migration:show
```

## SQLite Lock Errors

**Symptom:** `SQLITE_BUSY: database is locked`

**Fix:** SQLite doesn't support concurrent writes. For multi-user, switch to PostgreSQL:

```
DB_TYPE=postgres
```

## Related Pages

- [Database Backup & Recovery](../devops/database-backup) — backup guide
- [Environment Variables](../devops/environment-variables) — DB config
