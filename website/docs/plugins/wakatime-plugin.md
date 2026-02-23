---
sidebar_position: 3
---

# WakaTime Plugin

Integrate WakaTime developer metrics to track coding activity alongside Gauzy time logs.

## Overview

| Property    | Value                                        |
| ----------- | -------------------------------------------- |
| **Package** | `@ever-co/gauzy-plugin-integration-wakatime` |
| **Source**  | `packages/plugins/integration-wakatime`      |

## Features

- **Coding Metrics** — track time spent coding per language, project, and editor
- **Automatic Sync** — sync WakaTime data to Gauzy time logs
- **Activity Correlation** — compare coding activity with tracked time
- **Dashboard Widgets** — coding statistics in the Gauzy dashboard

## Configuration

```bash
# WakaTime Integration
WAKATIME_API_KEY=your-wakatime-api-key
```

## Data Mapping

| WakaTime        | Gauzy                 |
| --------------- | --------------------- |
| Heartbeats      | Activity timestamps   |
| Projects        | Organization Projects |
| Languages       | Time log metadata     |
| Editors         | Time log source       |
| Daily summaries | Time log entries      |

## Sync Flow

```
WakaTime API
  │
  ├── Fetch daily summaries
  ├── Map to Gauzy entities
  ├── Create/update time logs
  └── Update activity metrics
```

## Related Pages

- [Plugins Overview](./plugins-overview)
- [Time Tracking](../features/time-tracking)
