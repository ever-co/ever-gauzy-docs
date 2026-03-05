---
sidebar_position: 18
---

# Data Encryption

Encryption at rest and in transit for Gauzy deployments.

## In Transit (TLS)

### HTTPS Configuration

All production deployments must use TLS:

```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /etc/ssl/certs/gauzy.crt;
    ssl_certificate_key /etc/ssl/private/gauzy.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}
```

### Internal Communication

- API ↔ Database: Use `sslmode=require`
- API ↔ Redis: Use `rediss://` (TLS)
- API ↔ S3: HTTPS endpoints

## At Rest

### Database Encryption

PostgreSQL Transparent Data Encryption:

```sql
-- Check if encryption is enabled
SHOW ssl;
-- Result: on
```

### Column-Level Encryption

For sensitive data fields:

```typescript
@MultiORMColumn({
  transformer: new EncryptionTransformer({
    key: process.env.ENCRYPTION_KEY,
    algorithm: 'aes-256-gcm',
  }),
})
ssnNumber: string;
```

### File Storage Encryption

```env
# AWS S3 server-side encryption
AWS_S3_ENCRYPTION=AES256
```

## Key Management

| Key               | Storage              | Rotation  |
| ----------------- | -------------------- | --------- |
| JWT Secret        | Environment variable | Quarterly |
| DB Encryption Key | Vault/KMS            | Annually  |
| S3 Encryption Key | AWS KMS              | Auto      |
| TLS Certificate   | File/Cert Manager    | 90 days   |

## Related Pages

- [SSL Certificate Management](../devops/ssl-certificate-management) — SSL
- [Security Headers](./security-headers) — headers
- [Compliance](./compliance-gdpr) — GDPR
