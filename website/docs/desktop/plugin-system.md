---
sidebar_position: 8
---

# Technical Guide to the Ever Gauzy Desktop Plugin System

**Plugin Architecture, Marketplace Integration, and Plugin Development**

---

*Ever Co. | Technical Documentation Series*

---

## Abstract

This guide provides a comprehensive technical exposition of the Ever Gauzy Desktop plugin ecosystem, encompassing three interconnected domains: the core plugin runtime system, the plugin marketplace infrastructure, and the developer-facing plugin authoring framework. Drawing upon the canonical architecture established by the reference plugin implementations, this document examines the theoretical underpinnings of plugin lifecycle management, the practical mechanics of plugin installation and distribution, and the prescriptive methodologies for constructing well-formed, production-ready plugins. The intended audience includes software engineers engaged in plugin authorship, platform integrators, and technical architects evaluating the extensibility characteristics of the Ever Gauzy Desktop application. The framework supports installation from npm registries, CDN endpoints, and local archives, and provides complete lifecycle orchestration including dependency resolution, activation, deactivation, and persistent metadata management.

---

## Table of Contents

1. Introduction
2. Conceptual Foundations of Plugin Architecture
   - 2.1 The Extension Point Model
   - 2.2 Lifecycle Semantics
   - 2.3 The Role of Inter-Process Communication
   - 2.4 The Plugin Interface Contract
3. The Plugin Runtime System
   - 3.1 Repository Structure
   - 3.2 The PluginManager
   - 3.3 Plugin Storage and Metadata
   - 3.4 Download Strategies
   - 3.5 Security Measures During Installation
   - 3.6 The Lazy Loader
   - 3.7 The Event System
4. The Plugin Marketplace and Distribution Infrastructure
   - 4.1 Overview
   - 4.2 The `PluginService`
   - 4.3 Plugin Sources and Platform Targeting
   - 4.4 The `PluginElectronService`
   - 4.5 The Subscription System
5. The Plugin User Interface Module
   - 5.1 Architectural Overview
   - 5.2 Module Structure
   - 5.3 Routing Topology
   - 5.4 State Management
   - 5.5 Principal UI Components
   - 5.6 Dynamic Component Loading
   - 5.7 Supporting Services
   - 5.8 Publication Workflow
6. Plugin Development Guide
   - 6.1 Prerequisites and Environment Setup
   - 6.2 The Plugin Manifest
   - 6.3 Repository Structure
   - 6.4 Selecting a Template
   - 6.5 The Main Plugin Class
   - 6.6 Tutorial: A Minimal Plugin Without UI
   - 6.7 Tutorial: A Plugin with a Custom Window
   - 6.8 Window Management
   - 6.9 Configuration Management
   - 6.10 The Preload Script
   - 6.11 Event-Driven Communication
   - 6.12 Timer and Interval Management
   - 6.13 Build Configuration
   - 6.14 Dependency Management
   - 6.15 Runtime Plugin Management
   - 6.16 Publishing to the Marketplace
7. Security Considerations
8. Performance Optimization
9. Troubleshooting and Diagnostics
10. Conclusion and Future Directions

---

## 1. Introduction

Modern desktop applications increasingly rely upon extensible architectures to accommodate a diverse and evolving set of user requirements without necessitating monolithic releases of the host application. The Ever Gauzy Desktop platform addresses this imperative through a formally defined plugin system that enables third-party developers and internal engineering teams to augment application functionality in a modular, isolated, and independently deployable manner.

The plugin ecosystem is composed of three principal strata. The first is the **runtime layer**, which governs how plugins are discovered, loaded, activated, and ultimately disposed of within the Electron-based host application. The second is the **distribution layer**, which encompasses the marketplace infrastructure enabling plugin publication, discovery, subscription management, and installation from multiple origin sources. The third is the **development layer**, consisting of the tooling, base classes, templates, and conventions that enable developers to author conformant plugins efficiently and correctly.

This guide treats each of these strata in sequence, establishing the conceptual foundations before progressing to practical implementation guidance.

---

## 2. Conceptual Foundations of Plugin Architecture

### 2.1 The Extension Point Model

The Ever Gauzy plugin system is predicated upon the *extension point* paradigm, in which the host application exposes well-defined interfaces and lifecycle hooks into which conformant third-party modules may be injected. This architectural pattern, as described in the classical literature on component-based software engineering, enables a clear separation between the stable core of an application and the variable periphery of its extensions.

Each plugin is treated as a self-contained unit of deployment that advertises its capabilities through a structured manifest and conforms to a prescribed interface contract. The host application assumes responsibility for orchestrating the lifecycle of each plugin but delegates all domain-specific behaviour to the plugin's own implementation.

### 2.2 Lifecycle Semantics

The plugin lifecycle within Ever Gauzy follows a strictly ordered finite-state machine with the following states:

```
UNINITIALIZED → INITIALIZED → ACTIVE ⇌ INACTIVE → DISPOSED
```

Each state transition is governed by a corresponding lifecycle method:

- **`initialize()`**: Invoked once upon first load. The plugin registers its event listeners, establishes monitoring routines, and prepares internal state without yet creating visible UI artefacts.
- **`activate()`**: Invoked when the plugin transitions from inactive to active. Electron windows are created, services are started, and the plugin becomes operationally present in the application.
- **`deactivate()`**: The inverse of `activate()`. Windows are hidden, services are paused, and the plugin enters a dormant state from which it may be reactivated.
- **`dispose()`**: The terminal lifecycle method. All resources are released, event listeners removed, and the plugin becomes eligible for garbage collection.

This lifecycle model provides a predictable contract for both plugin authors and the host runtime, facilitating correct resource management and enabling dynamic toggling of plugin functionality without requiring application restarts.

### 2.3 The Role of Inter-Process Communication

Because Ever Gauzy is built upon the Electron framework, all plugin functionality that bridges a graphical user interface (running in a sandboxed renderer process) with application logic (executing in the privileged main process) must traverse the Electron Inter-Process Communication (IPC) layer. The plugin system formalises this boundary through the mandatory use of preload scripts and the `contextBridge` API, ensuring that renderer-side code cannot directly access Node.js primitives. This architectural constraint is not merely a security consideration but a fundamental structural property of the plugin system.

### 2.4 The Plugin Interface Contract

All plugins must conform to the `IPlugin` interface, which formalises the lifecycle contract at the TypeScript type system level. The interface is defined as follows:

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

The optional `menu` property enables a plugin to contribute an entry to the host application's native menu bar, whilst the optional `component` property supports renderer-side component contribution. All four lifecycle methods are required, though implementations may be no-ops where a given phase has no meaningful effect for the plugin in question.

---

## 3. The Plugin Runtime System

### 3.1 Repository Structure

