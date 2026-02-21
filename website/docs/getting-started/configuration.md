---
sidebar_position: 4
---

# Configuration

Ever Gauzy is configured through environment variables defined in `.env` files. This guide documents all available configuration options.

## Configuration Files

| File                | Purpose                                                 | Committed to Git?  |
| ------------------- | ------------------------------------------------------- | ------------------ |
| `.env.sample`       | Template with all available variables and documentation | ✅ Yes             |
| `.env`              | Your local overrides (create by copying `.env.sample`)  | ❌ No (gitignored) |
| `.env.local`        | Local development defaults (used by `yarn start`)       | ✅ Yes             |
| `.env.compose`      | Docker Compose production settings                      | ✅ Yes             |
| `.env.demo.compose` | Docker Compose demo settings                            | ✅ Yes             |
| `.env.docker`       | Docker build settings                                   | ✅ Yes             |

:::warning
Never put secret keys, passwords, or API credentials in files that are committed to Git. Only `.env` (gitignored) should contain secrets.
:::

## How Configuration Works

1. **Backend (NestJS)**: Reads `.env` directly via `dotenv`
2. **Frontend (Angular)**: Environment files (`environment.ts` / `environment.prod.ts`) are auto-generated from `.env` by the `.scripts/configure.ts` script on first run
3. **Desktop Apps**: Read environment variables and also support GUI-based configuration via Setup Wizard

:::note
Never edit auto-generated `environment.ts` files directly. Always modify `.env` files instead.
:::

## Core Settings

### Application

```bash
APP_NAME="Gauzy"                    # Application display name
APP_LOGO="http://localhost:4200/assets/images/logos/logo_Gauzy.png"
APP_SIGNATURE="Gauzy"               # Email signature
APP_LINK="http://localhost:4200"    # Main application URL
```

### URLs

```bash
API_BASE_URL=http://localhost:3000           # Backend API URL
CLIENT_BASE_URL=http://localhost:4200        # Frontend UI URL
PLATFORM_WEBSITE_URL=https://gauzy.co       # Marketing website
PLATFORM_WEBSITE_DOWNLOAD_URL=https://gauzy.co/downloads
```

### Mode Flags

```bash
DEMO=false              # Enable demo mode (resets data periodically)
IS_DOCKER=false         # Set true when running inside Docker
ALLOW_SUPER_ADMIN_ROLE=true   # Allow creating Super Admin users
```

## Database Configuration

### ORM Selection

```bash
DB_ORM=typeorm          # Options: typeorm | mikro-orm
```

### Database Type

```bash
DB_TYPE=better-sqlite3  # Options: sqlite | better-sqlite3 | postgres | mysql
```

### Connection Parameters

```bash
DB_HOST=localhost       # Database host
DB_PORT=5432            # Default: 5432 (PostgreSQL), 3306 (MySQL)
DB_NAME=gauzy           # Database name
DB_USER=postgres        # Database username
DB_PASS=root            # Database password
```

### Advanced Database Settings

```bash
DB_LOGGING=all                  # Query logging level
DB_POOL_SIZE=40                 # Connection pool size (TypeORM/MikroORM)
DB_POOL_SIZE_KNEX=10            # Connection pool size (Knex)
DB_CONNECTION_TIMEOUT=5000      # Connection timeout (ms)
DB_IDLE_TIMEOUT=10000           # Idle connection timeout (ms)
DB_SLOW_QUERY_LOGGING_TIMEOUT=10000  # Slow query threshold (ms)
DB_SSL_MODE=false               # Enable SSL for DB connection
DB_CA_CERT=                     # Base64-encoded SSL CA certificate
```

## Redis

```bash
REDIS_ENABLED=false
REDIS_URL=redis://localhost:6379    # Full Redis URL
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USER=
REDIS_PASSWORD=
REDIS_TLS=false
```

:::tip
Redis is required for distributed caching in production, Jitsu integration, and MCP Server session management. Without Redis, Gauzy falls back to in-memory caching.
:::

## Authentication

### JWT Configuration

