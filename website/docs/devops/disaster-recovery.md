---
sidebar_position: 32
---

# Disaster Recovery

Plan and execute disaster recovery for Ever Gauzy deployments.

## Recovery Point Objective (RPO) & Recovery Time Objective (RTO)

| Tier     | RPO        | RTO       | Strategy               |
| -------- | ---------- | --------- | ---------------------- |
| Critical | < 1 hour   | < 15 min  | Hot standby + replicas |
| Standard | < 24 hours | < 1 hour  | Warm standby + backups |
| Basic    | < 7 days   | < 4 hours | Cold backup + restore  |

## Backup Strategy

### Database Backups

```bash
# Daily automated backup
0 2 * * * pg_dump -h $DB_HOST -U $DB_USER gauzy | gzip > /backups/gauzy_$(date +\%Y\%m\%d).sql.gz

# Weekly full backup with retention
find /backups -type f -mtime +30 -delete
```

### File Storage Backups

```bash
# Sync uploads to backup location
aws s3 sync s3://gauzy-uploads s3://gauzy-backups/uploads/

# Or for local storage
rsync -avz /app/uploads/ /backup/uploads/
```

### Configuration Backup

Store in version control:

- `.env` templates (without secrets)
- Docker Compose files
- Kubernetes manifests
- Nginx configurations

## Recovery Procedures

### 1. Database Recovery

```bash
# Restore from backup
gunzip -c gauzy_20250305.sql.gz | psql -h $DB_HOST -U $DB_USER gauzy
```

### 2. Application Recovery

```bash
# Pull latest images
docker compose pull

# Start services
docker compose up -d

# Verify health
curl http://localhost:3000/api/health
```

### 3. Full Recovery Checklist

- [ ] Restore database from backup
- [ ] Restore file uploads
- [ ] Deploy application containers
- [ ] Verify health checks pass
- [ ] Test authentication
- [ ] Verify data integrity
- [ ] Update DNS if needed
- [ ] Notify team

## Related Pages

- [Database Backup](./database-backup) — backup strategies
- [Production Deployment](./production-deployment) — deployment
- [Health Checks](../observability/health-checks) — monitoring