The plugin runtime is organised as a cohesive module within the desktop library, with a clear internal decomposition that aligns structural boundaries with functional responsibilities:

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

This decomposition reflects the layered architecture described in Section 2.1: the `data-access` sub-module governs runtime orchestration, the `database` sub-module owns persistence, the `events` sub-module provides the notification bus, and `shared` supplies the contracts that bind all layers together.

### 3.2 The PluginManager

The `PluginManager` constitutes the central orchestrator of the plugin runtime. Implemented as a singleton—ensuring a single authoritative source of truth across the application—it is responsible for the complete lifecycle of every installed plugin. Its principal responsibilities encompass plugin installation from multiple source types, plugin state management (activation and deactivation), persistence of plugin metadata to a local database, and coordination of the event notification subsystem.

Upon application startup, the `PluginManager` invokes `loadPlugins()`, which queries the persistent metadata store for all registered plugins and dynamically loads their entry modules using a lazy-loading utility backed by Node.js `require()`. This deferred loading strategy minimises startup latency while ensuring that all known plugins are available for activation on demand.

The public API of the `PluginManager` is summarised in the following interface:

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

#### 3.2.1 Application Startup Integration

The following pattern illustrates the canonical usage of `PluginManager` during application initialisation and shutdown:

```typescript
const pluginManager = PluginManager.getInstance();

// Load all installed plugins from persistent storage
await pluginManager.loadPlugins();

// Invoke initialize() on all previously active plugins
await pluginManager.initializePlugins();

// On shutdown: invoke dispose() on all active plugins
await pluginManager.disposePlugins();
```

#### 3.2.2 Menu Integration

Plugins that contribute native menu items may do so through the `getMenuPlugins()` method, which returns the aggregated menu descriptors from all installed plugins:

```typescript
import { Menu } from 'electron';

const pluginMenus = pluginManager.getMenuPlugins();

const template = [
  // ... other menu items
  {
    label: 'Plugins',
    submenu: pluginMenus
  }
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
```

### 3.3 Plugin Storage and Metadata

Installed plugins are stored within the application's user data directory under a `plugins/` subdirectory. Each plugin occupies a uniquely named directory constructed from a Unix millisecond timestamp and the plugin's name (e.g., `1234567890123-plugin-name/`), a scheme that eliminates directory collision in the event of concurrent installations.

Persistent metadata for each plugin is maintained in the application's local database through the `PluginMetadataService`. The persisted schema captures the plugin's name, version, description, filesystem paths for the main entry point and optional renderer component, marketplace and version identifiers enabling server-side synchronisation, activation state, and the installation directory path. The `PluginMetadataService` exposes the following operations:

| Method | Description |
|--------|-------------|
| `create()` | Store new plugin metadata upon installation |
| `update()` | Persist modifications to an existing plugin record |
| `delete()` | Remove a plugin record upon uninstallation |
| `findAll()` | Retrieve the complete set of registered plugins |
| `findOne()` | Locate a specific plugin by identifier |
| `findActivated()` | Retrieve only those plugins currently in the ACTIVE state |

### 3.4 Download Strategies

The plugin runtime supports installation from three distinct source types, each encapsulated within a dedicated strategy class following the Strategy design pattern. The appropriate strategy is selected at runtime by the `DownloadContextFactory`, which inspects the `PluginDownloadContextType` enumeration value supplied by the caller:

```typescript
enum PluginDownloadContextType {
  CDN   = 'cdn',
  LOCAL = 'local',
  NPM   = 'npm'
}
```

#### 3.4.1 CDN Download Strategy

Plugins distributed via content delivery networks are downloaded as ZIP archives over HTTPS. The strategy implements streaming-based extraction, whereby the archive is unpacked directly from the network stream without materialising a complete local copy, thereby reducing I/O overhead. Robust retry logic with exponential backoff (up to three attempts) and a five-minute timeout guard against transient network failures.

#### 3.4.2 Local Download Strategy

For development and enterprise scenarios, plugins may be installed directly from the local filesystem. This strategy validates the presence of a conformant manifest and performs the same installation steps as the CDN strategy, minus the network acquisition phase. A native file picker dialog is presented to the user to facilitate file selection.

#### 3.4.3 npm Download Strategy

Plugins published to npm registries—whether the public registry or a private enterprise instance—may be installed by package name, leveraging the existing Node.js package ecosystem for version resolution and distribution. This strategy supports configurable registry URLs and authentication tokens, automatic dependency resolution, recursive dependency installation, and native module handling:

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

### 3.5 Security Measures During Installation

The CDN download strategy incorporates a suite of security validations that execute prior to and during extraction:

- **Protocol validation**: Only `https://` and `http://` URLs are accepted; data URIs and other schemes are rejected.
- **File extension validation**: Only `.zip` archives are processed, preventing the installation of arbitrary binary formats.
- **Path traversal protection**: All paths within the extracted archive are validated against the target extraction directory to prevent directory traversal attacks (commonly known as "zip slip").
- **Size limits**: Individual files within the archive are constrained to 500 MB; the aggregate extraction size is capped at 1 GB.

### 3.6 The Lazy Loader

The `LazyLoader` utility provides the mechanism by which the `PluginManager` dynamically resolves and loads plugin entry modules at runtime. Built upon Node.js `require()`, the loader accommodates both CommonJS default exports and named exports, providing structured error handling to isolate loading failures from the broader application lifecycle. This approach ensures that a malformed plugin module does not propagate exceptions into the host application's startup path.

### 3.7 The Event System

The `PluginEventManager` provides an application-wide event bus, implemented atop Node.js `EventEmitter`, through which the plugin runtime broadcasts state change notifications. The system adopts the `NOTIFY` event as its primary communication channel, enabling subscribers—including the Angular-based plugin management UI—to react to installation progress, activation changes, and error conditions in a loosely coupled fashion.

```typescript
const eventManager = PluginEventManager.getInstance();

// Emit a notification to all registered subscribers
eventManager.notify('Plugin installation completed');

// Register a subscriber
eventManager.listen((message) => {
  console.log('Plugin event:', message);
});
```

---

## 4. The Plugin Marketplace and Distribution Infrastructure

### 4.1 Overview

The marketplace infrastructure provides the commercial and logistical framework within which plugins are published, discovered, acquired, and maintained. From a technical standpoint, the marketplace comprises a server-side registry of plugin artefacts and metadata, a subscription and billing management system, and a client-side service layer that bridges the Angular UI with both the server API and the Electron main process.

### 4.2 The `PluginService`

The `PluginService` is the primary HTTP client for marketplace operations, addressing the API endpoint `${API_PREFIX}/plugins`. It exposes methods covering the full lifecycle of marketplace interactions: paginated retrieval of available plugins, single-plugin detail fetching, artefact upload with progress reporting, version management, installation recording, and uninstallation notification. Notably, the service supports streaming progress for both upload and download operations, enabling responsive feedback in the UI during long-running transfers.