```bash
JWT_SECRET=secretKey                          # Access token secret (CHANGE IN PRODUCTION!)
JWT_TOKEN_EXPIRATION_TIME=86400               # Access token TTL in seconds (24h)
JWT_REFRESH_TOKEN_SECRET=refreshSecretKey     # Refresh token secret (CHANGE IN PRODUCTION!)
JWT_REFRESH_TOKEN_EXPIRATION_TIME=86400       # Refresh token TTL in seconds (24h)
JWT_VERIFICATION_TOKEN_SECRET=verificationSecretKey   # Email verification token secret
JWT_VERIFICATION_TOKEN_EXPIRATION_TIME=86400
```

### Passwordless Authentication

```bash
MAGIC_CODE_EXPIRATION_TIME=600    # Magic sign-in code TTL in seconds (10 min)
```

### Session

```bash
EXPRESS_SESSION_SECRET=gauzy      # Express session secret
```

### Social OAuth Providers

```bash
# Google
GOOGLE_CLIENT_ID=XXXXXXX
GOOGLE_CLIENT_SECRET=XXXXXXX
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# GitHub
GAUZY_GITHUB_OAUTH_CLIENT_ID=XXXXXXX
GAUZY_GITHUB_OAUTH_CLIENT_SECRET=XXXXXXX
GAUZY_GITHUB_OAUTH_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

# Facebook
FACEBOOK_CLIENT_ID=XXXXXXX
FACEBOOK_CLIENT_SECRET=XXXXXXX
FACEBOOK_CALLBACK_URL=http://localhost:3000/api/auth/facebook/callback
FACEBOOK_GRAPH_VERSION=v3.0

# Twitter
TWITTER_CLIENT_ID=XXXXXXX
TWITTER_CLIENT_SECRET=XXXXXXX
TWITTER_CALLBACK_URL=http://localhost:3000/api/auth/twitter/callback

# LinkedIn
LINKEDIN_CLIENT_ID=XXXXXXX
LINKEDIN_CLIENT_SECRET=XXXXXXX
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback

# Microsoft
MICROSOFT_CLIENT_ID=XXXXXXX
MICROSOFT_CLIENT_SECRET=XXXXXXX
MICROSOFT_CALLBACK_URL=http://localhost:3000/api/auth/microsoft/callback
MICROSOFT_GRAPH_API_URL=https://graph.microsoft.com/v1.0

# Keycloak
KEYCLOAK_CLIENT_ID=XXXXXXX
KEYCLOAK_CLIENT_SECRET=XXXXXXX
KEYCLOAK_REALM=
KEYCLOAK_AUTH_SERVER_URL=https://keycloak.example.com/auth
KEYCLOAK_CALLBACK_URL=http://localhost:3000/api/auth/keycloak/callback

# Auth0
AUTH0_CLIENT_ID=XXXXXXX
AUTH0_CLIENT_SECRET=XXXXXXX
AUTH0_DOMAIN=XXXXXXX
```

### Feature Flags for Auth Methods

```bash
FEATURE_EMAIL_PASSWORD_LOGIN=true
FEATURE_MAGIC_LOGIN=true
FEATURE_GITHUB_LOGIN=true
FEATURE_FACEBOOK_LOGIN=true
FEATURE_GOOGLE_LOGIN=true
FEATURE_TWITTER_LOGIN=true
FEATURE_MICROSOFT_LOGIN=true
FEATURE_LINKEDIN_LOGIN=true
```

## File Storage

```bash
FILE_PROVIDER=LOCAL     # Options: LOCAL | S3 | WASABI | CLOUDINARY
```

### AWS S3

```bash
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=gauzy
```

### Wasabi

```bash
WASABI_ACCESS_KEY_ID=
WASABI_SECRET_ACCESS_KEY=
WASABI_REGION=us-east-1
WASABI_SERVICE_URL=https://s3.wasabisys.com
WASABI_S3_BUCKET=gauzy
WASABI_S3_FORCE_PATH_STYLE=true
```

### DigitalOcean Spaces

```bash
DIGITALOCEAN_ACCESS_KEY_ID=
DIGITALOCEAN_SECRET_ACCESS_KEY=
DIGITALOCEAN_REGION=us-east-1
DIGITALOCEAN_SERVICE_URL=
DIGITALOCEAN_CDN_URL=
DIGITALOCEAN_S3_BUCKET=gauzy
```

### Cloudinary

```bash
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_API_SECURE=true
CLOUDINARY_CDN_URL=https://res.cloudinary.com
```

