---
sidebar_position: 14
---

# Wakatime Integration

Import development time tracking data from Wakatime.

## Overview

[Wakatime](https://wakatime.com) automatically tracks coding time in editors/IDEs. The Gauzy integration imports this data to enrich time tracking.

## Setup

### 1. Get Wakatime API Key

1. Go to [wakatime.com/settings/api-key](https://wakatime.com/settings/api-key)
2. Copy your API key

### 2. Configure

```
GAUZY_WAKATIME_API_KEY=your-wakatime-api-key
```

### 3. Connect

1. Navigate to **Integrations** → **Wakatime**
2. Enter your Wakatime API key
3. Select sync options

## Synced Data

| Wakatime Data | Gauzy Entity | Description             |
| ------------- | ------------ | ----------------------- |
| Heartbeats    | Time Slot    | Coding activity periods |
| Projects      | Projects     | Project name matching   |
| Languages     | Activity     | Language breakdown      |
| Editors       | Activity     | Editor usage            |
| Duration      | Time Log     | Tracked duration        |

## Related Pages

- [Time Tracking](../features/time-tracking) — time tracking feature
- [Activity Tracking](../features/activity-tracking) — activity monitoring
