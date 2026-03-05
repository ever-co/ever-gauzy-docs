---
sidebar_position: 30
---

# Module Dependency Graph

Understanding the module dependency tree and key architectural layers.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Applications"
        API[API App]
        Webapp[Angular Webapp]
        Desktop[Desktop App]
    end

    subgraph "Core Packages"
        Core[packages/core]
        Auth[packages/auth]
        Config[packages/config]
        Contracts[packages/contracts]
        Common[packages/common]
    end

    subgraph "Infrastructure"
        Plugin[packages/plugin]
        Plugins[packages/plugins/*]
    end

    API --> Core
    API --> Auth
    API --> Config
    API --> Plugin
    Plugin --> Plugins
    Core --> Contracts
    Core --> Common
    Auth --> Config
    Auth --> Contracts
    Webapp --> Contracts
    Desktop --> Webapp
```

## Core Module Dependencies

The `@gauzy/core` package is the largest, containing all API modules:

```mermaid
graph TB
    CoreModule --> AuthModule
    CoreModule --> EmployeeModule
    CoreModule --> TaskModule
    CoreModule --> ProjectModule
    CoreModule --> TimeTrackingModule
    CoreModule --> InvoiceModule
    CoreModule --> CRMModule
    CoreModule --> InI[IntegrationModule]

    EmployeeModule --> UserModule
    TaskModule --> ProjectModule
    InvoiceModule --> ContactModule
    TimeTrackingModule --> EmployeeModule
```

## Package Responsibilities

| Package     | Responsibility                    |
| ----------- | --------------------------------- |
| `contracts` | TypeScript interfaces, enums      |
| `common`    | Shared utilities, helpers         |
| `config`    | Configuration management          |
| `auth`      | Authentication & authorization    |
| `core`      | All business logic modules        |
| `plugin`    | Plugin infrastructure             |
| `plugins/*` | Individual plugin implementations |

## NX Dependency Graph

Visualize the full dependency graph:

```bash
npx nx graph
```

## Related Pages

- [Monorepo Structure](./monorepo-structure) — repo layout
- [Backend Architecture](./backend-architecture) — backend overview
- [Monorepo Navigation](../development/monorepo-navigation) — dev guide
