---
sidebar_position: 5
---

# Secret Management

Best practices for managing secrets and sensitive configuration.

## Secret Categories

| Category         | Examples                                            |
| ---------------- | --------------------------------------------------- |
| Authentication   | `JWT_SECRET`, `JWT_REFRESH_SECRET`                  |
| Database         | `DB_PASS`, connection strings                       |
| File storage     | `AWS_SECRET_ACCESS_KEY`, `WASABI_SECRET_ACCESS_KEY` |
| OAuth            | `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_SECRET`      |
| Email            | `MAIL_PASSWORD`, SMTP credentials                   |
| Integrations     | `SENTRY_DSN`, API keys                              |
| Private registry | `VERDACCIO_TOKEN`                                   |

## Storage Methods

### Environment Variables (Recommended)

Store secrets as environment variables, injected at runtime:

```bash
export JWT_SECRET=$(openssl rand -base64 32)
export DB_PASS=$(openssl rand -base64 24)
```

### Docker Secrets

For Docker Swarm deployments:

```yaml
secrets:
  db_password:
    external: true
services:
  api:
    secrets:
      - db_password
```

### GitHub Secrets

For CI/CD pipelines, store secrets in GitHub Secrets:

```yaml
env:
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
  DB_PASS: ${{ secrets.DB_PASS }}
```

### Cloud Secret Managers

| Provider  | Service               |
| --------- | --------------------- |
| AWS       | AWS Secrets Manager   |
| GCP       | Google Secret Manager |
| Azure     | Azure Key Vault       |
| Hashicorp | Vault                 |

## Security Practices

| Practice                 | Recommendation                 |
| ------------------------ | ------------------------------ |
| Secret rotation          | Rotate every 90 days           |
| Minimum privilege        | Grant only required access     |
| Audit logging            | Log secret access              |
| No hardcoded secrets     | Never commit to git            |
| Separate per environment | Different secrets for dev/prod |

## Related Pages

- [Environment Variables](../devops/environment-variables) — all config variables
- [Production Deployment](../devops/production-deployment) — deployment guide
