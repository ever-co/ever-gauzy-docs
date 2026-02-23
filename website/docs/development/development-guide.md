---
sidebar_position: 1
---

# Development Guide

Getting started with Ever Gauzy development including environment setup, tooling, and best practices.

## Prerequisites

| Tool           | Version    | Purpose                             |
| -------------- | ---------- | ----------------------------------- |
| **Node.js**    | 18+ LTS    | Runtime                             |
| **Yarn**       | 4+ (Berry) | Package manager                     |
| **Git**        | Latest     | Version control                     |
| **PostgreSQL** | 14+        | Database (optional, SQLite for dev) |
| **VS Code**    | Latest     | Recommended IDE                     |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ever-co/ever-gauzy.git
cd ever-gauzy

# Install dependencies
yarn install

# Copy environment file
cp .env.sample .env

# Start API in development mode
yarn start:api

# Start webapp in development mode (separate terminal)
yarn start:gauzy
```

## NX Workspace

Ever Gauzy is an NX monorepo:

```bash
# List all projects
npx nx show projects

# Build a specific project
npx nx build api

# Run affected builds (only changed projects)
npx nx affected --target=build

# Generate dependency graph
npx nx graph
```

## Development Servers

| Service       | Command                    | URL                     |
| ------------- | -------------------------- | ----------------------- |
| API           | `yarn start:api`           | `http://localhost:3000` |
| Webapp        | `yarn start:gauzy`         | `http://localhost:4200` |
| Desktop Timer | `yarn start:desktop-timer` | Electron window         |

### Hot Reload

```bash
# API + Webapp with hot reload
yarn start:watch
```

This starts both API and webapp with file watching enabled.

## VS Code Extensions

Recommended:

| Extension                | Purpose                  |
| ------------------------ | ------------------------ |
| Angular Language Service | Angular template support |
| ESLint                   | Lint integration         |
| Prettier                 | Code formatting          |
| NX Console               | NX project management    |
| GitLens                  | Git integration          |

## Related Pages

- [Coding Standards](./coding-standards) — code style guide
- [Testing](./testing) — test strategies
- [Contributing](./contributing) — contribution guide