The principal methods exposed by this service are enumerated below:

| Method | Description |
|--------|-------------|
| `getAll(params)` | Retrieve a paginated list of marketplace plugins |
| `getOne(id, params)` | Fetch complete metadata for a single plugin |
| `search(params)` | Perform keyword and facet-based search |
| `upload(plugin)` | Publish a new plugin artefact with progress events |
| `update(pluginId, plugin)` | Modify an existing plugin record |
| `delete(id)` | Remove a plugin from the marketplace |
| `install({ pluginId, versionId })` | Record a plugin installation against the caller's account |
| `uninstall(pluginId, installationId)` | Notify the server of a plugin uninstallation |
| `activate(pluginId, installationId)` | Record a plugin activation event |
| `deactivate(pluginId, installationId)` | Record a plugin deactivation event |
| `addVersion(pluginId, version)` | Publish a new version of an existing plugin |
| `getVersions(pluginId, params)` | Retrieve the version history for a plugin |
| `addSources(pluginId, versionId, sources)` | Attach platform-specific distribution artefacts to a version |
| `verify({ pluginId, versionId, signature })` | Validate the cryptographic integrity of a plugin artefact |

### 4.3 Plugin Sources and Platform Targeting

The marketplace supports three source type designations for plugin artefacts, enabling platform-specific builds to be associated with a single version:

**Gauzy (Hosted Upload)**

```typescript
{
  type: PluginSourceType.GAUZY,
  file: File,                    // ZIP archive
  operatingSystem: PluginOSType, // WINDOWS, MACOS, LINUX, ALL
  architecture: PluginOSArch     // X64, ARM64, X86, ALL
}
```

**CDN-Referenced Artefact**

```typescript
{
  type: PluginSourceType.CDN,
  url: string,                   // HTTPS endpoint
  integrity: string,             // Subresource Integrity hash (optional)
  crossOrigin: string,           // CORS policy
  operatingSystem: PluginOSType,
  architecture: PluginOSArch
}
```

**npm Package**

```typescript
{
  type: PluginSourceType.NPM,
  name: string,                  // Package identifier
  registry: string,              // Registry base URL
  private: boolean,
  scope: string,
  operatingSystem: PluginOSType,
  architecture: PluginOSArch
}
```

This tripartite source model enables a single published plugin version to provide native binary optimisations for Windows (x64), macOS (arm64), and Linux (x64) from a single catalogue entry.

### 4.4 The `PluginElectronService`

The `PluginElectronService` serves as the bridge between the Angular renderer process and the Electron main process for desktop-specific operations. It exposes methods that translate high-level UI intents—such as activating a plugin or monitoring installation progress—into IPC invocations directed at the main process. The service exposes an `isDesktop` guard property that enables the UI to conditionally render desktop-exclusive features, maintaining compatibility with potential web deployments of the management interface.

The IPC channels maintained by this service include channels for retrieving all installed plugins, activating and deactivating individual plugins, initiating download-and-install sequences, reporting installation progress, and querying operating system information (platform and architecture) to enable platform-appropriate download selection.

### 4.4 The Subscription System

The marketplace incorporates a comprehensive subscription management subsystem, reflecting the commercial reality that many plugins are distributed under paid licence terms. The `PluginSubscriptionService` exposes a rich API covering:

- **Subscription lifecycle**: creation, update, cancellation, upgrade, and downgrade operations.
- **Plan management**: bulk creation of subscription plans, plugin-specific plan retrieval, and plan comparison utilities.
- **Billing operations**: retrieval of billing history, invoice download, payment retry, and refund processing.
- **Analytics**: subscription metrics and usage analytics at both the plugin and individual subscription levels.
- **Promotional utilities**: promo code validation and subscription preview generation.

Subscription plans are categorised by type (FREE, TRIAL, BASIC, PREMIUM, ENTERPRISE, CUSTOM), billing period (DAILY through ONE_TIME), status (ACTIVE, TRIAL, CANCELLED, EXPIRED, PAST_DUE, SUSPENDED, PENDING), and scope (USER, ORGANIZATION, TEAM). This taxonomy enables a flexible commercial model accommodating freemium, time-limited trials, and enterprise site licences within a unified framework.

The version management workflow prescribes the following procedure for publishing a new plugin version:

```typescript
this.pluginService.addVersion(pluginId, {
  number: '1.1.0',
  changelog: 'Bug fixes and performance improvements to the task synchronisation engine',
  releaseDate: new Date(),
  sources: [ /* platform-specific source descriptors */ ]
}).subscribe();
```

---

## 5. The Plugin User Interface Module

### 5.1 Architectural Overview

The plugin management UI is an Angular 18+ module providing end users with facilities for marketplace discovery, plugin installation, configuration, and lifecycle management. Its internal architecture follows the reactive state management pattern using the Akita library, with side effects handled through `@ngneat/effects` and `@ngneat/effects-ng`. The module is structured into distinct components for each functional concern, with shared services providing cross-cutting capabilities.

The technology stack employed within this module comprises:

- **Angular** with standalone components and `OnPush` change detection strategy
- **Akita** for predictable, entity-oriented state management
- **`@ngneat/effects` and `@ngneat/effects-ng`** for declarative side effect management
- **Nebular** as the primary UI component library
- **Angular2SmartTable** for tabular data presentation
- **RxJS** for reactive data flow composition

### 5.2 Module Structure

The Angular UI module is structured as follows:

```
plugins/
├── component/
│   ├── +state/                    # Cross-cutting state management
│   ├── add-plugin/                # Installation source selection dialog
│   ├── plugin-marketplace/        # Marketplace browser
│   │   ├── +state/
│   │   ├── plugin-marketplace-item/
│   │   ├── plugin-marketplace-upload/
│   │   ├── plugin-marketplace-filter/
│   │   ├── plugin-subscription-plan-selection/
│   │   ├── plugin-settings-management/
│   │   └── plugin-user-management/
│   ├── plugin-list/               # Installed plugins table
│   ├── plugin-layout/             # Top-level navigation
│   ├── plugin/                    # Plugin renderer view
│   ├── upload-selection/          # Install vs. Publish intent dialog
│   └── pending-installation-dialog/
├── services/
│   ├── builders/
│   ├── factories/
│   ├── resolvers/
│   ├── strategies/
│   └── *.service.ts
├── domain/
│   ├── commands/
│   └── interfaces/
├── guards/
└── shared/
```

### 5.3 Routing Topology

The module exposes the following route hierarchy:

