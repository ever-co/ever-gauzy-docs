---
sidebar_position: 8
---

# Tutorial: Desktop App Setup

Install and configure the Gauzy Desktop Timer application.

## Download

Download the latest release for your platform:

| Platform | Download                        |
| -------- | ------------------------------- |
| Windows  | `gauzy-desktop-timer-setup.exe` |
| macOS    | `gauzy-desktop-timer.dmg`       |
| Linux    | `gauzy-desktop-timer.AppImage`  |

Get the latest from [GitHub Releases](https://github.com/ever-co/ever-gauzy/releases).

## Installation

### Windows

1. Run the `.exe` installer
2. Follow the setup wizard
3. Launch from Start Menu

### macOS

1. Open the `.dmg` file
2. Drag to Applications folder
3. On first launch: **System Preferences** → **Security** → **Allow**
4. Grant Screen Recording permission if using screenshots

### Linux

1. Make AppImage executable: `chmod +x gauzy-desktop-timer.AppImage`
2. Run: `./gauzy-desktop-timer.AppImage`

## First Launch Configuration

1. **Server URL** — Enter your Gauzy API URL (e.g., `https://api.example.com`)
2. **Login** — Enter your email and password
3. **Settings** → Configure:
   - Screenshot interval (5-15 minutes)
   - Activity tracking (mouse/keyboard)
   - Auto-start on boot
   - Tray icon behavior

## Using the Timer

1. Select a project and task from dropdowns
2. Click **Start** to begin tracking
3. The app tracks:
   - Time duration
   - Screenshots (if enabled)
   - Activity levels
4. Click **Stop** to end the session

## Tray Icon

The desktop app minimizes to the system tray:

- **Green** — Timer running
- **Red** — Timer stopped
- Right-click for quick actions

## Related Pages

- [Desktop Overview](../desktop/desktop-overview) — full desktop guide
- [Desktop Troubleshooting](../troubleshooting/desktop-app-issues) — fix issues
