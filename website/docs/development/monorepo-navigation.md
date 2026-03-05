---
sidebar_position: 18
---

# Monorepo Navigation Guide

Navigate the Ever Gauzy NX monorepo structure efficiently.

## Repository Structure

```
ever-gauzy/
├── apps/                    # Applications
│   ├── gauzy/               # Angular web app (main UI)
│   ├── api/                 # NestJS API server
│   ├── server-api/          # API standalone server
│   ├── desktop/             # Electron desktop app
│   ├── desktop-timer/       # Desktop timer app
│   └── ...
├── packages/                # Shared packages
│   ├── core/                # Core API module (entities, services, controllers)
│   ├── contracts/           # Shared TypeScript interfaces
│   ├── common/              # Common utilities
│   ├── config/              # Configuration
│   ├── auth/                # Authentication module
│   ├── plugin/              # Plugin infrastructure
│   └── plugins/             # Built-in plugins
│       ├── changelog/
│       ├── knowledge-base/
│       ├── integration-ai/
│       └── ...
├── libs/                    # Shared libraries
│   ├── ui-core/             # Core UI components
│   └── ...
└── tools/                   # Build tools & scripts
```

## Key Directories

| Directory               | Contents               | Key Files             |
| ----------------------- | ---------------------- | --------------------- |
| `packages/core/src/lib` | All API modules        | Controllers, services |
| `packages/contracts`    | TypeScript interfaces  | `src/lib/*.model.ts`  |
| `apps/gauzy/src`        | Angular frontend       | Components, modules   |
| `packages/plugins`      | Plugin implementations | Module, entity files  |

## Useful NX Commands

```bash
# List all projects
npx nx show projects

# Dependency graph
npx nx graph

# Run specific project
npx nx serve api
npx nx serve gauzy

# Build specific project
npx nx build api --configuration=production

# Run tests for a project
npx nx test core

# Affected projects (changes since main)
npx nx affected --target=build
```

## Finding Code

| Looking For          | Where to Look                                 |
| -------------------- | --------------------------------------------- |
| API endpoint         | `packages/core/src/lib/{feature}/`            |
| Entity definition    | `packages/core/src/lib/{feature}/*.entity.ts` |
| TypeScript interface | `packages/contracts/src/lib/`                 |
| Angular component    | `apps/gauzy/src/app/pages/`                   |
| Plugin               | `packages/plugins/{plugin-name}/`             |
| Shared service       | `packages/common/src/lib/`                    |

## Related Pages

- [Monorepo Structure](../architecture/monorepo-structure) — architecture overview
- [Development Guide](./development-guide) — getting started
