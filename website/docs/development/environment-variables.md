---
sidebar_position: 5
---

# Environment Variables Reference

Complete reference for all environment variables in Ever Gauzy.

## Application

| Variable          | Default                 | Description      |
| ----------------- | ----------------------- | ---------------- |
| `NODE_ENV`        | `development`           | Environment mode |
| `API_BASE_URL`    | `http://localhost:3000` | API server URL   |
| `CLIENT_BASE_URL` | `http://localhost:4200` | Frontend URL     |
| `API_HOST`        | `0.0.0.0`               | API bind host    |
| `API_PORT`        | `3000`                  | API port         |
| `DEMO`            | `false`                 | Enable demo mode |

## Database

| Variable         | Default     | Description          |
| ---------------- | ----------- | -------------------- |
| `DB_TYPE`        | `sqlite`    | Database type        |
| `DB_ORM`         | `typeorm`   | ORM selection        |
| `DB_HOST`        | `localhost` | Database host        |
| `DB_PORT`        | `5432`      | Database port        |
| `DB_NAME`        | `gauzy`     | Database name        |
| `DB_USER`        | `postgres`  | Database user        |
| `DB_PASS`        |             | Database password    |
| `DB_SSL_MODE`    | `false`     | SSL connection       |
| `DB_POOL_SIZE`   | `40`        | Connection pool size |
| `DB_SYNCHRONIZE` | `false`     | Auto-sync schema     |
| `DB_LOGGING`     | `false`     | Query logging        |

## Authentication

| Variable                            | Default  | Description                |
| ----------------------------------- | -------- | -------------------------- |
| `JWT_SECRET`                        |          | JWT signing secret         |
| `JWT_TOKEN_EXPIRATION_TIME`         | `86400`  | Access token TTL (seconds) |
| `JWT_REFRESH_TOKEN_SECRET`          |          | Refresh token secret       |
| `JWT_REFRESH_TOKEN_EXPIRATION_TIME` | `604800` | Refresh token TTL          |

## OAuth Providers

| Variable                  | Description                |
| ------------------------- | -------------------------- |
| `GOOGLE_CLIENT_ID`        | Google OAuth client ID     |
| `GOOGLE_CLIENT_SECRET`    | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL`     | Google callback URL        |
| `FACEBOOK_CLIENT_ID`      | Facebook App ID            |
| `FACEBOOK_CLIENT_SECRET`  | Facebook App Secret        |
| `GITHUB_CLIENT_ID`        | GitHub OAuth App ID        |
| `GITHUB_CLIENT_SECRET`    | GitHub OAuth App Secret    |
| `MICROSOFT_CLIENT_ID`     | Microsoft App ID           |
| `MICROSOFT_CLIENT_SECRET` | Microsoft App Secret       |

## File Storage

| Variable                | Default | Description      |
| ----------------------- | ------- | ---------------- |
| `FILE_PROVIDER`         | `LOCAL` | Storage provider |
| `AWS_ACCESS_KEY_ID`     |         | S3 access key    |
| `AWS_SECRET_ACCESS_KEY` |         | S3 secret key    |
| `AWS_S3_BUCKET`         |         | S3 bucket name   |
| `AWS_REGION`            |         | S3 region        |

## Email

| Variable            | Description          |
| ------------------- | -------------------- |
| `MAIL_FROM_ADDRESS` | Sender email address |
| `MAIL_HOST`         | SMTP host            |
| `MAIL_PORT`         | SMTP port            |
| `MAIL_USERNAME`     | SMTP username        |
| `MAIL_PASSWORD`     | SMTP password        |
| `SENDGRID_API_KEY`  | SendGrid API key     |

## Rate Limiting

| Variable           | Default | Description             |
| ------------------ | ------- | ----------------------- |
| `THROTTLE_ENABLED` | `true`  | Enable throttling       |
| `THROTTLE_TTL`     | `60`    | Time window (seconds)   |
| `THROTTLE_LIMIT`   | `60`    | Max requests per window |

## Integrations

| Variable                       | Description            |
| ------------------------------ | ---------------------- |
| `GAUZY_GITHUB_APP_ID`          | GitHub App ID          |
| `GAUZY_GITHUB_APP_PRIVATE_KEY` | GitHub App private key |
| `GAUZY_GITHUB_WEBHOOK_SECRET`  | GitHub webhook secret  |
| `UPWORK_API_KEY`               | Upwork API key         |
| `HUBSTAFF_CLIENT_ID`           | HubStaff Client ID     |

## Feature Flags

| Variable                | Default | Description   |
| ----------------------- | ------- | ------------- |
| `FEATURE_DASHBOARD`     | `true`  | Dashboard     |
| `FEATURE_TIME_TRACKING` | `true`  | Time tracking |
| `FEATURE_ESTIMATE`      | `true`  | Estimates     |

## Related Pages

- [Database Overview](../database/database-overview)
- [JWT Authentication](../authentication/jwt-authentication)
- [Integrations Overview](../integrations/integrations-overview)
