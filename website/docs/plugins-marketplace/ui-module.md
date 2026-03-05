---
sidebar_position: 5
---

# Plugin UI Module

The plugin management UI is an Angular 18+ module providing end users with marketplace discovery, plugin installation, configuration, and lifecycle management.

## Technology Stack

- **Angular** with standalone components and `OnPush` change detection strategy
- **Akita** for predictable, entity-oriented state management
- **`@ngneat/effects` and `@ngneat/effects-ng`** for declarative side effect management
- **Nebular** as the primary UI component library
- **Angular2SmartTable** for tabular data presentation
- **RxJS** for reactive data flow composition

## Module Structure

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

## Routing Topology

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

## State Management

Three primary Akita stores govern the UI state:

### PluginStore

Manages the collection of locally installed plugins and their activation states, along with in-progress flags that drive loading indicators.

### PluginMarketplaceStore

```typescript
export interface PluginMarketplaceState {
  plugins: IPlugin[];
  count: number;
  filters: IPluginFilter;
  appliedFilters: IPluginFilter;
  viewMode: "grid" | "list";
  showAdvancedFilters: boolean;
  loading: boolean;
}
```

### PluginSubscriptionStore

Holds the current user's subscription collection and the active subscription being managed.

### Effects Pattern

```typescript
export const PluginMarketplaceEffects = {
  getAll$: createEffect((actions$) =>
    actions$.pipe(
      ofType(PluginMarketplaceActions.getAll),
      switchMap(({ params }) =>
        this.pluginService.getAll(params).pipe(
          map(({ items, total }) =>
            PluginMarketplaceActions.getAllSuccess({
              plugins: items,
              count: total,
            }),
          ),
        ),
      ),
    ),
  ),
};
```

## Principal UI Components

| Component                            | Description                                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| **PluginLayoutComponent**            | Top-level navigation with tab-based access to marketplace and installed plugins               |
| **PluginMarketplaceComponent**       | Full marketplace browsing with grid/list modes, multi-criteria filtering, and infinite scroll |
| **PluginListComponent**              | Installed plugins as a sortable, paginated smart table with inline activation toggling        |
| **PluginMarketplaceDetailComponent** | Tabbed deep-dive: overview, access control, configuration, subscriptions, and analytics       |

## Dynamic Component Loading

The `PluginLoaderService` enables dynamic loading of Angular components exported by installed plugins at runtime. It handles standalone and NgModule-based components uniformly, with graceful degradation through a fallback component.

## Supporting Services

| Service                           | Responsibility                                                |
| --------------------------------- | ------------------------------------------------------------- |
| `PluginCategoryService`           | Manage taxonomic categories for marketplace classification    |
| `PluginTagsService`               | Manage keyword-based tag associations                         |
| `PluginAnalyticsService`          | Track and expose usage metrics and download statistics        |
| `PluginLoaderService`             | Dynamically instantiate plugin-contributed Angular components |
| `PluginEnvironmentService`        | Resolve environment-specific configuration parameters         |
| `PluginSettingsService`           | Persist and retrieve per-plugin configuration data            |
| `PluginUserAssignmentService`     | Manage per-user plugin access assignments                     |
| `PluginSubscriptionAccessService` | Enforce subscription-tier access gates                        |
| `UserSubscribedPluginsService`    | Aggregate the current user's active subscriptions             |
| `PluginSecurityService`           | Govern permissions, API keys, and security scan orchestration |

### Security Service Operations

```typescript
getPluginSecurity(pluginId); // Retrieve security configuration
getPluginPermissions(pluginId); // Retrieve declared permissions
createPermission(permission); // Grant a new permission
getApiKeys(pluginId); // Retrieve API key inventory
createApiKey(pluginId, name, permissions); // Provision a scoped API key
initiateScan(pluginId, config); // Launch an asynchronous security scan
getComplianceStatus(pluginId); // Retrieve compliance assessment results
```

## Publication Workflow

Developers publishing a plugin complete a multi-step form:

1. **Basic Information**: Display name, description, type, status, category, author, license, and URLs
2. **Version Information**: Semantic version, changelog (min. 10 chars), release date, and source descriptors
3. **Platform-Specific Sources**: One or more source descriptors targeting specific OS and architecture combinations
4. **Subscription Plans** (conditional): Pricing, billing period, feature entitlements, and trial parameters
