---
sidebar_position: 20
---

# Upgrade Checklist

Step-by-step checklist for upgrading Ever Gauzy versions.

## Pre-Upgrade

- [ ] **Read release notes** — Check [changelog](./api-changelog) for breaking changes
- [ ] **Backup database** — Full pg_dump before any upgrade
- [ ] **Test on staging** — Never upgrade production first
- [ ] **Check Node.js version** — Verify compatible Node.js version
- [ ] **Review migration files** — Check for new database migrations
- [ ] **Review env changes** — Check for new/renamed environment variables
- [ ] **Notify team** — Announce maintenance window

## During Upgrade

### 1. Pull Latest Code

```bash
git fetch origin
git checkout v1.X.X  # or latest tag
```

### 2. Install Dependencies

```bash
yarn install --frozen-lockfile
```

### 3. Run Migrations

```bash
# TypeORM
yarn typeorm migration:run

# MikroORM
npx mikro-orm migration:up
```

### 4. Build

```bash
yarn build:api
yarn build
```

### 5. Deploy

```bash
# Docker
docker compose pull
docker compose up -d

# Kubernetes
kubectl set image deployment/gauzy-api api=ghcr.io/ever-co/gauzy-api:v1.X.X
```

## Post-Upgrade

- [ ] **Verify health** — `curl /api/health`
- [ ] **Check logs** — No unexpected errors
- [ ] **Test key features** — Login, time tracking, invoicing
- [ ] **Monitor metrics** — Error rates, response times
- [ ] **Verify data** — Spot-check recent records
- [ ] **Update documentation** — If internal docs reference version

## Rollback Plan

If issues found:

1. Revert database migrations
2. Deploy previous image/tag
3. Verify service health
4. Investigate root cause

See [Rollback Strategies](../devops/rollback-strategies) for details.

## Related Pages

- [Release Management](../workflows/release-management) — release process
- [Rollback Strategies](../devops/rollback-strategies) — rollback
- [TypeORM Migrations](../database/typeorm-migrations) — migrations
