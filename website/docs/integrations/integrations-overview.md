---
sidebar_position: 1
---

# Integrations Overview

Ever Gauzy integrates with third-party services for project management, source control, time tracking, freelance work, automation, and AI.

## Available Integrations

### Source control and issue trackers

| Integration | What it connects                    | Sync Direction | Guide                                                  |
| ----------- | ----------------------------------- | :------------: | ------------------------------------------------------ |
| **GitHub**  | Issues, pull requests, repositories | Bi-directional | [GitHub Integration](/integrations/github-integration) |
| **Jira**    | Issues                              | Bi-directional | [Jira Integration](/integrations/jira-integration)     |

### Time tracking and freelance marketplaces

| Integration  | What it connects                 | Sync Direction | Guide                                                      |
| ------------ | -------------------------------- | :------------: | ---------------------------------------------------------- |
| **Upwork**   | Contracts, hours                 |     Import     | [Upwork Integration](/integrations/upwork-integration)     |
| **HubStaff** | Activity, time logs, screenshots |     Import     | [HubStaff Integration](/integrations/hubstaff-integration) |
| **Wakatime** | Coding activity                  |     Import     | [Wakatime Integration](/integrations/wakatime-integration) |

### Automation and AI

| Integration      | What it connects                        |   Sync Direction   | Guide                                                          |
| ---------------- | --------------------------------------- | :----------------: | -------------------------------------------------------------- |
| **Zapier**       | Gauzy events to thousands of apps       |   Bi-directional   | [Zapier Integration](/integrations/zapier-integration)         |
| **Activepieces** | Open-source automation, MCP servers     |   Bi-directional   | [Activepieces Integration](/integrations/activepieces)         |
| **Ever Works**   | AI agents and work                      |   Bi-directional   | [Ever Works Integration](/integrations/ever-works-integration) |
| **Gauzy AI**     | Job matching, skill analysis, analytics | Gauzy ↔ AI service | [Gauzy AI Integration](/integrations/gauzy-ai-integration)     |

### Payments and email

Guides for invoice payments and transactional email are available. They have not yet been checked against the product's source, so confirm provider support in your instance before relying on them.

- [Payment Gateway Integration](/integrations/payment-gateway-integration)
- [Email Integration](/integrations/email-integration)

## Which integration do I need?

| I want to…                                           | Start with                                                                                                                         |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Keep tasks in step with a code host or issue tracker | [GitHub](/integrations/github-integration) or [Jira](/integrations/jira-integration)                                               |
| Bring freelance or tracked hours into timesheets     | [Upwork](/integrations/upwork-integration) or [HubStaff](/integrations/hubstaff-integration)                                       |
| Push Gauzy events into another tool                  | [Zapier](/integrations/zapier-integration) or [Activepieces](/integrations/activepieces)                                           |
| Connect a system that none of the guides cover       | [Custom Integrations](/integrations/custom-integrations), [Webhooks](/integrations/webhooks) and the [REST API](/api/rest-api)    |

## Integration Architecture

```
External Service
     │
     ├── Webhooks ──→ Integration Handler ──→ Create/Update Entities
     │
     └── API Polling ──→ Sync Service ──→ Create/Update Entities
```

## Entity Synchronization

Integrations map external entities to Gauzy entities:

| External          | Gauzy Entity  | Mapping                    |
| ----------------- | ------------- | -------------------------- |
| GitHub Issue      | Task          | title, description, status |
| GitHub PR         | Task (linked) | PR reference               |
| Upwork Contract   | Employee      | billing, hours             |
| HubStaff Activity | TimeLog       | duration, screenshots      |
| Jira Issue        | Task          | title, priority, status    |

## Integration Settings

Each integration stores:

| Field            | Description                   |
| ---------------- | ----------------------------- |
| `name`           | Integration name              |
| `entitySettings` | Which entities to sync        |
| `settingsMap`    | Configuration key-value pairs |
| `lastSyncedAt`   | Last sync timestamp           |
| `isActive`       | Active/disabled status        |

## Configuration

```bash
# GitHub
GAUZY_GITHUB_APP_ID=your-github-app-id
GAUZY_GITHUB_APP_NAME=your-github-app-name
GAUZY_GITHUB_APP_PRIVATE_KEY=base64-encoded-key
GAUZY_GITHUB_WEBHOOK_SECRET=webhook-secret
GAUZY_GITHUB_CALLBACK_URL=https://api.yourdomain.com/api/integration/github/callback

# Upwork
UPWORK_API_KEY=your-upwork-key
UPWORK_API_SECRET=your-upwork-secret
UPWORK_REDIRECT_URL=https://api.yourdomain.com/api/integration/upwork/callback

# HubStaff
HUBSTAFF_CLIENT_ID=your-hubstaff-id
HUBSTAFF_CLIENT_SECRET=your-hubstaff-secret
HUBSTAFF_REDIRECT_URL=https://api.yourdomain.com/api/integration/hubstaff/callback

# Jira
JIRA_URL=https://your-domain.atlassian.net
JIRA_API_TOKEN=your-jira-api-token
JIRA_USER_EMAIL=your-jira-email

# Activepieces
ACTIVEPIECES_BASE_URL=https://cloud.activepieces.com
GAUZY_ACTIVEPIECES_API_URL=https://api.activepieces.com/v1
GAUZY_ACTIVEPIECES_API_KEY=your-activepieces-api-key
```

See each integration's guide for its own settings.

## Related Pages

- [GitHub Integration](/integrations/github-integration)
- [Upwork Integration](/integrations/upwork-integration)
- [HubStaff Integration](/integrations/hubstaff-integration)
- [Jira Integration](/integrations/jira-integration)
- [Webhooks](/integrations/webhooks) — outgoing events
- [Custom Integrations](/integrations/custom-integrations) — build your own
- [Activepieces Integration](/integrations/activepieces) — open-source automation
- [Activepieces Plugin](/plugins-built-in/activepieces-plugin) — plugin reference
- [Zapier Plugin](/plugins-built-in/zapier-plugin) — plugin reference
- [Integration Endpoints](/api/integration-endpoints) — API reference
