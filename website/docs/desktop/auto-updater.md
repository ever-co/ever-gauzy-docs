---
sidebar_position: 5
---

# Auto-Updater

Desktop applications include automatic update functionality via `electron-updater`.

## How It Works

```
App Startup → Check for Updates → Download Update
                                       │
                              ┌────────┴────────┐
                              │                 │
                        User Prompted    Background Download
                              │                 │
                        Install & Restart  Install on Quit
```

## Update Sources

| Source              | Configuration                  |
| ------------------- | ------------------------------ |
| **GitHub Releases** | Default — checks repo releases |
| **Custom Server**   | Self-hosted update server      |
| **S3 Bucket**       | AWS S3 with update metadata    |

## Configuration

### GitHub Releases

```json
// electron-builder.yml
publish:
  provider: github
  owner: ever-co
  repo: ever-gauzy
```

### Custom Server

```json
publish:
  provider: generic
  url: https://updates.yourdomain.com
```

## Update Process

1. **Check** — polls update server on startup and periodically
2. **Download** — downloads update package in background
3. **Verify** — validates checksum and signature
4. **Prompt** — notifies user of available update
5. **Install** — applies update (may require restart)

## Code Signing

Updates require code-signed builds to pass OS security:

| Platform | Signing                           |
| -------- | --------------------------------- |
| Windows  | Authenticode certificate (.pfx)   |
| macOS    | Apple Developer ID + notarization |
| Linux    | Not required (AppImage)           |

## Version Strategy

Semantic versioning: `MAJOR.MINOR.PATCH`

Pre-release channels:

- `latest` — stable releases
- `alpha` — pre-release builds

## Related Pages

- [Desktop Overview](./desktop-overview)
- [Desktop Builds](./desktop-builds) — building releases
- [GitHub Actions](../deployment/github-actions) — CI for releases
