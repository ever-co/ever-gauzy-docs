---
sidebar_position: 2
---

# Environment Variables Reference

Comprehensive reference of all environment variables used in Ever Gauzy.

## Core Application

| Variable          | Description              | Default       | Required |
| ----------------- | ------------------------ | ------------- | -------- |
| `NODE_ENV`        | Environment mode         | `development` | No       |
| `PORT`            | API server port          | `3000`        | No       |
| `HOST`            | API server host          | `0.0.0.0`     | No       |
| `APP_NAME`        | Application name         | `Gauzy`       | No       |
| `API_BASE_URL`    | Public API URL           | —             | Yes      |
| `CLIENT_BASE_URL` | Frontend application URL | —             | Yes      |

## Database

| Variable       | Description                      | Default     | Required |
| -------------- | -------------------------------- | ----------- | -------- |
| `DB_TYPE`      | Database type                    | `sqlite`    | No       |
| `DB_HOST`      | Database host                    | `localhost` | No       |
| `DB_PORT`      | Database port                    | `5432`      | No       |
| `DB_NAME`      | Database name                    | `gauzy`     | No       |
| `DB_USER`      | Database username                | `postgres`  | No       |
| `DB_PASS`      | Database password                | —           | Yes\*    |
| `DB_SSL_MODE`  | SSL mode                         | `false`     | No       |
| `DB_POOL_SIZE` | Connection pool size             | `40`        | No       |
| `DB_ORM`       | ORM type (`typeorm`/`mikro-orm`) | `typeorm`   | No       |

## Authentication

| Variable                      | Description            | Default  | Required |
| ----------------------------- | ---------------------- | -------- | -------- |
| `JWT_SECRET`                  | JWT signing secret     | —        | **Yes**  |
| `JWT_TOKEN_EXPIRATION_TIME`   | JWT token expiry (sec) | `86400`  | No       |
| `JWT_REFRESH_SECRET`          | Refresh token secret   | —        | **Yes**  |
| `JWT_REFRESH_EXPIRATION_TIME` | Refresh token expiry   | `604800` | No       |

## Redis

| Variable         | Description    | Default     | Required |
| ---------------- | -------------- | ----------- | -------- |
| `REDIS_HOST`     | Redis host     | `localhost` | No       |
| `REDIS_PORT`     | Redis port     | `6379`      | No       |
| `REDIS_PASSWORD` | Redis password | —           | No       |
| `REDIS_TLS`      | Enable TLS     | `false`     | No       |

## File Storage

| Variable                   | Description           | Default | Required   |
| -------------------------- | --------------------- | ------- | ---------- |
| `FILE_PROVIDER`            | Storage provider      | `LOCAL` | No         |
| `AWS_ACCESS_KEY_ID`        | S3 access key         | —       | S3 only    |
| `AWS_SECRET_ACCESS_KEY`    | S3 secret key         | —       | S3 only    |
| `AWS_REGION`               | S3 region             | —       | S3 only    |
| `AWS_S3_BUCKET`            | S3 bucket name        | —       | S3 only    |
| `WASABI_ACCESS_KEY_ID`     | Wasabi access key     | —       | Wasabi     |
| `WASABI_SECRET_ACCESS_KEY` | Wasabi secret key     | —       | Wasabi     |
| `WASABI_REGION`            | Wasabi region         | —       | Wasabi     |
| `WASABI_SERVICE_URL`       | Wasabi service URL    | —       | Wasabi     |
| `WASABI_S3_BUCKET`         | Wasabi bucket name    | —       | Wasabi     |
| `CLOUDINARY_API_KEY`       | Cloudinary API key    | —       | Cloudinary |
| `CLOUDINARY_API_SECRET`    | Cloudinary API secret | —       | Cloudinary |
| `CLOUDINARY_CLOUD_NAME`    | Cloudinary cloud name | —       | Cloudinary |

## OAuth

| Variable                  | Description               | Default | Required |
| ------------------------- | ------------------------- | ------- | -------- |
| `GOOGLE_CLIENT_ID`        | Google OAuth client ID    | —       | No       |
| `GOOGLE_CLIENT_SECRET`    | Google OAuth secret       | —       | No       |
| `GOOGLE_CALLBACK_URL`     | Google OAuth callback     | —       | No       |
| `FACEBOOK_CLIENT_ID`      | Facebook OAuth client ID  | —       | No       |
| `FACEBOOK_CLIENT_SECRET`  | Facebook OAuth secret     | —       | No       |
| `GITHUB_CLIENT_ID`        | GitHub OAuth client ID    | —       | No       |
| `GITHUB_CLIENT_SECRET`    | GitHub OAuth secret       | —       | No       |
| `MICROSOFT_CLIENT_ID`     | Microsoft OAuth client ID | —       | No       |
| `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth secret    | —       | No       |

## Email

| Variable            | Description        | Default | Required |
| ------------------- | ------------------ | ------- | -------- |
| `MAIL_FROM_ADDRESS` | Default from email | —       | No       |
| `MAIL_HOST`         | SMTP host          | —       | No       |
| `MAIL_PORT`         | SMTP port          | `587`   | No       |
| `MAIL_USERNAME`     | SMTP username      | —       | No       |
| `MAIL_PASSWORD`     | SMTP password      | —       | No       |

## Monitoring

| Variable                    | Description               | Default | Required |
| --------------------------- | ------------------------- | ------- | -------- |
| `SENTRY_DSN`                | Sentry error tracking DSN | —       | No       |
| `SENTRY_TRACES_SAMPLE_RATE` | Sentry trace sample rate  | `0.01`  | No       |

## Feature Flags

| Variable              | Description         | Default | Required |
| --------------------- | ------------------- | ------- | -------- |
| `UNLEASH_APP_NAME`    | Unleash app name    | —       | No       |
| `UNLEASH_API_URL`     | Unleash server URL  | —       | No       |
| `UNLEASH_INSTANCE_ID` | Unleash instance ID | —       | No       |
| `UNLEASH_API_KEY`     | Unleash API key     | —       | No       |

## Related Pages

- [Production Deployment](./production-deployment) — deployment guide
- [Secret Management](../security/secret-management) — handling secrets