```
/plugins
  ├── /marketplace              # Plugin marketplace (default)
  │   ├── /                    # Marketplace list view
  │   ├── /:id                 # Plugin detail view
  │   │   ├── /overview        # Descriptive overview tab
  │   │   ├── /source-code     # Source code tab
  │   │   ├── /user-management # Access control tab
  │   │   └── /settings        # Configuration tab
  │   └── /:id/versions        # Version history
  └── /installed               # Installed plugins list
      ├── /                    # Installed list view
      └── /:name               # Plugin renderer view
```

### 5.4 State Management

Three primary Akita stores govern the UI state, each delineating a coherent slice of the application domain:

The **`PluginStore`** manages the collection of locally installed plugins and their activation states, along with in-progress activation and deactivation flags that drive loading indicators in the UI. It employs `EntityStore` for normalised entity storage and a paired `PluginQuery` extending `QueryEntity` for reactive, selector-based state access.

The **`PluginMarketplaceStore`** maintains the marketplace browsing state:

```typescript
export interface PluginMarketplaceState {
  plugins: IPlugin[];
  count: number;
  filters: IPluginFilter;
  appliedFilters: IPluginFilter;
  viewMode: 'grid' | 'list';
  showAdvancedFilters: boolean;
  loading: boolean;
}
```

The **`PluginSubscriptionStore`** holds the current user's subscription collection and the active subscription being managed, along with loading and error states for asynchronous operations.

The `@ngneat/effects` pattern governs all asynchronous side effects, ensuring that components remain pure projections of store state:

```typescript
export const PluginMarketplaceEffects = {
  getAll$: createEffect((actions$) =>
    actions$.pipe(
      ofType(PluginMarketplaceActions.getAll),
      switchMap(({ params }) =>
        this.pluginService
          .getAll(params)
          .pipe(
            map(({ items, total }) =>
              PluginMarketplaceActions.getAllSuccess({
                plugins: items,
                count: total
              })
            )
          )
      )
    )
  )
};
```

### 5.5 Principal UI Components

**`PluginLayoutComponent`** provides the top-level navigation structure, offering tab-based access to the marketplace browser and the installed plugins list. It detects the desktop execution context and suppresses the installed plugins tab in non-desktop environments.

**`PluginMarketplaceComponent`** implements the full marketplace browsing experience, including grid and list view modes, multi-criteria filtering (by name, status, type, author, licence, download threshold, date range, and quality badges), infinite scroll pagination, and a modal-based plugin detail view.

**`PluginListComponent`** presents the locally installed plugins as a sortable, paginated smart table with inline activation toggling, update notifications, and uninstallation with confirmation.

**`PluginMarketplaceDetailComponent`** offers a tabbed deep-dive into a selected plugin, covering descriptive overview content, user access control, plugin-specific configuration, subscription and billing management, and usage analytics.

### 5.6 Dynamic Component Loading

A particularly notable capability of the plugin UI module is the `PluginLoaderService`, which enables the dynamic loading of Angular components or NgModules exported by installed plugins at runtime. This capability transforms the plugin system from a passive feature-flag mechanism into a genuine component extension point: installed plugins may contribute bespoke Angular UI components that are instantiated and rendered within the host application's view hierarchy on demand. The service handles standalone components and traditional NgModule-based components uniformly, and provides graceful degradation through a fallback component in the event that a plugin's UI component fails to load.

### 5.7 Supporting Services

The following services provide cross-cutting capabilities within the UI module:

| Service | Responsibility |
|---------|---------------|
| `PluginCategoryService` | Manage taxonomic categories for marketplace classification |
| `PluginTagsService` | Manage keyword-based tag associations |
| `PluginAnalyticsService` | Track and expose usage metrics and download statistics |
| `PluginLoaderService` | Dynamically instantiate plugin-contributed Angular components |
| `PluginEnvironmentService` | Resolve environment-specific configuration parameters |
| `PluginSettingsService` | Persist and retrieve per-plugin configuration data |
| `PluginUserAssignmentService` | Manage per-user plugin access assignments |
| `PluginSubscriptionAccessService` | Enforce subscription-tier access gates |
| `UserSubscribedPluginsService` | Aggregate the current user's active subscriptions |
| `PluginSecurityService` | Govern permissions, API keys, and security scan orchestration |

#### 5.7.1 Security Service Operations

The `PluginSecurityService` provides the following principal operations for security governance:

```typescript
getPluginSecurity(pluginId)               // Retrieve security configuration
getPluginPermissions(pluginId)            // Retrieve declared permissions
createPermission(permission)              // Grant a new permission
getApiKeys(pluginId)                      // Retrieve API key inventory
createApiKey(pluginId, name, permissions) // Provision a scoped API key
initiateScan(pluginId, config)            // Launch an asynchronous security scan
getComplianceStatus(pluginId)             // Retrieve compliance assessment results
```

### 5.8 Publication Workflow

Developers wishing to publish a plugin to the marketplace complete a multi-step structured form encompassing the following stages:

1. **Basic Information**: Display name, description, type designation, status, taxonomic category, author attribution, licence declaration, and homepage or repository URLs.
2. **Version Information**: Semantic version number, changelog (minimum ten characters), release date, and at least one associated source descriptor.
3. **Platform-Specific Sources**: One or more source descriptors targeting specific operating system and architecture combinations.
4. **Subscription Plans** (conditional): If the plugin is designated as requiring a subscription, one or more subscription plan descriptors must be provided, specifying pricing, billing period, feature entitlements, and trial parameters.

---

## 6. Plugin Development Guide

### 6.1 Prerequisites and Environment Setup

Plugin development for Ever Gauzy Desktop requires Node.js version 18 or later, the Yarn package manager, and a working understanding of TypeScript and the Electron application model.

A development environment may be initialised as follows:

```bash
mkdir my-plugin && cd my-plugin
npm init -y
npm install --save-dev typescript webpack webpack-cli ts-loader \
    copy-webpack-plugin terser-webpack-plugin @types/node electron
```

### 6.2 The Plugin Manifest

Every plugin must include a `manifest.json` file at its root. This manifest serves as the machine-readable identity document for the plugin and is consulted by the `PluginManager` during installation and loading.

```json
{
  "name": "My Plugin",
  "version": "1.0.0",
  "author": "Author Name",
  "category": "Productivity",
  "description": "A concise description of plugin functionality",
  "main": "index.bundle.js"
}
```

The `main` field must reference the compiled and bundled entry point, typically produced by the Webpack build pipeline. The `renderer` field is optional and, when present, specifies the entry point for the Angular component contribution.

**Required fields**: `name`, `version`, `main`.

**Optional fields**: `description`, `renderer`, `author`, `category`, `logo`.

### 6.3 Repository Structure

#### Minimal Plugin Structure

