---
sidebar_position: 1
---

# Desktop Apps Overview

Ever Gauzy provides cross-platform desktop applications built with Electron for time tracking, screenshot capture, and local server hosting.

## Applications

| App                | Purpose                                 | Platforms       |
| ------------------ | --------------------------------------- | --------------- |
| **Desktop Timer**  | Employee time tracking with screenshots | Win, Mac, Linux |
| **Desktop App**    | Full Gauzy desktop experience           | Win, Mac, Linux |
| **Desktop Server** | Self-hosted API server                  | Win, Mac, Linux |

## Architecture

```
Electron Application
├── Main Process (Node.js)
│   ├── Tray Icon & Menu
│   ├── IPC Communication
│   ├── Screenshot Capture
│   ├── Activity Tracking
│   └── Embedded API Server (optional)
│
├── Renderer Process (Angular)
│   ├── Timer UI
│   ├── Settings Panel
│   ├── Time Log View
│   └── Project/Task Selector
│
└── Preload Scripts
    └── Secure IPC Bridge
```

## Technology Stack

| Layer     | Technology                              |
| --------- | --------------------------------------- |
| Shell     | Electron 30+                            |
| UI        | Angular 17+                             |
| Backend   | NestJS (embedded)                       |
| Build     | electron-builder                        |
| Updates   | electron-updater                        |
| Packaging | NSIS (Win), DMG (Mac), AppImage (Linux) |

## Source Locations

```
apps/
├── desktop-timer/          # Desktop Timer app
├── desktop/                # Desktop App
├── server/                 # Desktop Server
└── extensions/             # Browser extensions

packages/
├── desktop-libs/           # Shared desktop libraries
├── desktop-ui-lib/         # Desktop Angular UI components
└── desktop-window/         # Window management
```

## Related Pages

- [Desktop Timer](./desktop-timer) — employee timer
- [Desktop Server](./desktop-server) — self-hosted server
- [Browser Extension](./browser-extension) — browser tracking
- [Auto-Update](./auto-updater) — update mechanism
- [Desktop Builds](./desktop-builds) — build process
