---
sidebar_position: 2
---

# Plugin Architecture Foundations

Understanding the conceptual foundations of the Ever Gauzy plugin architecture.

## The Extension Point Model

The Ever Gauzy plugin system is predicated upon the _extension point_ paradigm, in which the host application exposes well-defined interfaces and lifecycle hooks into which conformant third-party modules may be injected. This architectural pattern enables a clear separation between the stable core of an application and the variable periphery of its extensions.

Each plugin is treated as a self-contained unit of deployment that advertises its capabilities through a structured manifest and conforms to a prescribed interface contract. The host application assumes responsibility for orchestrating the lifecycle of each plugin but delegates all domain-specific behavior to the plugin's own implementation.

## Lifecycle Semantics

The plugin lifecycle within Ever Gauzy follows a strictly ordered finite-state machine with the following states:

```
UNINITIALIZED → INITIALIZED → ACTIVE ⇌ INACTIVE → DISPOSED
```

Each state transition is governed by a corresponding lifecycle method:

- **`initialize()`**: Invoked once upon first load. The plugin registers its event listeners, establishes monitoring routines, and prepares internal state without yet creating visible UI artifacts.
- **`activate()`**: Invoked when the plugin transitions from inactive to active. Electron windows are created, services are started, and the plugin becomes operationally present in the application.
- **`deactivate()`**: The inverse of `activate()`. Windows are hidden, services are paused, and the plugin enters a dormant state from which it may be reactivated.
- **`dispose()`**: The terminal lifecycle method. All resources are released, event listeners removed, and the plugin becomes eligible for garbage collection.

This lifecycle model provides a predictable contract for both plugin authors and the host runtime, facilitating correct resource management and enabling dynamic toggling of plugin functionality without requiring application restarts.

## Inter-Process Communication

Because Ever Gauzy is built upon the Electron framework, all plugin functionality that bridges a graphical user interface (running in a sandboxed renderer process) with application logic (executing in the privileged main process) must traverse the Electron Inter-Process Communication (IPC) layer. The plugin system formalizes this boundary through the mandatory use of preload scripts and the `contextBridge` API, ensuring that renderer-side code cannot directly access Node.js primitives.

## The Plugin Interface Contract

All plugins must conform to the `IPlugin` interface, which formalizes the lifecycle contract at the TypeScript type system level:

```typescript
interface IPlugin {
  name: string;
  version: string;
  initialize(): Promise<void> | void;
  dispose(): Promise<void> | void;
  activate(): Promise<void> | void;
  deactivate(): Promise<void> | void;
  component?(): void;
  menu?: Electron.MenuItemConstructorOptions;
}
```

The optional `menu` property enables a plugin to contribute an entry to the host application's native menu bar, while the optional `component` property supports renderer-side component contribution. All four lifecycle methods are required, though implementations may be no-ops where a given phase has no meaningful effect for the plugin in question.