## Email (SMTP)

```bash
MAIL_FROM_ADDRESS=gauzy@ever.co
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=
MAIL_PASSWORD=
```

## Rate Limiting

```bash
THROTTLE_ENABLED=true
THROTTLE_TTL=60000      # Time window in ms (1 minute)
THROTTLE_LIMIT=60000    # Max requests per window
```

## Monitoring & Observability

### Sentry

```bash
SENTRY_DSN=
SENTRY_HTTP_TRACING_ENABLED=
SENTRY_POSTGRES_TRACKING_ENABLED=
SENTRY_PROFILING_ENABLED=
SENTRY_TRACES_SAMPLE_RATE=
SENTRY_PROFILE_SAMPLE_RATE=
```

### PostHog

```bash
POSTHOG_KEY=
POSTHOG_HOST=
POSTHOG_ENABLED=
POSTHOG_FLUSH_INTERVAL=
```

### OpenTelemetry Tracing

```bash
OTEL_ENABLED=false
OTEL_PROVIDER=zipkin                # Options: zipkin, jaeger, etc.
OTEL_SERVICE_NAME=
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=
OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=
OTEL_EXPORTER_OTLP_ENDPOINT=
```

### Jitsu (Data Ingestion)

```bash
# Browser-side
JITSU_BROWSER_URL=
JITSU_BROWSER_WRITE_KEY=

# Server-side
JITSU_SERVER_URL=
JITSU_SERVER_WRITE_KEY=
JITSU_SERVER_DEBUG=
JITSU_SERVER_ECHO_EVENTS=
```

## Integration Services

### Gauzy AI

```bash
GAUZY_AI_GRAPHQL_ENDPOINT=http://localhost:3005/graphql
GAUZY_AI_REST_ENDPOINT=http://localhost:3005/api
GAUZY_AI_API_KEY=
GAUZY_AI_API_SECRET=
```

### Gauzy Cloud

```bash
GAUZY_CLOUD_ENDPOINT=https://api.gauzy.co
GAUZY_CLOUD_APP=https://app.gauzy.co
```

### Upwork

```bash
UPWORK_API_KEY=XXXXXXX
UPWORK_API_SECRET=XXXXXXX
UPWORK_REDIRECT_URL=http://localhost:3000/api/integrations/upwork/callback
UPWORK_POST_INSTALL_URL=http://localhost:4200/#/pages/integrations/upwork
```

### HubStaff

```bash
HUBSTAFF_CLIENT_ID=XXXXXXX
HUBSTAFF_CLIENT_SECRET=XXXXXXX
HUBSTAFF_REDIRECT_URL=http://localhost:3000/api/integration/hubstaff/callback
HUBSTAFF_POST_INSTALL_URL=http://localhost:4200/#/pages/integrations/hubstaff
```

### GitHub Apps

```bash
GAUZY_GITHUB_CLIENT_ID=XXXXXXX
GAUZY_GITHUB_CLIENT_SECRET=XXXXXXX
GAUZY_GITHUB_APP_NAME=
GAUZY_GITHUB_APP_ID=XXXXXXX
GAUZY_GITHUB_APP_PRIVATE_KEY=
GAUZY_GITHUB_WEBHOOK_URL=http://localhost:3000/api/auth/github/webhook
GAUZY_GITHUB_WEBHOOK_SECRET=XXXXXXX
```

### Zapier

```bash
GAUZY_ZAPIER_CLIENT_ID=XXXXXXXXX
GAUZY_ZAPIER_CLIENT_SECRET=XXXXXXX
GAUZY_ZAPIER_REDIRECT_URL=http://localhost:3000/api/integration/zapier/oauth/callback
GAUZY_ZAPIER_ALLOWED_DOMAINS=gauzy.co,*.gauzy.co,localhost
GAUZY_ZAPIER_MAX_AUTH_CODES=1000
```

### Make.com

```bash
GAUZY_MAKE_WEBHOOK_URL=
GAUZY_MAKE_CLIENT_ID=
GAUZY_MAKE_CLIENT_SECRET=
GAUZY_MAKE_REDIRECT_URL=${API_BASE_URL}/api/integration/make-com/oauth/callback
```

### ActivePieces

