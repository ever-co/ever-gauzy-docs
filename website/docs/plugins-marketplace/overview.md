---
sidebar_position: 1
---

# Marketplace Plugin System

**Plugin Architecture, Marketplace Integration, and Plugin Development**

The Ever Gauzy Marketplace Plugin System enables third-party developers and internal teams to extend the platform with modular, isolated, and independently deployable plugins. The framework supports installation from npm registries, CDN endpoints, and local archives, with complete lifecycle orchestration including dependency resolution, activation, deactivation, and persistent metadata management.

## Documentation Guide

### Core Architecture

| Page                                                       | Description                                                                        |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Plugin Architecture](./plugin-architecture)               | Extension point model, lifecycle semantics, IPC, and the plugin interface contract |
| [Runtime System](./runtime-system)                         | PluginManager, download strategies, storage, lazy loading, and the event system    |
| [Marketplace Infrastructure](./marketplace-infrastructure) | PluginService API, platform targeting, subscriptions, and distribution             |

### User Interface

| Page                     | Description                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------- |
| [UI Module](./ui-module) | Angular module structure, routing, state management, and dynamic component loading |

### Plugin Development

| Page                                     | Description                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| [Development Guide](./development-guide) | Environment setup, manifests, project structure, templates, build configuration |
| [Tutorials](./plugin-tutorials)          | Step-by-step walkthroughs for building plugins from scratch                     |

### Operations

| Page                                                           | Description                                              |
| -------------------------------------------------------------- | -------------------------------------------------------- |
| [Security Considerations](./security-considerations)           | Context isolation, IPC whitelisting, and least privilege |
| [Performance & Troubleshooting](./performance-troubleshooting) | Optimization techniques and diagnostic guidance          |
| [Quick Reference](./quick-reference)                           | Reference tables, checklists, and essential links        |

:::note
This section covers the **Marketplace Plugin System** for runtime plugin installation and management (npm, CDN, local archives). For the **built-in UI plugin architecture** (`@gauzy/plugin-ui`) used to extend the frontend with routes, widgets, and extension slots at compile time, see the [Plugin UI System](../frontend/plugin-ui/overview) documentation.
:::

## Key Concepts

The plugin ecosystem is composed of three principal layers:

1. **Runtime Layer** — Governs how plugins are discovered, loaded, activated, and disposed of within the Electron-based host application
2. **Distribution Layer** — Encompasses the marketplace infrastructure for plugin publication, discovery, subscription management, and installation
3. **Development Layer** — Tooling, base classes, templates, and conventions for authoring conformant plugins

## Plugin Lifecycle

```
UNINITIALIZED → INITIALIZED → ACTIVE ⇌ INACTIVE → DISPOSED
```

Each state transition maps to a lifecycle method: `initialize()`, `activate()`, `deactivate()`, `dispose()`.

## Future Directions

- Plugin dependency management at runtime
- Sandbox-based isolation for enhanced security
- Hot module reloading for faster development
- Formal plugin permissions system
- Resource usage monitoring and enforcement
