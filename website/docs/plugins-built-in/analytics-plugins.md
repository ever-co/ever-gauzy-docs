---
sidebar_position: 14
---

# Analytics Plugins

Product analytics integrations: Jitsu, PostHog, and Sentry.

## Jitsu Analytics Plugin

Integrates [Jitsu](https://jitsu.com/) for server-side event tracking.

### Configuration

| Variable                 | Description          |
| ------------------------ | -------------------- |
| `JITSU_SERVER_URL`       | Jitsu server URL     |
| `JITSU_SERVER_WRITE_KEY` | Write key for events |

### Events Tracked

- User signups and logins
- Feature usage events
- Error events

## PostHog Analytics Plugin

Integrates [PostHog](https://posthog.com/) for product analytics and feature flags.

### Configuration

| Variable          | Description             |
| ----------------- | ----------------------- |
| `POSTHOG_API_KEY` | PostHog project API key |
| `POSTHOG_HOST`    | PostHog instance URL    |

### Features

- Event tracking
- User identification
- Feature flag evaluation
- Session recordings (client-side)

## Sentry Tracing Plugin

Integrates [Sentry](https://sentry.io/) for error monitoring and performance tracing.

### Configuration

| Variable                          | Description             |
| --------------------------------- | ----------------------- |
| `SENTRY_DSN`                      | Sentry DSN              |
| `SENTRY_TRACES_SAMPLE_RATE`       | Trace sample rate (0-1) |
| `SENTRY_PROFILE_SAMPLE_RATE`      | Profile sample rate     |
| `SENTRY_HTTP_TRACING_ENABLED`     | Enable HTTP tracing     |
| `SENTRY_POSTGRES_TRACING_ENABLED` | Enable DB tracing       |

### Features

- Automatic error reporting
- Performance tracing (HTTP, database)
- Release tracking
- Source map integration

## Related Pages

- [Monitoring & Observability](../../devops/monitoring) — production monitoring
