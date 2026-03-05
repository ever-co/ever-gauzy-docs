---
sidebar_position: 3
---

# Plugin Runtime System

The plugin runtime is the core engine that manages plugin discovery, loading, activation, and disposal within the Electron-based host application.

## Repository Structure

The plugin runtime is organized as a cohesive module within the desktop library:

```
plugin-system/
├── data-access/          # Core plugin management logic
│   ├── strategies/       # Download strategy implementations
│   ├── dialog/           # UI dialogs for plugin operations
│   ├── plugin-manager.ts
│   └── download-context.factory.ts
├── database/             # Persistence layer
│   └── plugin-metadata.service.ts
├── events/               # Event management
│   ├── plugin-event.manager.ts
│   └── plugin.event.ts
└── shared/               # Shared utilities and interfaces
    ├── concretes/        # Concrete implementations
    ├── enumerations/     # Enums and constants
    ├── interfaces/       # TypeScript interfaces
    └── utils/            # Utility functions
```

## The PluginManager

The `PluginManager` constitutes the central orchestrator of the plugin runtime. Implemented as a singleton, it is responsible for the complete lifecycle of every installed plugin: installation from multiple source types, state management (activation and deactivation), persistence of plugin metadata, and coordination of the event notification subsystem.

Upon application startup, the `PluginManager` invokes `loadPlugins()`, which queries the persistent metadata store for all registered plugins and dynamically loads their entry modules using a lazy-loading utility backed by Node.js `require()`.

```typescript
class PluginManager {
  static getInstance(): IPluginManager;
  downloadPlugin<U>(config: U): Promise<IPluginMetadata>;
  installPlugin(metadata: IPluginMetadata, dir: string): Promise<void>;
  updatePlugin(metadata: IPluginMetadata): Promise<void>;
  activatePlugin(name: string): Promise<void>;
  deactivatePlugin(name: string): Promise<void>;
  uninstallPlugin(input: IPluginMetadataFindOne): Promise<ID>;
  loadPlugins(): Promise<void>;
  getAllPlugins(): Promise<IPluginMetadata[]>;
  getOnePlugin(name: string): Promise<IPluginMetadata>;
  checkInstallation(marketplaceId: ID): Promise<IPluginMetadata>;
  initializePlugins(): Promise<void>;
  disposePlugins(): Promise<void>;
  getMenuPlugins(): MenuItemConstructorOptions[];
}
```

### Application Startup Integration

```typescript
const pluginManager = PluginManager.getInstance();

// Load all installed plugins from persistent storage
await pluginManager.loadPlugins();

// Invoke initialize() on all previously active plugins
await pluginManager.initializePlugins();

// On shutdown: invoke dispose() on all active plugins
await pluginManager.disposePlugins();
```

### Menu Integration

Plugins that contribute native menu items may do so through the `getMenuPlugins()` method:

```typescript
import { Menu } from "electron";

const pluginMenus = pluginManager.getMenuPlugins();

const template = [
  // ... other menu items
  {
    label: "Plugins",
    submenu: pluginMenus,
  },
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
```

## Plugin Storage and Metadata

Installed plugins are stored within the application's user data directory under a `plugins/` subdirectory. Each plugin occupies a uniquely named directory constructed from a Unix millisecond timestamp and the plugin's name (e.g., `1234567890123-plugin-name/`).

The `PluginMetadataService` exposes the following operations:

| Method            | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `create()`        | Store new plugin metadata upon installation               |
| `update()`        | Persist modifications to an existing plugin record        |
| `delete()`        | Remove a plugin record upon uninstallation                |
| `findAll()`       | Retrieve the complete set of registered plugins           |
| `findOne()`       | Locate a specific plugin by identifier                    |
| `findActivated()` | Retrieve only those plugins currently in the ACTIVE state |

## Download Strategies

The plugin runtime supports installation from three distinct source types, each encapsulated within a dedicated strategy class following the Strategy design pattern:

```typescript
enum PluginDownloadContextType {
  CDN = "cdn",
  LOCAL = "local",
  NPM = "npm",
}
```

### CDN Download Strategy

Plugins distributed via CDNs are downloaded as ZIP archives over HTTPS. The strategy implements streaming-based extraction with robust retry logic (exponential backoff, up to three attempts) and a five-minute timeout.

### Local Download Strategy

For development and enterprise scenarios, plugins may be installed directly from the local filesystem. A native file picker dialog is presented to the user.

### npm Download Strategy

Plugins published to npm registries may be installed by package name, supporting configurable registry URLs, authentication tokens, automatic dependency resolution, and native module handling:

```typescript
{
  pkg: { name: string, version: string },
  pluginPath: string,
  registry: {
    privateURL?: string,
    authToken?: string
  }
}
```

## Security Measures During Installation

The CDN download strategy incorporates security validations:

- **Protocol validation**: Only `https://` and `http://` URLs are accepted
- **File extension validation**: Only `.zip` archives are processed
- **Path traversal protection**: All paths validated against the target directory to prevent "zip slip" attacks
- **Size limits**: Individual files capped at 500 MB; aggregate extraction capped at 1 GB

## The Lazy Loader

The `LazyLoader` utility dynamically resolves and loads plugin entry modules at runtime. Built upon Node.js `require()`, it accommodates both CommonJS default exports and named exports, with structured error handling to isolate loading failures.

## The Event System

The `PluginEventManager` provides an application-wide event bus implemented atop Node.js `EventEmitter`:

```typescript
const eventManager = PluginEventManager.getInstance();

// Emit a notification
eventManager.notify("Plugin installation completed");

// Register a subscriber
eventManager.listen((message) => {
  console.log("Plugin event:", message);
});
```
