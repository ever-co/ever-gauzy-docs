---
sidebar_position: 7
---

# Analytics Plugins

Product analytics and event tracking integrations with Jitsu and PostHog.

## Jitsu Analytics

| Property    | Value                                   |
| ----------- | --------------------------------------- |
| **Package** | `@ever-co/gauzy-plugin-jitsu-analytics` |
| **Source**  | `packages/plugins/jitsu-analytics`      |

### Features

- **Server-Side Analytics** — track API events without client overhead
- **Event Streaming** — real-time event pipeline
- **Data Warehouse** — send data to BigQuery, Snowflake, ClickHouse
- **Privacy-First** — GDPR-compliant, self-hosted option

### Configuration

```bash
# Jitsu Analytics
JITSU_BROWSER_URL=https://jitsu.yourdomain.com
JITSU_BROWSER_WRITE_KEY=your-browser-key
JITSU_SERVER_URL=https://jitsu.yourdomain.com
JITSU_SERVER_WRITE_KEY=your-server-key
```

### Tracked Events

| Event            | Description           |
| ---------------- | --------------------- |
| `user.login`     | User authentication   |
| `user.register`  | New user registration |
| `timer.start`    | Timer started         |
| `timer.stop`     | Timer stopped         |
| `invoice.create` | Invoice generated     |
| `task.update`    | Task status changed   |

---

## PostHog Analytics

| Property       | Value                           |
| -------------- | ------------------------------- |
| **Package**    | `@ever-co/gauzy-plugin-posthog` |
| **Source**     | `packages/plugins/posthog`      |
| **UI Package** | `packages/plugins/posthog-ui`   |

### Features

- **Product Analytics** — funnels, retention, paths
- **Session Recording** — replay user sessions
- **Feature Flags** — A/B testing and rollouts
- **Self-Hosted** — full data ownership

### Configuration

```bash
# PostHog Analytics
POSTHOG_API_KEY=phc_your-api-key
POSTHOG_HOST=https://app.posthog.com   # or self-hosted URL
```

### Tracked Events

PostHog auto-captures page views and clicks. Custom events include:

| Event                | Properties                        |
| -------------------- | --------------------------------- |
| `time_logged`        | `duration`, `projectId`, `source` |
| `invoice_sent`       | `amount`, `clientId`              |
| `employee_onboarded` | `roleId`, `departmentId`          |

## Related Pages

- [Plugins Overview](./plugins-overview)
- [Monitoring](../performance/monitoring) — Sentry error tracking
