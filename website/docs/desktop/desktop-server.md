---
sidebar_position: 3
---

# Desktop Server

The Desktop Server bundles the Gauzy API inside an Electron application for self-hosted deployments.

## Purpose

Run the entire Gauzy backend locally without Docker or separate server infrastructure. Ideal for:

- Small teams wanting a local deployment
- Demo and evaluation purposes
- Air-gapped environments
- Development and testing

## Architecture

```
Desktop Server (Electron)
├── Main Process
│   ├── Embedded NestJS API Server
│   ├── SQLite/PostgreSQL Connection
│   ├── Tray Icon
│   └── Server Status Monitor
│
└── Renderer Process
    ├── Server Configuration UI
    ├── Database Settings
    ├── Port Configuration
    └── Log Viewer
```

## Features

- **Embedded API** — full NestJS API runs inside the Electron app
- **Database management** — configure SQLite or PostgreSQL connection
- **Port configuration** — set API server port
- **Auto-start** — start server on system boot
- **Log viewer** — view API logs in real-time
- **Status monitor** — server health and uptime

## Configuration

| Setting    | Default | Description       |
| ---------- | ------- | ----------------- |
| API Port   | 3000    | Server port       |
| Database   | SQLite  | Database type     |
| Auto-start | Off     | Start on boot     |
| Log level  | Info    | Logging verbosity |

## Usage

1. Download and install Desktop Server
2. Launch the application
3. Configure database connection
4. Click **Start Server**
5. Access the webapp at `http://localhost:4200`
6. Desktop Timer connects to `http://localhost:3000`

## Related Pages

- [Desktop Overview](./desktop-overview)
- [Deployment Overview](../deployment/deployment-overview)
- [Database Overview](../database/database-overview)
