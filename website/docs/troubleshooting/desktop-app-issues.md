---
sidebar_position: 10
---

# Desktop App Troubleshooting

Resolve common issues with the Ever Gauzy desktop applications.

## App Won't Start

### Windows

**Fix:**

1. Check if another instance is running (system tray)
2. Delete settings: `%APPDATA%/gauzy-desktop/`
3. Reinstall the application

### macOS

**Fix:**

1. Check **System Preferences** → **Security & Privacy** → **General** → Allow app
2. Clear app data: `~/Library/Application Support/gauzy-desktop/`
3. Reset: `rm -rf ~/Library/Application Support/gauzy-desktop/`

### Linux

**Fix:**

1. Check dependencies: `ldd` on the binary
2. Wayland issues: set `GDK_BACKEND=x11`
3. See [Wayland Support](../desktop/wayland-support)

## Can't Connect to Server

**Fixes:**

1. Verify **API Server URL** in settings
2. Check the API server is running
3. Verify network connectivity
4. Check SSL certificate validity

## Screenshots Not Working

**Fixes:**

1. Grant screen recording permission (macOS)
2. Check screenshot settings in org admin
3. Verify file storage provider is configured

## Auto-Updater Not Working

**Fixes:**

1. Check internet connectivity
2. Verify update server URL
3. macOS: ensure app is codesigned
4. See [Auto Updater](../desktop/auto-updater)

## High CPU Usage

**Fixes:**

1. Check screenshot interval (reduce if too frequent)
2. Disable activity tracking features not needed
3. Update to latest version

## Related Pages

- [Desktop Overview](../desktop/desktop-overview) — desktop app guide
- [Desktop Timer](../desktop/desktop-timer) — timer features
- [Desktop Builds](../desktop/desktop-builds) — building from source
