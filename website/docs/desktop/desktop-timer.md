---
sidebar_position: 2
---

# Desktop Timer

The Desktop Timer is the primary time tracking application for employees.

## Features

- **One-click timer** — start/stop tracking with project + task
- **Screenshot capture** — periodic screenshots at configurable intervals
- **Activity monitoring** — keyboard/mouse activity percentage
- **Idle detection** — pauses tracking and prompts on idle
- **System tray** — background operation with tray icon
- **Offline mode** — tracks time offline, syncs when connected
- **Multi-monitor** — captures screenshots from all monitors
- **Auto-start** — optional launch on system startup

## Timer Flow

```
1. Employee logs in
2. Selects organization, project, and task
3. Clicks "Start" → timer begins
4. Every 10 minutes:
   - Screenshot captured
   - Activity level calculated
   - Time slot created and synced
5. Employee clicks "Stop" → time log finalized
```

## Configuration

### From API Server

Settings pushed from server configuration:

| Setting              | Description              |
| -------------------- | ------------------------ |
| Screenshot interval  | Minutes between captures |
| Random screenshot    | Randomize timing         |
| Track on sleep       | Track during idle        |
| Allow manual time    | Permit manual entries    |
| Allow screen capture | Enable screenshots       |

### Local Settings

| Setting               | Default | Description                 |
| --------------------- | ------- | --------------------------- |
| Auto-start            | Off     | Launch on OS boot           |
| Minimize to tray      | On      | Minimize to system tray     |
| Desktop notifications | On      | Show tracking notifications |
| Monitor selection     | All     | Which monitors to capture   |

## Screenshots

### Capture Process

1. Timer triggers at configured interval
2. Screenshot captured from selected monitors
3. Thumbnail generated for quick preview
4. Full image uploaded to configured storage
5. Associated with current time slot

### Storage

Screenshots follow the platform's file storage configuration (`FILE_PROVIDER`):

- Local filesystem
- AWS S3
- Wasabi
- DigitalOcean Spaces
- Cloudinary

## Idle Detection

1. System monitors keyboard/mouse input
2. After configurable idle threshold → prompt appears
3. Employee chooses:
   - **Keep** — idle time counted
   - **Remove** — idle period deleted
   - **Resume** — tracking continues from current time

## Related Pages

- [Desktop Overview](./desktop-overview)
- [Time Tracking](../features/time-tracking) — feature details
- [Activity Tracking](../features/activity-tracking) — screenshots + activity
