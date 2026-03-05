---
sidebar_position: 2
---

# Upgrading Between Versions

Version upgrade procedures and breaking change migration.

## General Upgrade Process

### 1. Check Release Notes

Before upgrading, always review:

- [GitHub Releases](https://github.com/ever-co/ever-gauzy/releases)
- [API Changelog](../reference/api-changelog)

### 2. Backup

```bash
# Database backup
pg_dump -h $DB_HOST -U $DB_USER gauzy > backup_$(date +%Y%m%d).sql

# File storage backup
tar -czf uploads_backup.tar.gz ./apps/api/public/
```

### 3. Update Code

```bash
git fetch origin
git checkout main
git pull
```

### 4. Update Dependencies

```bash
yarn install
```

### 5. Run Migrations

```bash
yarn typeorm migration:run
```

### 6. Build

```bash
yarn build
```

### 7. Restart Services

```bash
# Docker
docker compose down && docker compose up -d

# PM2
pm2 restart all

# Systemd
sudo systemctl restart gauzy-api
```

## Breaking Changes by Version

### v0.x → v1.0

| Change                     | Action Required                 |
| -------------------------- | ------------------------------- |
| Relation whitelisting      | Update custom API clients       |
| UUID validation on all IDs | Ensure UUIDs in requests        |
| Auth endpoint changes      | Update login flow               |
| MikroORM 6.x               | Update custom entity decorators |

### Docker Image Changes

```diff
- ghcr.io/ever-co/gauzy-api:0.x
+ ghcr.io/ever-co/gauzy-api:latest
```

## Rollback Procedure

If upgrade fails:

```bash
# Restore database
psql -h $DB_HOST -U $DB_USER gauzy < backup_20250101.sql

# Revert code
git checkout v0.x.x

# Rebuild and restart
yarn install && yarn build
```

## Related Pages

- [Release Process](../development/release-process) — release workflow
- [API Changelog](../reference/api-changelog) — API changes
- [Database Backup](../devops/database-backup) — backup strategy
