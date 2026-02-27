---
sidebar_position: 1
---

# CI/CD Overview

Ever Gauzy uses multiple CI/CD pipelines for building, testing, and deploying across all platforms.

## CI/CD Platforms

| Platform           | Purpose                               |
| ------------------ | ------------------------------------- |
| **GitHub Actions** | Desktop apps, releases, Docker images |
| **CircleCI**       | API and webapp builds, testing        |

## Pipeline Architecture

```
Code Push / PR
     │
     ├── GitHub Actions
     │   ├── Build Desktop Apps (Win, Mac, Linux)
     │   ├── Build Docker Images
     │   ├── Publish to GitHub Releases
     │   └── Push to Container Registry
     │
     └── CircleCI
         ├── Lint & Type Check
         ├── Build API & Webapp
         ├── Run Tests
         └── Deploy to Staging/Production
```

## Build Targets

| Target            | CI Platform    | Output                |
| ----------------- | -------------- | --------------------- |
| API (NestJS)      | CircleCI       | Docker image          |
| Webapp (Angular)  | CircleCI       | Docker image / static |
| Desktop Timer     | GitHub Actions | .exe, .dmg, .AppImage |
| Desktop Server    | GitHub Actions | .exe, .dmg, .AppImage |
| Browser Extension | GitHub Actions | .zip                  |

## NX Integration

All builds use NX for task orchestration:

```bash
# Build only affected projects
npx nx affected --target=build

# Build specific project
npx nx build api

# Build with remote caching
npx nx build api --skip-nx-cache=false
```

### NX Cloud

Remote caching accelerates CI builds:

```bash
# Enable NX Cloud
NX_NO_CLOUD=false
NX_CLOUD_ACCESS_TOKEN=your-token
```

## Related Pages

- [GitHub Actions](./github-actions) — desktop and release workflows
- [CircleCI](./circleci) — API and webapp pipelines
- [Self-Hosted Runners (Windows)](./self-hosted-runners-windows) — provisioning Windows build machines
