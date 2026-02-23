---
sidebar_position: 7
---

# Wayland Support

Notes on running Gauzy desktop applications on Linux with the Wayland display server.

## Status

| Feature            | X11 |         Wayland         |
| ------------------ | :-: | :---------------------: |
| Application window | ✅  |           ✅            |
| System tray        | ✅  |       ⚠️ Partial        |
| Screenshots        | ✅  | ⚠️ Requires permissions |
| Global shortcuts   | ✅  |       ❌ Limited        |

## Screenshot Capture on Wayland

Wayland's security model restricts screen capture. The Desktop Timer may require:

1. **PipeWire** — modern screen capture API
2. **xdg-desktop-portal** — portal-based screen sharing
3. **XWayland fallback** — running under X11 compatibility

### Enabling PipeWire Screenshots

```bash
# Install PipeWire and portal
sudo apt install pipewire xdg-desktop-portal-gtk

# Run Electron with Wayland flags
electron --ozone-platform=wayland --enable-features=WaylandWindowDecorations
```

## System Tray

Some Wayland compositors have limited tray support:

| Compositor     | Tray Support  |
| -------------- | :-----------: |
| GNOME (Mutter) | Via extension |
| KDE Plasma     |   ✅ Native   |
| Sway           | ✅ Via waybar |
| Hyprland       | ✅ Via waybar |

## Launch Flags

For best Wayland compatibility:

```bash
# Force Wayland
GDK_BACKEND=wayland ./GauzyDesktopTimer.AppImage

# Force X11 fallback
GDK_BACKEND=x11 ./GauzyDesktopTimer.AppImage
```

## Related Pages

- [Desktop Overview](./desktop-overview)
- [Troubleshooting](./troubleshooting) — common issues
