---
sidebar_position: 4
---

# Marketplace & Distribution Infrastructure

The marketplace infrastructure provides the commercial and logistical framework for plugin publication, discovery, acquisition, and maintenance.

## Overview

From a technical standpoint, the marketplace comprises a server-side registry of plugin artifacts and metadata, a subscription and billing management system, and a client-side service layer that bridges the Angular UI with both the server API and the Electron main process.

## The PluginService

The `PluginService` is the primary HTTP client for marketplace operations, addressing the API endpoint `${API_PREFIX}/plugins`. It supports streaming progress for both upload and download operations.

| Method                                       | Description                                                  |
| -------------------------------------------- | ------------------------------------------------------------ |
| `getAll(params)`                             | Retrieve a paginated list of marketplace plugins             |
| `getOne(id, params)`                         | Fetch complete metadata for a single plugin                  |
| `search(params)`                             | Perform keyword and facet-based search                       |
| `upload(plugin)`                             | Publish a new plugin artifact with progress events           |
| `update(pluginId, plugin)`                   | Modify an existing plugin record                             |
| `delete(id)`                                 | Remove a plugin from the marketplace                         |
| `install({ pluginId, versionId })`           | Record a plugin installation against the caller's account    |
| `uninstall(pluginId, installationId)`        | Notify the server of a plugin uninstallation                 |
| `activate(pluginId, installationId)`         | Record a plugin activation event                             |
| `deactivate(pluginId, installationId)`       | Record a plugin deactivation event                           |
| `addVersion(pluginId, version)`              | Publish a new version of an existing plugin                  |
| `getVersions(pluginId, params)`              | Retrieve the version history for a plugin                    |
| `addSources(pluginId, versionId, sources)`   | Attach platform-specific distribution artifacts to a version |
| `verify({ pluginId, versionId, signature })` | Validate the cryptographic integrity of a plugin artifact    |

## Plugin Sources and Platform Targeting

The marketplace supports three source type designations for plugin artifacts:

### Gauzy (Hosted Upload)

```typescript
{
  type: PluginSourceType.GAUZY,
  file: File,                    // ZIP archive
  operatingSystem: PluginOSType, // WINDOWS, MACOS, LINUX, ALL
  architecture: PluginOSArch     // X64, ARM64, X86, ALL
}
```

### CDN-Referenced Artifact

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

### npm Package

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

This tripartite source model enables a single published plugin version to provide native binary optimizations for Windows (x64), macOS (arm64), and Linux (x64) from a single catalog entry.

## The PluginElectronService

The `PluginElectronService` bridges the Angular renderer process and the Electron main process for desktop-specific operations. It translates high-level UI intents into IPC invocations and exposes an `isDesktop` guard for conditionally rendering desktop-exclusive features.

IPC channels include: retrieving all installed plugins, activating/deactivating individual plugins, initiating download-and-install sequences, reporting installation progress, and querying OS information for platform-appropriate download selection.

## The Subscription System

The marketplace incorporates a comprehensive subscription management subsystem. The `PluginSubscriptionService` covers:

- **Subscription lifecycle**: creation, update, cancellation, upgrade, and downgrade operations
- **Plan management**: bulk creation of subscription plans, plugin-specific plan retrieval, and plan comparison utilities
- **Billing operations**: retrieval of billing history, invoice download, payment retry, and refund processing
- **Analytics**: subscription metrics and usage analytics at both the plugin and individual subscription levels
- **Promotional utilities**: promo code validation and subscription preview generation

### Subscription Plan Types

| Type       | Description                  |
| ---------- | ---------------------------- |
| FREE       | No-cost access               |
| TRIAL      | Time-limited free access     |
| BASIC      | Entry-level paid plan        |
| PREMIUM    | Mid-tier plan                |
| ENTERPRISE | Full-feature enterprise plan |
| CUSTOM     | Custom negotiated plan       |

### Billing Periods

Plans support billing periods from DAILY through ONE_TIME, with statuses including ACTIVE, TRIAL, CANCELLED, EXPIRED, PAST_DUE, SUSPENDED, and PENDING.

### Publishing a New Version

```typescript
this.pluginService
  .addVersion(pluginId, {
    number: "1.1.0",
    changelog: "Bug fixes and performance improvements",
    releaseDate: new Date(),
    sources: [
      /* platform-specific source descriptors */
    ],
  })
  .subscribe();
```
