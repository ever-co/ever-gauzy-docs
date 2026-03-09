---
sidebar_position: 3
---

# Plugin Definitions

Every UI plugin is described by a `PluginUiDefinition` — a configuration object that declares routes, navigation items, extensions, translations, and lifecycle behavior.

## Definition Types

There are two main approaches: **object literal** (most common for module-based plugins) and **`defineDeclarativePlugin()`** (for plugins that don't need an Angular module).

### Module-Based Plugin (Object Literal)

The most common pattern in the codebase. Used by Upwork, Job Search, Job Proposal, and other plugins:

```typescript
import { PluginUiDefinition } from '@gauzy/plugin-ui';
import { PermissionsEnum } from '@gauzy/contracts';
import { MyPluginModule } from './my-plugin.module';
import { MY_PLUGIN_PAGE_ROUTE } from './my-page-route';

export const MyPlugin: PluginUiDefinition = {
  id: 'my-plugin',
  version: '1.0.0',
  location: 'pages',
  module: MyPluginModule,
  permissionKeys: [PermissionsEnum.ADMIN_DASHBOARD_VIEW],
  routes: [MY_PLUGIN_PAGE_ROUTE as PluginRouteInput]
};
```

Real example — `JobSearchPlugin`:

```typescript
export const JobSearchPlugin: PluginUiDefinition = {
  id: 'job-search',
  version: '1.0.0',
  location: 'jobs-sections',
  module: JobSearchModule,
  permissionKeys: [PermissionsEnum.ORG_JOB_SEARCH],
  routes: [JOB_SEARCH_PAGE_ROUTE as PluginRouteInput]
};
```

The module class can implement lifecycle hooks:

```typescript
@NgModule({
  providers: [MyPluginService]
})
export class MyPluginModule implements IOnPluginUiBootstrap, IOnPluginUiDestroy {
  private readonly service = inject(MyPluginService);

  ngOnPluginBootstrap() {
    this.service.initialize();
  }

  ngOnPluginDestroy() {
    this.service.cleanup();
  }
}
```

### Declarative Plugin (No Angular Module)

Used when your plugin doesn't need Angular DI — ideal for React-based plugins or simple contributions. Uses the `defineDeclarativePlugin()` helper:

```typescript
import { defineDeclarativePlugin } from '@gauzy/plugin-ui';

export const MyPlugin = defineDeclarativePlugin('my-plugin', {
  version: '1.0.0',
  location: 'page-sections',
  routes: [MY_ROUTE as any],
  translationNamespace: 'MY_PLUGIN',
  translations: { en: { MY_PLUGIN: { TITLE: 'My Feature' } } },
  tabs: [/* ... */],
  extensions: [/* ... */]
});
```

Real example — `DashboardTimeTrackReactUiPlugin`:

```typescript
export const DashboardTimeTrackReactUiPlugin = defineDeclarativePlugin(
  'dashboard-time-track-react-ui', {
    version: '1.0.0',
    location: 'page-sections',
    routes: [DASHBOARD_TIME_TRACK_ROUTE as PluginRouteInput],
    translationNamespace: 'REACT_UI',
    translations: { en },
    settings: {
      title: 'React Dashboard Widgets',
      description: 'Configure which widgets are visible.',
      category: 'dashboard',
      fields: [
        { key: 'showMembersWorked', type: 'boolean', label: 'Show Members Worked', defaultValue: true, order: 1 },
        { key: 'showProjectsWorked', type: 'boolean', label: 'Show Projects Worked', defaultValue: true, order: 2 },
        { key: 'refreshInterval', type: 'number', label: 'Auto-refresh (seconds)',
          defaultValue: 300, validation: { min: 0, max: 3600 }, order: 7 }
      ]
    },
    tabs: [{
      tabsetId: 'dashboard-page',
      tabId: 'react-time-tracking',
      tabsetType: 'route',
      path: '/pages/dashboard/react-time-tracking',
      tabTitle: (_i18n) => _i18n.getTranslation('REACT_UI.DASHBOARD_PAGE.TABS.REACT_TIME_TRACKING'),
      tabIcon: 'code-outline',
      responsive: true,
      order: 4,
      permissions: [PermissionsEnum.ADMIN_DASHBOARD_VIEW, PermissionsEnum.TIME_TRACKING_DASHBOARD]
    }]
  }
);
```

### Lazy-Loaded Module

For large plugins that should only load when needed:

```typescript
export const MyPlugin = definePlugin(
  'my-plugin',
  () => import('./my-plugin.module').then(m => m.MyPluginModule),
  { location: 'pages' }
);
```

The module is loaded lazily when the plugin is first activated.

### Plugin Group (Parent-Child)

A parent plugin that contains child plugins. The parent defines navigation and feature gating, while children contribute their own routes and modules.

Real example — `JobsPlugin`:

```typescript
// Extend PluginUiDefinition with an .init() method for customization
export interface JobsPluginDefinition extends PluginUiDefinition {
  init(opts: { plugins: PluginUiDefinition[] }): PluginUiDefinition;
}

export const JobsPlugin: JobsPluginDefinition = {
  id: 'jobs',
  version: '1.0.0',
  location: 'jobs-sections',
  module: JobsModule,
  routes: [JOBS_PAGE_ROUTE as PluginRouteInput],
  navMenu: [{
    type: 'config' as const,
    config: {
      id: 'jobs',
      title: 'Jobs',
      icon: 'fas fa-briefcase',
      link: '/pages/jobs',
      data: {
        translationKey: 'MENU.JOBS',
        featureKey: FeatureEnum.FEATURE_JOB
      },
      items: []
    },
    before: 'employees'
  }],
  featureKey: FeatureEnum.FEATURE_JOB,
  plugins: [], // Default: empty or DEFAULT_JOBS_PLUGINS

  // .init() lets the consumer choose which child plugins to include
  init(opts: { plugins: PluginUiDefinition[] }): PluginUiDefinition {
    return { ...JobsPlugin, plugins: opts.plugins };
  }
};
```

Usage in `plugin-ui.config.ts`:

```typescript
JobsPlugin.init({
  plugins: [
    JobProposalPlugin,
    JobEmployeePlugin,
    JobSearchPlugin,
    JobMatchingPlugin,
    JobProposalTemplatePlugin
  ]
})
```

This pattern lets each deployment customize which child plugins are active.

## PluginUiDefinition Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique plugin identifier (required) |
| `module` | `Type<any>` | Angular module class |
| `loadModule` | `() => Promise<Type<any>>` | Lazy module loader |
| `bootstrap` | `(injector: Injector) => void \| Promise<void>` | Custom bootstrap function |
| `location` | `string` | Route location (see [Locations](#plugin-locations) below) |
| `plugins` | `PluginUiDefinition[]` | Child plugins (for groups) |
| `options` | `Record<string, unknown>` | Plugin configuration options |
| `routes` | `PluginRouteInput[]` | Routes to register |
| `navMenu` | `PluginNavContribution[]` | Navigation menu items |
| `tabs` | `PluginTabInput[]` | Tab contributions (see [Tab Types](#tab-types) below) |
| `extensions` | `PageExtensionDefinition[]` | Extension slot contributions |
| `featureKey` | `unknown` | Feature flag for conditional activation |
| `permissionKeys` | `unknown[]` | Required permissions to activate |
| `dependsOn` | `string[]` | Plugin IDs this plugin depends on |
| `translations` | `Record<string, Record<string, any>>` | i18n translation maps by language |
| `translationNamespace` | `string` | Namespace prefix for translations |
| `settings` | `PluginSettingsSchema` | Plugin settings schema |
| `version` | `string` | Semver version string |
| `peerPlugins` | `Record<string, string>` | Required peer plugins with version ranges |
| `loadStrategy` | `'eager' \| 'lazy' \| 'preload'` | When to load the plugin (see below) |

### Plugin Locations

The `location` field determines where a plugin's routes are mounted in the app routing hierarchy:

| Location | Mounts Under | Used By |
|----------|-------------|---------|
| `page-sections` | `/pages/` (top-level) | JobsPlugin (parent) |
| `dashboard-sections` | `/pages/dashboard/` | DashboardTimeTrackReactUiPlugin |
| `jobs-sections` | `/pages/jobs/` | JobEmployee, JobSearch, JobMatching, JobProposalTemplate |
| `sales-sections` | `/pages/sales/` | JobProposalPlugin |
| `integrations-sections` | `/pages/integrations/` | IntegrationUpworkPlugin |
| `employees-sections` | `/pages/employees/` | Employee-related plugins |
| `accounting-sections` | `/pages/accounting/` | Accounting plugins |
| `organization-sections` | `/pages/organization/` | Org settings plugins |
| `reports-sections` | `/pages/reports/` | Report plugins |
| `goals-sections` | `/pages/goals/` | Goal-related plugins |

### Tab Types

The `tabs[].tabsetType` field controls how the tab switches content:

| Value | Behavior |
|-------|----------|
| `'route'` | URL-based tab switching (navigates to a route) |
| `'standard'` | In-page tab switching (Nebular NbTabset) |

### Load Strategy

| Value | Behavior |
|-------|----------|
| `'eager'` (default) | Loaded during application bootstrap |
| `'lazy'` | Loaded on first use (e.g., when route is navigated to) |
| `'preload'` | Loaded in the background after bootstrap completes |

## Lifecycle Hooks

Module-based plugins can implement these interfaces:

| Interface | Method | When Called |
|-----------|--------|------------|
| `IOnPluginUiBootstrap` | `ngOnPluginBootstrap()` | After plugin instantiation |
| `IOnPluginUiDestroy` | `ngOnPluginDestroy()` | Before plugin teardown |
| `IOnPluginAfterBootstrap` | `ngOnPluginAfterBootstrap()` | After all plugins bootstrapped |
| `IOnPluginBeforeDestroy` | `ngOnPluginBeforeDestroy()` | Preparatory cleanup |
| `IOnPluginBeforeRouteActivate` | `ngOnPluginBeforeRouteActivate()` | Route guard hook |
| `IOnPluginConfigChange` | `ngOnPluginConfigChange()` | Config reload (future) |

### Bootstrap Order

1. Plugin definitions are collected from `plugin-ui.config.ts`
2. Dependencies are validated (`validatePluginDependencies()`)
3. Version compatibility is checked (`checkVersionCompatibility()`)
4. Plugins are ordered by dependency graph
5. Each plugin's module is instantiated (or `bootstrap()` is called for declarative)
6. `ngOnPluginBootstrap()` is called in dependency order
7. Declarative registrations (routes, nav, tabs) are applied
8. `ngOnPluginAfterBootstrap()` is called for all plugins

## Dependency Management

Declare dependencies with `dependsOn`:

```typescript
export const MyPlugin = defineDeclarativePlugin('my-plugin', {
  dependsOn: ['core-plugin', 'auth-plugin'],
  // ...
});
```

The system validates:
- All declared dependencies exist in the plugin config
- No circular dependencies
- Correct bootstrap ordering

### Version Constraints

Use `peerPlugins` to require specific versions:

```typescript
export const MyPlugin = defineDeclarativePlugin('my-plugin', {
  version: '1.2.0',
  peerPlugins: {
    'core-plugin': '>=1.0.0',
    'data-plugin': '^2.0.0'
  }
});
```

## Conditional Activation

### Feature Flags

```typescript
export const MyPlugin = defineDeclarativePlugin('my-plugin', {
  featureKey: 'FEATURE_MY_PLUGIN'
});
```

The plugin is only bootstrapped when the feature is enabled.

### Permission Guards

```typescript
export const MyPlugin = defineDeclarativePlugin('my-plugin', {
  permissionKeys: ['ADMIN_DASHBOARD_VIEW', 'PLUGIN_MANAGE']
});
```

### Custom Activation Predicate

Provide a `PLUGIN_ACTIVATION_PREDICATE` token for complex activation logic:

```typescript
{
  provide: PLUGIN_ACTIVATION_PREDICATE,
  useValue: (definition: PluginUiDefinition) => {
    // Custom logic to decide if plugin should be activated
    return definition.featureKey ? isFeatureEnabled(definition.featureKey) : true;
  }
}
```

## How `defineDeclarativePlugin()` Works Internally

When you call `defineDeclarativePlugin()`, it auto-generates a `bootstrap` callback that does the following:

1. **Merges translations** — For each available language, plugin translations are merged into the host's translation store via `setTranslation(lang, data, true)`
2. **Applies namespace isolation** — `filterNewTranslationKeys()` prevents overriding existing core translations
3. **Subscribes to language changes** — `onLangChange` re-merges translations when the user switches language
4. **Registers settings schema** — If `settings` is provided, it's stored in `PluginSettingsRegistryService`
5. **Calls `applyDeclarativeRegistrations()`** — Registers routes, nav items, tabs, and extensions with the host

This means a declarative plugin is fully functional without any Angular module — the helper wires everything up.

### `applyDeclarativeRegistrations()`

This function takes a plugin definition and registers all its contributions with the host services:

```typescript
applyDeclarativeRegistrations(definition, {
  navBuilder,           // IDeclarativeNavBuilder — registers navMenu items
  pageRouteRegistry,    // IDeclarativePageRouteRegistry — registers routes
  pageTabRegistry,      // IDeclarativePageTabRegistry — registers tabs
  pageExtensionRegistry // PageExtensionRegistryService — registers extensions
});
```

It processes:
- `definition.routes` → `pageRouteRegistry.registerPageRoute()` for each route
- `definition.navMenu` → `navBuilder.addNavMenuItem()` for each nav item
- `definition.tabs` → `pageTabRegistry.registerPageTab()` for each tab (mapping `path` to `route`)
- `definition.extensions` → `pageExtensionRegistry.register()` for each extension

You can call this function manually in module-based plugins if you want to combine an NgModule with declarative registrations:

```typescript
@NgModule({ providers: [MyService] })
export class MyPluginModule implements IOnPluginUiBootstrap {
  private readonly definition = inject(PLUGIN_DEFINITION);

  ngOnPluginBootstrap() {
    // Register declarative contributions after module setup
    applyDeclarativeRegistrations(this.definition, { /* services */ });
  }
}
```

## Related Pages

- [Getting Started](./getting-started) — create your first plugin
- [Extension Slots](./extension-slots) — contribute UI components to slots
- [Advanced Features](./advanced-features) — dynamic loading and dependency graphs
