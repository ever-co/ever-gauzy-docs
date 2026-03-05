---
sidebar_position: 18
---

# Zapier Integration

Connect Gauzy with 5,000+ apps using Zapier automation.

## Overview

Zapier integration enables no-code automation between Gauzy and external services via webhooks.

## Setup

### Triggers (Gauzy → Zapier)

| Trigger             | Description                |
| ------------------- | -------------------------- |
| New Employee        | When an employee is added  |
| Timer Started       | When time tracking starts  |
| Timer Stopped       | When tracking stops        |
| New Invoice         | When an invoice is created |
| Task Created        | When a task is created     |
| Task Status Changed | When task status changes   |

### Actions (Zapier → Gauzy)

| Action         | Description         |
| -------------- | ------------------- |
| Create Task    | Create a new task   |
| Create Contact | Add a CRM contact   |
| Start Timer    | Start time tracking |
| Stop Timer     | Stop time tracking  |

## Webhook Configuration

Configure webhooks in Gauzy:

1. Navigate to **Integrations** → **Webhooks**
2. Add a new webhook URL from Zapier
3. Select events to trigger
4. Test the connection

## Example Zaps

| Zap                         | Description                |
| --------------------------- | -------------------------- |
| Slack → Gauzy Task          | Slack message creates task |
| Gauzy Invoice → Gmail       | Send email on new invoice  |
| GitHub Issue → Gauzy Task   | Sync issues as tasks       |
| Gauzy Timer → Google Sheets | Log time to spreadsheet    |

## Related Pages

- [Webhooks](./webhooks) — webhook configuration
- [Custom Integrations](./custom-integrations) — build integrations