```
my-plugin/
├── manifest.json          # Plugin metadata (required)
├── package.json           # NPM package configuration
├── index.ts               # Main process entry point (required)
├── webpack.config.js      # Build pipeline configuration
├── tsconfig.json          # TypeScript compiler configuration
├── README.md              # Developer documentation
├── ui/                    # Renderer UI assets (optional)
│   └── index.html
└── build/                 # Compiled output directory (generated)
    ├── index.bundle.js
    ├── manifest.json
    └── package.json
```

#### Advanced Plugin Structure (with Window Management)

```
my-plugin/
├── manifest.json
├── package.json
├── index.ts               # Main plugin class
├── window.ts              # Window lifecycle management
├── config.ts              # Configuration persistence
├── preload.ts             # Renderer process IPC bridge
├── webpack.config.js
├── tsconfig.json
├── ui/
│   └── index.html
├── assets/
│   └── icon.png
└── build/
```

### 6.4 Selecting a Template

Three production-ready templates are provided to accelerate plugin development. The selection among them should be guided by the complexity of the intended user interface and the team's framework familiarity:

| Template | Bundle Size | Best Suited For |
|----------|-------------|----------------|
| `plugin-template-html` (HTML/CSS/JS) | ~60 KB | Simple settings pages, informational displays, minimal interactivity; no UI build step required |
| `plugin-template-react` (React 18+) | ~200 KB | Component-oriented UIs, reactive state management via hooks, access to the broader React ecosystem |
| `plugin-template-angular` (Angular 19+) | ~350 KB | Complex multi-view interfaces, form-heavy interactions, dependency injection, enterprise-grade maintainability |

Developers are advised to begin with the HTML template for prototyping purposes, graduating to the React or Angular templates as interface complexity warrants.

### 6.5 The Main Plugin Class

All plugins implement the `IPlugin` interface, which formalises the lifecycle contract at the TypeScript type system level. Plugin authors provide concrete implementations of all four lifecycle methods and, optionally, a `menu` property to contribute a native menu item:

```typescript
import { MenuItemConstructorOptions } from 'electron';

class MyPlugin {
  public initialize(): void {
    // Register event listeners and monitoring routines
    console.log('Plugin initialising');
  }

  public async activate(): Promise<void> {
    // Create windows, start services
    console.log('Plugin activating');
  }

  public deactivate(): void {
    // Hide windows, pause services
    console.log('Plugin deactivating');
  }

  public dispose(): void {
    // Release all resources
    console.log('Plugin disposing');
  }

  public get menu(): MenuItemConstructorOptions {
    return {
      label: 'My Plugin',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+Shift+M',
          click: async () => { /* ... */ }
        }
      ]
    };
  }
}

export default new MyPlugin();
```

The module must export a singleton instance of the plugin class as its default export, as the `PluginManager` accesses the plugin's interface through this export.

### 6.6 Tutorial: A Minimal Plugin Without UI

The following tutorial constructs a complete, functional plugin that contributes a native menu item and presents a system dialog upon selection.

#### 6.6.1 Manifest

```json
{
  "name": "Hello Plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "category": "Utility",
  "description": "A minimal demonstration plugin",
  "main": "index.bundle.js"
}
```

#### 6.6.2 Main Entry Point (`index.ts`)

```typescript
import { dialog, MenuItemConstructorOptions } from 'electron';

class HelloPlugin {
  public async activate(): Promise<void> {
    console.log('Hello Plugin activated');
  }

  public initialize(): void {
    console.log('Hello Plugin initialised');
  }

  public dispose(): void {
    console.log('Hello Plugin disposed');
  }

  public deactivate(): void {
    console.log('Hello Plugin deactivated');
  }

  public get menu(): MenuItemConstructorOptions {
    return {
      label: 'Hello Plugin',
      submenu: [
        {
          label: 'Say Hello',
          click: async () => {
            await dialog.showMessageBox({
              title: 'Hello',
              message: 'Hello from the Ever Gauzy plugin system!',
              buttons: ['OK']
            });
          }
        }
      ]
    };
  }
}

export default new HelloPlugin();
```

#### 6.6.3 Webpack Configuration (`webpack.config.js`)

```javascript
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: '' },
        { from: 'package.json', to: '' }
      ]
    })
  ],
  resolve: { extensions: ['.ts', '.js'] },
  externals: ['electron'],
  target: 'node'
};
```

#### 6.6.4 TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./build",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["*.ts"],
  "exclude": ["node_modules", "build"]
}
```

#### 6.6.5 Build and Distribution

```bash
npm run build
# Produces the build/ directory
cd build && zip -r ../my-plugin.zip .
```

### 6.7 Tutorial: A Plugin with a Custom Window

The following tutorial demonstrates the complete implementation of a plugin that presents a custom Electron `BrowserWindow`, manages IPC communication through a preload bridge, and integrates with host application events.

#### 6.7.1 Main Plugin Class (`index.ts`)

```typescript
import { ipcMain, MenuItemConstructorOptions } from 'electron';
import { MyPluginWindow } from './window';

class MyPlugin {
  private window: MyPluginWindow;

  constructor() {
    this.window = new MyPluginWindow();
  }

  public async activate(): Promise<void> {
    this.window.initialize();
    await this.window.show();
  }

  public initialize(): void {
    ipcMain.on('start-capture-screen', () => {
      // React to host application events
    });
  }

  public dispose(): void {
    this.window.dispose();
    ipcMain.removeAllListeners('start-capture-screen');
  }

  public deactivate(): void {
    this.window.hide();
  }

  public get menu(): MenuItemConstructorOptions {
    return {
      label: 'My Plugin',
      submenu: [
        {
          label: 'Open Window',
          accelerator: 'CmdOrCtrl+M',
          click: async () => { await this.window.show(); }
        },
        { type: 'separator' },
        {
          label: 'Reload',
          click: async () => { await this.window.reload(); }
        }
      ]
    };
  }
}

