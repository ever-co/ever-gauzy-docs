---
sidebar_position: 5
---

# Make (Integromat) Plugin

Connect Ever Gauzy with Make (formerly Integromat) for visual workflow automation.

## Overview

| Property       | Value                                        |
| -------------- | -------------------------------------------- |
| **Package**    | `@ever-co/gauzy-plugin-integration-make-com` |
| **Source**     | `packages/plugins/integration-make-com`      |
| **UI Package** | `packages/plugins/integration-make-com-ui`   |

## Features

- **Visual Scenario Builder** — design workflows visually in Make
- **Real-Time Processing** — instant data flow between apps
- **Error Handling** — built-in retry and error routing
- **Data Transformation** — map and transform data between services

## Supported Modules

### Triggers

| Module          | Description                  |
| --------------- | ---------------------------- |
| Watch Employees | Detect new/updated employees |
| Watch Time Logs | Detect new time entries      |
| Watch Tasks     | Detect task changes          |
| Watch Invoices  | Detect new invoices          |

### Actions

| Module             | Description           |
| ------------------ | --------------------- |
| Create Employee    | Add employee to Gauzy |
| Create Time Log    | Log time entry        |
| Create/Update Task | Manage tasks          |
| Create Invoice     | Generate invoice      |
| Search Records     | Query Gauzy data      |

## Configuration

```bash
# Make.com Integration
MAKE_API_KEY=your-make-api-key
MAKE_WEBHOOK_URL=https://hook.make.com/...
```

## Example Scenario

**"Sync new Gauzy invoices to QuickBooks and notify via email"**

```
[Gauzy: Watch Invoices] → [QuickBooks: Create Invoice] → [Email: Send Notification]
```

## Related Pages

- [Plugins Overview](./plugins-overview)
- [Zapier Plugin](./zapier-plugin) — alternative automation
- [Activepieces Plugin](./activepieces-plugin) — open-source alternative
