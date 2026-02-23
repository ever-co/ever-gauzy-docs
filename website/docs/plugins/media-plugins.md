---
sidebar_position: 8
---

# Media Capture Plugins

Screenshot, audio, and video capture plugins for desktop time tracking.

## CamShot (Screenshot Capture)

| Property    | Value                           |
| ----------- | ------------------------------- |
| **Package** | `@ever-co/gauzy-plugin-camshot` |
| **Source**  | `packages/plugins/camshot`      |

### Features

- **Periodic Screenshots** — capture at configurable intervals (1-10 minutes)
- **Multi-Monitor** — capture all connected displays
- **Privacy Controls** — blur sensitive areas, pause capture
- **Compression** — optimize screenshot size for storage
- **Wayland Support** — Linux Wayland protocol compatibility

### Configuration

```bash
# Screenshot Settings (Desktop Timer)
SCREENSHOTS_ENABLED=true
SCREENSHOT_INTERVAL=10       # minutes
SCREENSHOT_QUALITY=50        # JPEG quality (1-100)
```

### Capture Flow

```
Timer Running
  │
  ├── Interval Timer fires
  ├── Capture all screens (platform-specific)
  ├── Compress images
  ├── Calculate activity level
  └── Upload to API / store locally
```

---

## SoundShot (Audio Capture)

| Property    | Value                             |
| ----------- | --------------------------------- |
| **Package** | `@ever-co/gauzy-plugin-soundshot` |
| **Source**  | `packages/plugins/soundshot`      |

### Features

- **Ambient Audio** — capture short audio clips during work
- **Privacy-First** — configurable, opt-in only
- **Noise Detection** — verify active work environment

---

## Videos Plugin

| Property       | Value                          |
| -------------- | ------------------------------ |
| **Package**    | `@ever-co/gauzy-plugin-videos` |
| **Source**     | `packages/plugins/videos`      |
| **UI Package** | `packages/plugins/videos-ui`   |

### Features

- **Screen Recording** — record screen activity as video
- **Activity Proof** — video evidence of work performed
- **Playback** — review recordings in the dashboard
- **Storage** — configurable retention and compression

## Platform Support

| Feature     | Windows | macOS | Linux (X11) | Linux (Wayland) |
| ----------- | :-----: | :---: | :---------: | :-------------: |
| Screenshots |   ✅    |  ✅   |     ✅      |   ⚠️ Partial    |
| Audio       |   ✅    |  ✅   |     ✅      |       ✅        |
| Video       |   ✅    |  ✅   |     ✅      |   ⚠️ Partial    |

## Related Pages

- [Plugins Overview](./plugins-overview)
- [Desktop Timer](../desktop/desktop-timer) — screenshot-enabled timer
- [Wayland Support](../desktop/wayland-support) — Linux compatibility
