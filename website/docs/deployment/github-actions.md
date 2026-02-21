---
sidebar_position: 10
---

# GitHub Actions

GitHub Actions workflows for building desktop applications, Docker images, and releases.

## Workflow Files

Located in `.github/workflows/`:

| Workflow               | Purpose                             |
| ---------------------- | ----------------------------------- |
| `desktop-timer-*.yml`  | Build Desktop Timer (Win/Mac/Linux) |
| `desktop-app-*.yml`    | Build Desktop App (Win/Mac/Linux)   |
| `desktop-server-*.yml` | Build Desktop Server                |
| `docker-build-*.yml`   | Build and push Docker images        |
| `release-*.yml`        | Create GitHub releases              |

## Desktop Build Pipeline

```
Trigger (push/tag/manual)
     │
     ├── Setup Environment
     │   ├── Checkout code
     │   ├── Install Node.js
     │   └── Install dependencies (yarn)
     │
     ├── Build
     │   ├── NX build (API + Desktop assets)
     │   ├── Electron build
     │   └── Code signing (macOS/Windows)
     │
     └── Publish
         ├── Upload artifacts
         ├── Create GitHub Release
         └── Upload to release assets
```

## Platform-Specific Builds

### Windows

```yaml
- name: Build Windows
  run: yarn electron:build:windows
  env:
    CSC_LINK: ${{ secrets.WIN_CSC_LINK }}
    CSC_KEY_PASSWORD: ${{ secrets.WIN_CSC_KEY_PASSWORD }}
```

### macOS

```yaml
- name: Build macOS
  run: yarn electron:build:mac
  env:
    CSC_LINK: ${{ secrets.MAC_CSC_LINK }}
    CSC_KEY_PASSWORD: ${{ secrets.MAC_CSC_KEY_PASSWORD }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_ID_APP_PASSWORD: ${{ secrets.APPLE_ID_APP_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
```

### Linux

```yaml
- name: Build Linux
  run: yarn electron:build:linux
```

## Docker Image Workflows

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    file: .deploy/api/Dockerfile
    push: true
    tags: ghcr.io/ever-co/gauzy-api:latest
```

## Secrets Required

| Secret                  | Purpose                          |
| ----------------------- | -------------------------------- |
| `WIN_CSC_LINK`          | Windows code signing certificate |
| `WIN_CSC_KEY_PASSWORD`  | Windows certificate password     |
| `MAC_CSC_LINK`          | macOS code signing certificate   |
| `APPLE_ID`              | Apple ID for notarization        |
| `APPLE_ID_APP_PASSWORD` | App-specific password            |
| `GH_TOKEN`              | GitHub token for releases        |

## Related Pages

- [CI/CD Overview](./ci-cd-overview)
- [CircleCI](./circleci)
- [Desktop Apps](../desktop/desktop-overview)