```bash
ACTIVEPIECES_BASE_URL=https://cloud.activepieces.com
GAUZY_ACTIVEPIECES_CLIENT_ID=
GAUZY_ACTIVEPIECES_CLIENT_SECRET=
GAUZY_ACTIVEPIECES_CALLBACK_URL=${API_BASE_URL}/api/integration/activepieces/callback
```

## Feature Toggles

Control which platform features are enabled:

```bash
# Core Features
FEATURE_DASHBOARD=true
FEATURE_TIME_TRACKING=true
FEATURE_REPORT=true

# Financial Features
FEATURE_ESTIMATE=true
FEATURE_INVOICE=true
FEATURE_INCOME=true
FEATURE_EXPENSE=true
FEATURE_PAYMENT=true

# HR Features
FEATURE_EMPLOYEES=true
FEATURE_EMPLOYEE_TIME_ACTIVITY=true
FEATURE_EMPLOYEE_TIMESHEETS=true
FEATURE_EMPLOYEE_TIMEOFF=true
FEATURE_EMPLOYEE_CANDIDATE=true
FEATURE_MANAGE_INVITE=true

# Project Features
FEATURE_DASHBOARD_TASK=true
FEATURE_TEAM_TASK=true
FEATURE_MY_TASK=true

# Organization Features
FEATURE_ORGANIZATION=true
FEATURE_ORGANIZATION_PROJECT=true
FEATURE_ORGANIZATION_TEAM=true
FEATURE_ORGANIZATION_INVENTORY=true

# CRM Features
FEATURE_CONTACT=true
FEATURE_PIPELINE=true
FEATURE_PIPELINE_DEAL=true

# Goals & Reports
FEATURE_GOAL=true
FEATURE_GOAL_REPORT=true

# Settings
FEATURE_ROLES_PERMISSION=true
FEATURE_IMPORT_EXPORT=true
FEATURE_EMAIL_TEMPLATE=true
FEATURE_FILE_STORAGE=true
FEATURE_SMTP=true

# Security
FEATURE_EMAIL_VERIFICATION=false
FEATURE_OPEN_STATS=false
```

## Localization

```bash
DEFAULT_CURRENCY=USD
DEFAULT_COUNTRY=US
DEFAULT_LATITUDE=
DEFAULT_LONGITUDE=
GOOGLE_MAPS_API_KEY=
GOOGLE_PLACE_AUTOCOMPLETE=false
I18N_FILES_URL=          # Custom i18n translation files URL
```

## Branding

```bash
PLATFORM_LOGO='assets/images/logos/logo_Gauzy.svg'
PLATFORM_PRIVACY_URL='https://gauzy.co/privacy'
PLATFORM_TOS_URL='https://gauzy.co/tos'
NO_INTERNET_LOGO='assets/images/logos/logo_Gauzy.svg'
COMPANY_NAME='Ever Co. LTD'
COMPANY_SITE_NAME='Gauzy'
COMPANY_SITE_LINK='https://gauzy.co'
```

## MCP Server

For configuration of the Model Context Protocol server, see the dedicated [MCP Server documentation](../mcp-server/mcp-overview).

```bash
MCP_SERVER_MODE="stdio"          # Options: stdio | http | websocket
MCP_TRANSPORT="stdio"           # Transport layer
MCP_HTTP_PORT=3001               # HTTP transport port
MCP_WS_PORT=3002                 # WebSocket transport port
MCP_AUTH_PORT=3003               # Auth server port
MCP_AUTH_ENABLED=false           # Enable OAuth 2.0
```

## Desktop Application Configuration

```bash
# Desktop Timer
DESKTOP_TIMER_APP_NAME='gauzy-desktop-timer'
DESKTOP_TIMER_APP_ID='com.ever.gauzydesktoptimer'

# Desktop App
DESKTOP_APP_NAME='gauzy-desktop'
DESKTOP_APP_ID='com.ever.gauzydesktop'

# Desktop Server
DESKTOP_SERVER_APP_NAME='gauzy-server'
DESKTOP_SERVER_APP_ID='com.ever.gauzyserver'
```

## Cloud Provider

```bash
CLOUD_PROVIDER=    # DO, AWS, AZURE, CIVO, CW, HEROKU, LINODE, LOCAL, OVH, SCALEWAY, VULTR
```