export default new MyPlugin();
```

#### 6.7.2 Window Manager (`window.ts`)

```typescript
import { BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';

export class MyPluginWindow {
  private window: BrowserWindow | null = null;
  private isInitialized = false;

  public initialize(): void {
    if (this.isInitialized) return;
    this.createWindow();
    this.setupIpcHandlers();
    this.isInitialized = true;
  }

  private createWindow(): void {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.bundle.js')
      }
    });

    this.window.loadFile(path.join(__dirname, 'ui', 'index.html'));
    this.window.on('closed', () => { this.window = null; });
    this.window.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });
  }

  private setupIpcHandlers(): void {
    ipcMain.handle('my-plugin-action', async (_event, data) => {
      return { success: true, received: data };
    });
    ipcMain.on('my-plugin-close', () => { this.hide(); });
  }

  public async show(): Promise<void> {
    if (!this.window) this.createWindow();
    this.window?.show();
    this.window?.focus();
  }

  public hide(): void { this.window?.hide(); }
  public async reload(): Promise<void> { this.window?.webContents.reload(); }

  public dispose(): void {
    ipcMain.removeHandler('my-plugin-action');
    ipcMain.removeAllListeners('my-plugin-close');
    if (this.window && !this.window.isDestroyed()) this.window.close();
    this.window = null;
    this.isInitialized = false;
  }
}
```

#### 6.7.3 Renderer UI (`ui/index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Plugin</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: 20px;
            background: #1a1a2e;
            color: #f1f5f9;
        }
        button {
            padding: 10px 20px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <h1>My Plugin</h1>
    <button onclick="handleAction()">Perform Action</button>
    <button onclick="closeWindow()">Close</button>
    <script>
        async function handleAction() {
            const result = await window.myPluginAPI.performAction({ test: 'data' });
            console.log('Result:', result);
        }
        function closeWindow() { window.myPluginAPI.closeWindow(); }
        const cleanup = window.myPluginAPI.onUpdate((data) => {
            console.log('Update received:', data);
        });
        window.addEventListener('beforeunload', cleanup);
    </script>
</body>
</html>
```

### 6.8 Window Management

Plugins that present graphical interfaces must manage their Electron `BrowserWindow` through a dedicated window class. This separation of concerns isolates window lifecycle management from the plugin's domain logic and ensures that IPC handlers are consistently registered and deregistered in alignment with window lifecycle events. The `MyPluginWindow` class demonstrated in §6.7.2 represents the recommended pattern: the window is constructed with `show: false` to prevent premature display, and `show()` is called explicitly within `activate()`. The `dispose()` method removes all IPC handlers and closes the window, guaranteeing complete resource release across repeated activation cycles.

### 6.9 Configuration Management

Persistent plugin configuration is managed through a dedicated class backed by `electron-store`, which handles serialisation and JSON persistence automatically. The configuration class is responsible for applying validation logic prior to persisting any mutation.

```typescript
import Store from 'electron-store';

export interface MyPluginSettings {
  enabled: boolean;
  refreshInterval: number;
}

export class MyPluginConfig {
  private store: Store<MyPluginSettings>;
  private readonly defaults: MyPluginSettings = { enabled: true, refreshInterval: 30 };

  constructor() {
    this.store = new Store<MyPluginSettings>({
      name: 'my-plugin-settings',
      defaults: this.defaults,
    });
  }

  public getSettings(): MyPluginSettings {
    return this.store.store;
  }

  public updateSettings(settings: Partial<MyPluginSettings>): void {
    const errors = this.validate(settings);
    if (errors.length > 0) {
      throw new Error(`Invalid settings: ${errors.join('; ')}`);
    }
    for (const [key, value] of Object.entries(settings)) {
      this.store.set(key as keyof MyPluginSettings, value);
    }
  }

  private validate(settings: Partial<MyPluginSettings>): string[] {
    const errors: string[] = [];
    if (settings.refreshInterval !== undefined && settings.refreshInterval < 1) {
      errors.push('Refresh interval must be at least 1 second');
    }
    return errors;
  }
}
```

Settings validation is invoked before persistence, providing an opportunity to enforce business constraints and surface structured error information to the caller.

### 6.10 The Preload Script

The preload script constitutes the security boundary between the main process and the renderer process. It must use Electron's `contextBridge.exposeInMainWorld()` to selectively expose IPC capabilities to the renderer, never exposing raw Node.js APIs or the `ipcRenderer` object directly.

```typescript
import { contextBridge, ipcRenderer } from 'electron';

interface MyPluginAPI {
  performAction: (data: unknown) => Promise<unknown>;
  closeWindow: () => void;
  onUpdate: (callback: (data: unknown) => void) => () => void;
}

const myPluginAPI: MyPluginAPI = {
  performAction: (data) => ipcRenderer.invoke('my-plugin-action', data),

  closeWindow: () => ipcRenderer.send('my-plugin-close'),

  onUpdate: (callback) => {
    const handler = (_event: unknown, data: unknown) => callback(data);
    ipcRenderer.on('my-plugin-update', handler);
    // Return cleanup function to prevent listener accumulation
    return () => ipcRenderer.removeListener('my-plugin-update', handler);
  },
};

contextBridge.exposeInMainWorld('myPluginAPI', myPluginAPI);

declare global {
  interface Window { myPluginAPI: MyPluginAPI; }
}
```

The pattern of returning a cleanup function from event subscription methods is strongly recommended to prevent listener accumulation across activation cycles.

### 6.11 Event-Driven Communication

Plugins may monitor host application events by registering `ipcMain` listeners during the `initialize()` phase:

```typescript
import { ipcMain } from 'electron';

export class EventMonitor {
  public initialize(): void {
    ipcMain.on('start-capture-screen', () => this.onCaptureStart());
    ipcMain.on('stop-capture-screen', () => this.onCaptureStop());
  }

  private onCaptureStart(): void { /* respond to capture commencement */ }
  private onCaptureStop(): void { /* respond to capture cessation */ }

  public dispose(): void {
    ipcMain.removeAllListeners('start-capture-screen');
    ipcMain.removeAllListeners('stop-capture-screen');
  }
}
```

### 6.12 Timer and Interval Management

Plugins implementing periodic behaviour should encapsulate timer state within dedicated management classes to ensure correct disposal:

```typescript
export class Timer {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  public start(callback: () => void, interval: number): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(callback, interval);
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  public dispose(): void { this.stop(); }
}
```

### 6.13 Build Configuration

All plugin code is bundled using Webpack with `ts-loader` for TypeScript compilation. The target is `node`, and `electron` is listed as an external dependency to prevent bundling of Electron's runtime. The `libraryTarget` is set to `umd` for compatibility with the `PluginManager`'s dynamic loading mechanism.

The build pipeline produces two bundles: `index.bundle.js` (the main process entry point) and, where applicable, `preload.bundle.js` (the renderer bridge). Static assets—including the manifest, `package.json`, UI files, and media assets—are copied to the output directory by `CopyWebpackPlugin`. The Webpack configuration for a plugin with a window is as follows:

```javascript
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'index.ts'),
    preload: path.resolve(__dirname, 'preload.ts')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{ test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' }]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: '' },
        { from: 'package.json', to: '' },
        { from: 'ui', to: 'ui' },
        { from: 'assets', to: 'assets' }
      ]
    })
  ],
  resolve: { extensions: ['.ts', '.js'] },
  externals: ['electron'],
  target: 'node'
};
```

For distribution, the `build/` directory is compressed into a `build.zip` archive, which constitutes the distributable artefact for CDN or local installation.

### 6.14 Dependency Management

Plugins may handle their runtime dependencies through two mechanisms:

**Bundled Dependencies**: Node.js modules may be placed directly in a `node_modules/` or `native_modules/` subdirectory of the plugin package. The `PluginManager` automatically renames `native_modules/` to `node_modules/` during installation to accommodate native binary modules that cannot be bundled by Webpack.

**npm Strategy-Resolved Dependencies**: When a plugin is installed via the npm download strategy, its `package.json` `dependencies` are resolved and installed automatically at installation time, requiring no pre-bundling of dependency code.

### 6.15 Runtime Plugin Management

The following examples illustrate the programmatic management of plugins via the `PluginManager` API:

#### Installation from Various Sources

```typescript
const pluginManager = PluginManager.getInstance();

