---
sidebar_position: 6
---

# Desktop Builds

Building desktop applications for Windows, macOS, and Linux.

## Build Tools

| Tool                 | Purpose                      |
| -------------------- | ---------------------------- |
| **NX**               | Task orchestration and build |
| **electron-builder** | Packaging and distribution   |
| **Angular CLI**      | Frontend build               |
| **TypeScript**       | Compilation                  |

## Build Process

```
1. TypeScript Compilation (core packages)
2. Angular Build (desktop UI)
3. NestJS Build (embedded API, for server apps)
4. Electron Build (packaging)
5. Code Signing (platform-specific)
6. Publishing (GitHub Releases)
```

## Build Commands

### Desktop Timer

```bash
# Development
yarn start:desktop-timer

# Production build
yarn build:desktop-timer

# Package for distribution
yarn package:desktop-timer
```

### Desktop Server

```bash
# Development
yarn start:server

# Production build
yarn build:server

# Package for distribution
yarn package:server
```

## Output Formats

| Platform | Format         | Extension   |
| -------- | -------------- | ----------- |
| Windows  | NSIS installer | `.exe`      |
| Windows  | Portable       | `.exe`      |
| macOS    | DMG            | `.dmg`      |
| macOS    | pkg            | `.pkg`      |
| Linux    | AppImage       | `.AppImage` |
| Linux    | DEB            | `.deb`      |
| Linux    | RPM            | `.rpm`      |

## electron-builder Configuration

```yaml
# electron-builder.yml
appId: com.ever.gauzy.desktop.timer
productName: Gauzy Desktop Timer

directories:
  output: dist/packages/desktop-timer

files:
  - dist/**/*
  - node_modules/**/*
  - package.json

win:
  target:
    - nsis
    - portable
  icon: assets/icons/icon.ico

mac:
  target:
    - dmg
    - pkg
  icon: assets/icons/icon.icns
  hardenedRuntime: true
  entitlements: build/entitlements.mac.plist

linux:
  target:
    - AppImage
    - deb
  icon: assets/icons
  category: Office
```

## Code Signing

### Windows

Requires an Authenticode certificate:

```bash
CSC_LINK=path/to/certificate.pfx
CSC_KEY_PASSWORD=certificate-password
```

### macOS

Requires Apple Developer ID and notarization:

```bash
CSC_LINK=path/to/certificate.p12
CSC_KEY_PASSWORD=certificate-password
APPLE_ID=your-apple-id@example.com
APPLE_ID_APP_PASSWORD=app-specific-password
APPLE_TEAM_ID=your-team-id
```

## Related Pages

- [Desktop Overview](./desktop-overview)
- [Auto-Updater](./auto-updater) — update distribution
- [GitHub Actions](../deployment/github-actions) — CI builds
