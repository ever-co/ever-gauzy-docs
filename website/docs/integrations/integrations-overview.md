---
sidebar_position: 1
---

# Integrations Overview

Ever Gauzy integrates with popular third-party services for project management, source control, time tracking, freelance work, communication, payments, and identity.

## Available Integrations

### Source control and issue trackers

| Integration | What it connects                          |      Sync Direction       | Guide                                          |
| ----------- | ----------------------------------------- | :-----------------------: | ---------------------------------------------- |
| **GitHub**  | Issues, pull requests, repositories       |      Bi-directional       | [GitHub Integration](/integrations/github-integration) |
| **GitLab**  | Projects, issues, commits, merge requests | Issues bi-directional; the rest GitLab → Gauzy | [GitLab Integration](/integrations/gitlab-integration) |
| **Jira**    | Issues                                    |      Bi-directional       | [Jira Integration](/integrations/jira-integration) |

### Time tracking and freelance marketplaces

| Integration  | What it connects                  | Sync Direction | Guide                                              |
| ------------ | --------------------------------- | :------------: | -------------------------------------------------- |
| **Upwork**   | Contracts, hours                  |     Import     | [Upwork Integration](/integrations/upwork-integration) |
| **HubStaff** | Activity, time logs, screenshots  |     Import     | [HubStaff Integration](/integrations/hubstaff-integration) |
| **Wakatime** | Coding activity                   |     Import     | [Wakatime Integration](/integrations/wakatime-integration) |

### Communication and calendar

| Integration         | What it connects                         |        Sync Direction         | Guide                                                  |
| ------------------- | ---------------------------------------- | :---------------------------: | ------------------------------------------------------ |
| **Slack**           | Timer, task and timesheet notifications  |   Notifications to Slack      | [Slack Integration](/integrations/slack-integration) |
| **Microsoft Teams** | Team activity and task notifications     |   Notifications to Teams      | [Microsoft Teams Integration](/integrations/teams-integration) |
| **Google Calendar** | Appointments, busy times, event types    | Mostly Google → Gauzy         | [Google Calendar Integration](/integrations/google-calendar-integration) |
| **Email**           | Notifications, invitations (SMTP, SendGrid, Mailgun) | Outbound          | [Email Integration](/integrations/email-integration) |

### Payments

| Integration         | What it connects                       | Guide                                                              |
| ------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| **Stripe, PayPal, RazorPay** | Online invoice payments       | [Payment Gateway Integration](/integrations/payment-gateway-integration) |

### Automation, AI, and your own systems

| Integration      | What it connects                       | Sync Direction | Guide                                                  |
| ---------------- | -------------------------------------- | :------------: | ------------------------------------------------------ |
| **Zapier**       | Gauzy events to thousands of apps      | Bi-directional | [Zapier Integration](/integrations/zapier-integration) |
| **Activepieces** | Open-source automation, MCP servers    | Bi-directional | [Activepieces Integration](/integrations/activepieces) |
| **Ever Works**   | AI agents and work                     | Bi-directional | [Ever Works Integration](/integrations/ever-works-integration) |
| **Gauzy AI**     | Job matching, skill analysis, analytics | Gauzy ↔ AI service | [Gauzy AI Integration](/integrations/gauzy-ai-integration) |
| **Webhooks**     | Outgoing event notifications           |    Outbound    | [Webhooks](/integrations/webhooks)                     |
| **Custom**       | Your own plugin-based integration      |      Yours     | [Custom Integrations](/integrations/custom-integrations) |

### Sign-in and directory services

| Integration      | What it connects                                 | Guide                                                  |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------ |
| **SSO / SAML**   | SAML 2.0 identity providers (and OAuth2 social providers) | [SSO / SAML Integration](/integrations/sso-saml-integration) |
| **LDAP / Active Directory** | Directory authentication and user provisioning | [LDAP Integration](/integrations/ldap-integration) |

## Which integration do I need?

| I want to…                                                  | Start with                                                                 |
| ----------------------------------------------------------- | -------------------------------------------------------------------------- |
| Keep tasks in step with a code host or issue tracker        | [GitHub](/integrations/github-integration), [GitLab](/integrations/gitlab-integration) or [Jira](/integrations/jira-integration) |
| Bring freelance or tracked hours into timesheets            | [Upwork](/integrations/upwork-integration) or [HubStaff](/integrations/hubstaff-integration) |
| Post timer and approval events to a chat channel            | [Slack](/integrations/slack-integration) or [Microsoft Teams](/integrations/teams-integration) |
| Let clients pay invoices online                             | [Payment Gateway](/integrations/payment-gateway-integration)               |
| Push Gauzy events into a tool that has no dedicated guide   | [Zapier](/integrations/zapier-integration), [Activepieces](/integrations/activepieces) or [Webhooks](/integrations/webhooks) |
| Sign users in with a corporate identity                     | [SSO / SAML](/integrations/sso-saml-integration) or [LDAP](/integrations/ldap-integration) |
| Connect a system that none of the guides cover              | [Custom Integrations](/integrations/custom-integrations) and the [REST API](/api/rest-api) |

:::note
This section has no dedicated guide for accounting packages. To move invoice or payment events into accounting software today, use a webhook, an automation tool (Zapier or Activepieces), or the [REST API](/api/rest-api).
:::

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
| GitLab Issue      | Task          | see [GitLab guide](/integrations/gitlab-integration#synced-data) |
| GitLab Commit     | Activity      | see [GitLab guide](/integrations/gitlab-integration#synced-data) |
| Google Calendar Event | Employee Appointment | see [Google Calendar guide](/integrations/google-calendar-integration#synced-data) |

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

# GitLab
GAUZY_GITLAB_CLIENT_ID=your-app-id
GAUZY_GITLAB_CLIENT_SECRET=your-app-secret
GAUZY_GITLAB_CALLBACK_URL=https://api.yourdomain.com/api/integration/gitlab/callback

# Slack
GAUZY_SLACK_CLIENT_ID=your-client-id
GAUZY_SLACK_CLIENT_SECRET=your-client-secret
GAUZY_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# Microsoft Teams
GAUZY_TEAMS_CLIENT_ID=your-azure-app-id
GAUZY_TEAMS_CLIENT_SECRET=your-secret
GAUZY_TEAMS_TENANT_ID=your-azure-tenant-id

# Google Calendar
GOOGLE_CALENDAR_CLIENT_ID=your-client-id
GOOGLE_CALENDAR_CLIENT_SECRET=your-client-secret
GOOGLE_CALENDAR_CALLBACK_URL=https://api.yourdomain.com/api/integration/google-calendar/callback

# Wakatime
GAUZY_WAKATIME_API_KEY=your-wakatime-api-key
```

The variables for the remaining integrations (Gauzy AI, email, payment gateways, SAML, LDAP, Ever Works) are listed on their own pages, linked above. Each guide is the source of truth for its variables.

## Related Pages

- [GitHub Integration](/integrations/github-integration)
- [GitLab Integration](/integrations/gitlab-integration)
- [Upwork Integration](/integrations/upwork-integration)
- [HubStaff Integration](/integrations/hubstaff-integration)
- [Jira Integration](/integrations/jira-integration)
- [Webhooks](/integrations/webhooks) — outgoing events
- [Custom Integrations](/integrations/custom-integrations) — build your own
- [Activepieces Integration](/integrations/activepieces) — open-source automation
- [Activepieces Plugin](/plugins-built-in/activepieces-plugin) — plugin reference
- [Zapier Plugin](/plugins-built-in/zapier-plugin) — plugin reference
- [Integration Endpoints](/api/integration-endpoints) — API reference