// From the npm registry
await pluginManager.downloadPlugin({
  contextType: PluginDownloadContextType.NPM,
  pkg: { name: '@my-scope/my-plugin', version: '1.0.0' },
  registry: { privateURL: 'https://my-registry.com', authToken: 'token' },
  marketplaceId: 'marketplace-id',
  versionId: 'version-id'
});

// From a CDN
await pluginManager.downloadPlugin({
  contextType: PluginDownloadContextType.CDN,
  url: 'https://cdn.example.com/plugin.zip',
  marketplaceId: 'marketplace-id',
  versionId: 'version-id'
});

// From a local file (presents a native file picker dialog)
await pluginManager.downloadPlugin({
  contextType: PluginDownloadContextType.LOCAL,
  marketplaceId: 'marketplace-id',
  versionId: 'version-id'
});
```

#### Lifecycle Operations

```typescript
// Activate a plugin by name
await pluginManager.activatePlugin('my-plugin');

// Deactivate a plugin
await pluginManager.deactivatePlugin('my-plugin');

// Update to a new version
await pluginManager.updatePlugin({
  name: 'my-plugin',
  version: '2.0.0',
  description: 'Updated description',
  versionId: 'new-version-id'
});

// Uninstall
await pluginManager.uninstallPlugin({ name: 'my-plugin' });

// Query installed plugins
const allPlugins = await pluginManager.getAllPlugins();
const plugin = await pluginManager.getOnePlugin('my-plugin');
const isInstalled = await pluginManager.checkInstallation('marketplace-id');
```

### 6.16 Publishing to the Marketplace

Publication proceeds through the following sequence:

1. **Build the distribution artefact**: Execute `npm run build` and compress the `build/` directory into a ZIP archive.
2. **Navigate to the upload dialog** within the Gauzy Desktop UI and select "Publish to Marketplace".
3. **Complete the multi-step form**: supply basic information, version details, at least one source descriptor, and optional subscription plan definitions.
4. **Submit**: the UI transmits the artefact with real-time progress reporting; upon success, the plugin becomes discoverable in the marketplace.

For npm-based publication:

```json
{
  "name": "@your-scope/my-plugin",
  "version": "1.0.0",
  "files": ["build/**/*"],
  "scripts": { "prepublishOnly": "npm run build" }
}
```

```bash
npm login
npm publish --access public
```

---

## 7. Security Considerations

### 7.1 Principle of Least Privilege

Plugin authors should expose only the minimum necessary IPC channels through the preload script, and should rigorously validate all data received from the renderer process before acting upon it. The renderer process should be treated as an untrusted execution environment, as it is susceptible to cross-site scripting attacks if it renders content sourced from external URLs.

### 7.2 Context Isolation

The `contextIsolation` Electron security option must never be disabled. This setting ensures that the `window` object exposed to renderer JavaScript is a distinct JavaScript context from that of the preload script, preventing renderer code from accessing Node.js globals through prototype chain manipulation. The security implications of disabling this option are severe and cannot be mitigated by other means.

### 7.3 IPC Channel Whitelisting

All data crossing the IPC boundary—in both directions—should be validated for type conformance and business rule compliance before processing. A whitelist approach to IPC channel names is advisable:

```typescript
const permittedChannels = ['my-plugin-action', 'my-plugin-query'];

const safeInvoke = (channel: string, ...args: unknown[]) => {
  if (permittedChannels.includes(channel)) {
    return ipcRenderer.invoke(channel, ...args);
  }
  throw new Error(`IPC channel '${channel}' is not permitted`);
};
```

Exposing the raw `ipcRenderer` object through the context bridge is explicitly prohibited, as doing so grants the renderer process unrestricted access to the IPC subsystem.

### 7.4 Manifest and Source Validation

The installation pipeline enforces manifest validity before completing installation. Plugin authors should verify that their `manifest.json` is well-formed JSON, that all required fields are present and correctly typed, and that the `main` field references a file that exists within the distribution artefact.

---

## 8. Performance Optimization

### 8.1 Lazy Window Instantiation

Plugin windows should be created on demand, within `onActivate()`, rather than during `onInitialize()`. Creating windows eagerly during initialisation imposes an immediate memory cost regardless of whether the user ever activates the plugin.

### 8.2 Debouncing and Throttling

IPC handlers that respond to rapidly emitted events—such as user input or periodic timer ticks—should apply debouncing or throttling to prevent main process overload. Similarly, UI components consuming high-frequency IPC notifications should apply appropriate rate limiting, as illustrated below:

```typescript
import { debounce } from 'lodash';

// Persist settings at most once per second, regardless of change frequency
const debouncedSave = debounce(() => {
  this.config.onSettingsChanged(this.config.settings);
}, 1000);
```

### 8.3 Resource Cleanup

All event listeners—both Electron IPC listeners (`ipcMain.on`, `ipcMain.handle`) and Node.js `EventEmitter` listeners—must be explicitly removed in `onDispose()`. Failure to do so will result in listener accumulation across activation cycles, ultimately causing memory leaks and potentially incorrect behaviour. The following pattern covers the principal resource categories subject to this constraint:

```typescript
public dispose(): void {
  this.timer?.stop();
  ipcMain.removeAllListeners('my-plugin-event');
  ipcMain.removeHandler('my-plugin-action');
  if (this.window && !this.window.isDestroyed()) {
    this.window.close();
  }
  this.window = null;
}
```

### 8.4 Web Workers for Computation

Computationally intensive operations—video processing, data analysis, encryption—should be offloaded to Web Workers within the renderer process, preventing UI thread blocking and maintaining interface responsiveness.

### 8.5 Asynchronous Main Process Operations

All blocking I/O and long-running computations within the main process should be executed asynchronously. Blocking the main process event loop degrades responsiveness across the entire application, not merely the plugin in question.

---

## 9. Troubleshooting and Diagnostics

### 9.1 Plugin Fails to Load

If a plugin does not appear in the installed plugins list after installation, the most common causes are: a malformed or missing `manifest.json`; an incorrect or absent `main` entry in the manifest; or a runtime error during module loading. The application console will typically contain the relevant error message.

Diagnostic steps:

```bash
# Validate manifest JSON structure
cat manifest.json | jq .

# Verify the compiled entry point exists
ls -la build/

