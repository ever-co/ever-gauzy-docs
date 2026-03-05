---
sidebar_position: 24
---

# Electron IPC Communication

Inter-process communication between Electron main and renderer processes.

## Overview

The Gauzy desktop app uses Electron's IPC (Inter-Process Communication) for:

- Timer controls from renderer → main
- Screenshot capture from main → renderer
- Activity data collection
- Settings synchronization

## Architecture

```mermaid
graph TB
    subgraph Renderer Process
        UI[Angular UI]
    end

    subgraph Main Process
        IPC[IPC Handlers]
        Timer[Timer Service]
        Screenshot[Screenshot Service]
        DB[Local Database]
    end

    UI -->|ipcRenderer.send| IPC
    IPC -->|ipcMain.handle| Timer
    IPC --> Screenshot
    IPC --> DB
    Timer -->|BrowserWindow.send| UI
```

## Common IPC Channels

| Channel            | Direction       | Description         |
| ------------------ | --------------- | ------------------- |
| `timer:start`      | Renderer → Main | Start timer         |
| `timer:stop`       | Renderer → Main | Stop timer          |
| `timer:status`     | Main → Renderer | Timer state update  |
| `screenshot:taken` | Main → Renderer | Screenshot captured |
| `settings:update`  | Both            | Settings changed    |
| `app:minimize`     | Renderer → Main | Minimize to tray    |

## Renderer → Main

```typescript
// In Angular component/service
const { ipcRenderer } = window.require("electron");

ipcRenderer.send("timer:start", {
  projectId: "uuid",
  taskId: "uuid",
});

ipcRenderer.on("timer:status", (event, data) => {
  // Update UI with timer state
});
```

## Main → Renderer

```typescript
// In Electron main process
ipcMain.on("timer:start", (event, data) => {
  timerService.start(data);
  // Send status back
  mainWindow.webContents.send("timer:status", { running: true });
});
```

## Related Pages

- [Desktop Overview](./desktop-overview) — desktop guide
- [Desktop Server Mode](./desktop-server-mode) — embedded server
