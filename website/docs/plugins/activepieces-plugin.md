---
sidebar_position: 6
---

# Activepieces Plugin

Open-source automation alternative to Zapier and Make for self-hosted workflows.

## Overview

| Property       | Value                                            |
| -------------- | ------------------------------------------------ |
| **Package**    | `@ever-co/gauzy-plugin-integration-activepieces` |
| **Source**     | `packages/plugins/integration-activepieces`      |
| **UI Package** | `packages/plugins/integration-activepieces-ui`   |

## Why Activepieces?

| Feature        | Activepieces | Zapier  |  Make   |
| -------------- | :----------: | :-----: | :-----: |
| Open Source    |      ✅      |   ❌    |   ❌    |
| Self-Hosted    |      ✅      |   ❌    |   ❌    |
| Free Tier      |  Unlimited   | Limited | Limited |
| Visual Builder |      ✅      |   ✅    |   ✅    |
| Custom Pieces  |      ✅      |   ✅    |   ✅    |

## Features

- **Self-Hosted Automation** — run workflows on your own infrastructure
- **Data Privacy** — no data leaves your servers
- **Unlimited Flows** — no per-flow pricing
- **Custom Pieces** — build Gauzy-specific automation blocks
- **Webhooks** — trigger flows from Gauzy events

## Configuration

```bash
# Activepieces Integration
ACTIVEPIECES_API_URL=http://localhost:8080
ACTIVEPIECES_API_KEY=your-api-key
```

## Supported Pieces

### Triggers

- Employee created/updated
- Time log recorded
- Task status changed
- Invoice generated

### Actions

- Create/update employee
- Log time entry
- Create/update task
- Generate invoice
- Send notification

## Related Pages

- [Plugins Overview](./plugins-overview)
- [Zapier Plugin](./zapier-plugin)
- [Make Plugin](./make-plugin)
