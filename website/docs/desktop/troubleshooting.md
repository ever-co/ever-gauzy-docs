---
sidebar_position: 8
---

# Desktop Troubleshooting

Common issues and solutions for Gauzy desktop applications.

## Connection Issues

### Cannot connect to API

**Symptoms:** "Connection failed" or timeout errors.

**Solutions:**

1. Verify API URL in settings matches your server
2. Check if the API server is running (`/api/health`)
3. Check firewall rules for the API port
4. Ensure SSL certificates are valid (HTTPS)

### Offline mode not syncing

**Solutions:**

1. Check internet connectivity
2. Verify API URL is reachable
3. Restart the application
4. Check logs for sync errors

## Screenshot Issues

### Screenshots not capturing

**Solutions:**

1. Check employee settings: `isScreenshotEnabled: true`
2. Verify organization allows screenshots
3. On Linux/Wayland: install PipeWire and portal (see [Wayland Support](./wayland-support))
4. On macOS: grant Screen Recording permission in System Preferences → Privacy

### Screenshots are black or blank

**Solutions:**

1. Update graphics drivers
2. Disable hardware acceleration: `--disable-gpu`
3. Check multi-monitor configuration

## Installation Issues

### Windows: App blocked by SmartScreen

The app may not be signed or the certificate is not yet trusted.

**Solution:** Click "More info" → "Run anyway" (use official signed builds for production)

### macOS: "App is damaged" or cannot be opened

**Solutions:**

```bash
# Remove quarantine attribute
xattr -cr /Applications/Gauzy\ Desktop\ Timer.app

# Or allow in System Preferences → Security & Privacy
```

### Linux: AppImage won't start

**Solutions:**

```bash
# Make executable
chmod +x GauzyDesktopTimer.AppImage

# Install FUSE (required for AppImage)
sudo apt install libfuse2
```

## Performance Issues

### High memory usage

**Solutions:**

1. Reduce screenshot frequency
2. Close unnecessary windows
3. Update to latest version
4. Check for memory leaks in developer tools (`Ctrl+Shift+I`)

### High CPU usage

**Solutions:**

1. Disable activity tracking if not needed
2. Reduce screenshot resolution
3. Update Electron to latest version

## Logging

### View logs

| Platform | Log Location                          |
| -------- | ------------------------------------- |
| Windows  | `%APPDATA%\gauzy-desktop-timer\logs\` |
| macOS    | `~/Library/Logs/gauzy-desktop-timer/` |
| Linux    | `~/.config/gauzy-desktop-timer/logs/` |

### Enable debug logging

```bash
# Start with debug logging
DEBUG=* ./GauzyDesktopTimer
```

## Related Pages

- [Desktop Overview](./desktop-overview)
- [Wayland Support](./wayland-support) — Linux Wayland issues
- [Desktop Timer](./desktop-timer) — timer features