# Confirm TypeScript compilation succeeds without errors
npx tsc --noEmit
```

### 9.2 IPC Communication Failures

If the renderer process cannot invoke an IPC handler, the following checklist should be consulted:

- The preload script path in the `BrowserWindow` configuration is correct and the file exists.
- The channel name in `ipcMain.handle()` exactly matches the channel name in `ipcRenderer.invoke()`.
- The API is correctly exposed via `contextBridge.exposeInMainWorld()`.
- `contextIsolation` has not been disabled.

Using Electron's DevTools in the renderer window (`webContents.openDevTools()`) is invaluable for diagnosing renderer-side failures.

### 9.3 Window Fails to Appear

When a plugin window does not appear upon activation, the following conditions should be verified: the window is created before `show()` is called; the `show: false` option in `BrowserWindow` is not being overridden elsewhere; the HTML file path resolves correctly relative to the compiled bundle; and no exceptions are thrown during window creation.

### 9.4 Build Failures

TypeScript compilation errors are the most common cause of build failures. Ensuring that `tsconfig.json` paths and `outDir` settings are consistent with the Webpack configuration will resolve the majority of build pipeline issues. Missing Webpack loaders or plugins should be diagnosed by inspecting the `webpack.config.js` against the installed `node_modules`. A clean rebuild resolves many transient issues:

```bash
rm -rf node_modules build
npm install
npm run build 2>&1 | tee build.log
```

### 9.5 Memory Leaks

Memory leaks in plugins commonly manifest as steadily increasing process memory consumption across repeated activation and deactivation cycles. The root cause is invariably one of the following: event listeners not removed in `dispose()`; timers not cleared; `BrowserWindow` instances not closed; or circular references preventing garbage collection. Strict adherence to the resource cleanup pattern described in Section 8.3 eliminates the majority of such issues.

### 9.6 Installation Source Failures

Failures during plugin installation from external sources may be diagnosed as follows:

- **CDN failures**: Verify that the URL is accessible over HTTPS, that the archive is a valid ZIP file, and that no active content security policy blocks the download.
- **npm failures**: Confirm that the registry is reachable, that the authentication token is valid, and that the package name and version exist.
- **Local file failures**: Confirm that the selected file is a valid ZIP archive and that the contained `manifest.json` passes validation.

---

## 10. Conclusion and Future Directions

The Ever Gauzy Desktop plugin system represents a thoughtfully architected extensibility framework that balances developer ergonomics with runtime security and operational robustness. The clear separation of the runtime, marketplace, and development layers enables independent evolution of each domain. The provision of three UI technology templates acknowledges the diversity of developer background and project requirements, while the shared plugin interface contract enforces consistent lifecycle semantics irrespective of UI technology choice.

Looking forward, several areas of architectural expansion present themselves as natural candidates for future development: plugin dependency management (presently absent as a runtime concern), sandbox-based isolation for enhanced security guarantees, hot module reloading for improved development iteration speed, a formal plugin permissions system governing access to host application capabilities, and resource usage monitoring to detect and mitigate runaway plugin behaviour. These enhancements, when realised, would further close the gap between the current plugin system and the capabilities expected of mature, enterprise-grade extension platforms.

Developers embarking on plugin authorship are advised to begin with the HTML template for prototyping purposes, graduating to the React or Angular templates as interface complexity warrants, and to consult the reference implementations—`plugin-pomodoro-timer` for a minimal example and `plugin-continues-video-capture` for a comprehensive one—as authoritative guides to idiomatic plugin construction within the Ever Gauzy ecosystem.

---

## Appendix A: Quick Reference

### Plugin Lifecycle Methods

| Method | Phase | Purpose |
|--------|-------|--------|
| `onInitialize()` | Startup | Register listeners, set up monitoring |
| `onActivate()` | Activation | Create windows, start services |
| `onDeactivate()` | Deactivation | Hide windows, pause services |
| `onDispose()` | Shutdown | Release all resources |

### Template Comparison

| Template | Bundle Size | Best For |
|----------|-------------|----------|
| HTML/CSS/JS | ~60 KB | Simple plugins, rapid prototyping |
| React | ~200 KB | Medium complexity, component reusability |
| Angular | ~350 KB | Complex applications, enterprise requirements |

### Download Context Types

| Type | Use Case |
|------|----------|
| `PluginDownloadContextType.CDN` | HTTPS ZIP archive from a CDN endpoint |
| `PluginDownloadContextType.LOCAL` | Local filesystem ZIP (development and enterprise) |
| `PluginDownloadContextType.NPM` | npm package registry (public or private) |

### IPC Channel Naming Convention

All plugin IPC channels should be prefixed with the plugin's unique identifier to prevent collisions with the host application or other plugins: `plugin-name::channel-action`.

### Common IPC Patterns

```typescript
// Main process → Renderer process (one-way push)
window.webContents.send('my-plugin::update', data);

// Renderer → Main (fire-and-forget)
ipcRenderer.send('my-plugin::notify', data);

// Renderer → Main (request/response)
const result = await ipcRenderer.invoke('my-plugin::action', data);

// Main process handler
ipcMain.handle('my-plugin::action', async (event, data) => {
  return { result: 'response' };
});
```

### Distribution Checklist

- [ ] `manifest.json` present and valid
- [ ] `main` field references a compiled bundle
- [ ] All IPC handlers removed in `onDispose()`
- [ ] Settings validated before persistence
- [ ] No raw Node.js APIs exposed to the renderer process
- [ ] `contextIsolation` enabled and not overridden
- [ ] Build artefacts packaged as `build.zip`
- [ ] Semantic version follows the `MAJOR.MINOR.PATCH` convention

### Essential Files Reference

| File | Purpose | Required |
|------|---------|----------|
| `manifest.json` | Plugin identity and entry point declaration | Yes |
| `index.ts` | Main process entry point | Yes |
| `package.json` | npm package configuration | Yes |
| `webpack.config.js` | Build pipeline configuration | Yes |
| `tsconfig.json` | TypeScript compiler configuration | Yes |
| `preload.ts` | Main-to-renderer IPC bridge | If using a window |
| `ui/index.html` | Renderer process UI document | If using a window |

### Additional Resources

- **Electron Documentation**: [https://www.electronjs.org/docs](https://www.electronjs.org/docs)
- **TypeScript Handbook**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **Webpack Documentation**: [https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)
- **Akita State Management**: [https://opensource.salesforce.com/akita/](https://opensource.salesforce.com/akita/)
- **GitHub Issues**: [https://github.com/ever-co/ever-gauzy/issues](https://github.com/ever-co/ever-gauzy/issues)
- **Discussions**: [https://github.com/ever-co/ever-gauzy/discussions](https://github.com/ever-co/ever-gauzy/discussions)

---

*Ever Co. — Plugin System Technical Documentation*
*Document Version 1.0 — March 2026*
