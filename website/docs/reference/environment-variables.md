---
sidebar_position: 8
---

# Environment Variables Reference

Comprehensive reference of all environment variables used by Ever Gauzy.

## Core

| Variable   | Required | Default     | Description      |
| ---------- | -------- | ----------- | ---------------- |
| `NODE_ENV` | No       | development | Environment mode |
| `PORT`     | No       | 3000        | API server port  |
| `HOST`     | No       | 0.0.0.0     | API bind host    |

## Database

| Variable       | Required | Default   | Description                   |
| -------------- | -------- | --------- | ----------------------------- |
| `DB_TYPE`      | Yes      | sqlite    | `sqlite`, `postgres`, `mysql` |
| `DB_HOST`      | Postgres | localhost | Database host                 |
| `DB_PORT`      | Postgres | 5432      | Database port                 |
| `DB_NAME`      | Yes      | gauzy     | Database name                 |
| `DB_USER`      | Postgres | postgres  | Database user                 |
| `DB_PASS`      | Postgres | —         | Database password             |
| `DB_SSL_MODE`  | No       | false     | Enable SSL                    |
| `DB_POOL_SIZE` | No       | 40        | Connection pool size          |
| `DB_ORM`       | No       | typeorm   | `typeorm` or `mikroorm`       |

## Authentication

| Variable                       | Required | Description                |
| ------------------------------ | -------- | -------------------------- |
| `JWT_SECRET`                   | Yes      | JWT signing secret         |
| `JWT_REFRESH_SECRET`           | Yes      | Refresh token secret       |
| `JWT_TOKEN_EXPIRATION`         | No       | Token expiry (default: 1d) |
| `JWT_REFRESH_TOKEN_EXPIRATION` | No       | Refresh expiry (7d)        |

## Redis

| Variable     | Required | Default   | Description               |
| ------------ | -------- | --------- | ------------------------- |
| `REDIS_URL`  | Prod     | —         | Full Redis connection URL |
| `REDIS_HOST` | No       | localhost | Redis host                |
| `REDIS_PORT` | No       | 6379      | Redis port                |

## URLs

| Variable          | Required | Description    |
| ----------------- | -------- | -------------- |
| `API_BASE_URL`    | Yes      | Public API URL |
| `CLIENT_BASE_URL` | Yes      | Web app URL    |

## Email (SMTP)

| Variable            | Required | Description      |
| ------------------- | -------- | ---------------- |
| `MAIL_FROM_ADDRESS` | Yes      | Sender email     |
| `MAIL_HOST`         | Yes      | SMTP server host |
| `MAIL_PORT`         | No       | SMTP port (587)  |
| `MAIL_USERNAME`     | Yes      | SMTP username    |
| `MAIL_PASSWORD`     | Yes      | SMTP password    |

## File Storage

| Variable                | S3  | Description                   |
| ----------------------- | --- | ----------------------------- |
| `FILE_PROVIDER`         | —   | LOCAL, S3, WASABI, CLOUDINARY |
| `AWS_ACCESS_KEY_ID`     | S3  | AWS key                       |
| `AWS_SECRET_ACCESS_KEY` | S3  | AWS secret                    |
| `AWS_REGION`            | S3  | AWS region                    |
| `AWS_S3_BUCKET`         | S3  | S3 bucket name                |

## Integrations

| Variable                      | Description           |
| ----------------------------- | --------------------- |
| `GAUZY_GITHUB_CLIENT_ID`      | GitHub App client ID  |
| `GAUZY_GITHUB_CLIENT_SECRET`  | GitHub App secret     |
| `GAUZY_GITHUB_WEBHOOK_SECRET` | GitHub webhook secret |
| `GOOGLE_CLIENT_ID`            | Google OAuth client   |
| `GOOGLE_CLIENT_SECRET`        | Google OAuth secret   |
| `SENTRY_DSN`                  | Sentry error tracking |

## Observability

| Variable                    | Description              |
| --------------------------- | ------------------------ |
| `SENTRY_DSN`                | Sentry DSN               |
| `SENTRY_TRACES_SAMPLE_RATE` | Trace sampling rate      |
| `LOG_LEVEL`                 | debug, info, warn, error |
| `LOG_FORMAT`                | text or json             |

## Rate Limiting

| Variable         | Default | Description             |
| ---------------- | ------- | ----------------------- |
| `THROTTLE_TTL`   | 60      | Window in seconds       |
| `THROTTLE_LIMIT` | 100     | Max requests per window |

## Related Pages

- [Configuration System](../architecture/configuration-system) — config architecture
- [Production Deployment](../devops/production-deployment) — deployment setup
