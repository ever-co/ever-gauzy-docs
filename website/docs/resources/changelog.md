---
id: changelog
title: Changelog
sidebar_label: Changelog
sidebar_position: 98
---

# Changelog

## Versioning

Ever Gauzy follows [Semantic Versioning](https://semver.org/):

- **MAJOR** — breaking changes
- **MINOR** — new features (backwards compatible)
- **PATCH** — bug fixes (backwards compatible)

## Release Channels

| Channel    | Purpose             |  Stability  |
| ---------- | ------------------- | :---------: |
| **Latest** | Production releases |  ✅ Stable  |
| **Next**   | Pre-release / RC    | ⚠️ Testing  |
| **Dev**    | Development builds  | ❌ Unstable |

## Where to Find Changes

- **GitHub Releases**: [ever-co/ever-gauzy/releases](https://github.com/ever-co/ever-gauzy/releases)
- **Docker Hub**: [everco/gauzy-api](https://hub.docker.com/r/everco/gauzy-api/tags)
- **npm**: [@gauzy/core](https://www.npmjs.com/package/@gauzy/core)

## Migration Guides

When upgrading between major versions, check:

1. [Environment Variables](./development/environment-variables) for new/changed variables
2. [Database Migrations](./database/migrations) for schema changes
3. [GitHub Release Notes](https://github.com/ever-co/ever-gauzy/releases) for breaking changes
