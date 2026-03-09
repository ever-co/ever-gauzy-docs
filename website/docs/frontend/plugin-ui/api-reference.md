---
sidebar_position: 8
---

# API Reference

Complete reference of types, injection tokens, interfaces, and helper functions exported by the Plugin UI packages.

## @gauzy/plugin-ui

### Core Types

#### PluginUiDefinition

The main configuration object for a UI plugin.

```typescript
interface PluginUiDefinition {
  id: string;
  module?: Type<any>;
  loadModule?: () => Promise<Type<any>>;
  bootstrap?: (injector: Injector) => void | Promise<void>;
  location?: string;
  plugins?: PluginUiDefinition[];
  options?: Record<string, unknown>;
  routes?: PluginRouteInput[];
  navMenu?: PluginNavContribution[];
  featureKey?: unknown;
  permissionKeys?: unknown[];
  dependsOn?: string[];
  extensions?: PageExtensionDefinition[];
  tabs?: PluginTabInput[];
  translations?: Record<string, Record<string, any>>;
  translationNamespace?: string;
  settings?: PluginSettingsSchema;
  version?: string;
  peerPlugins?: Record<string, string>;
  loadStrategy?: 'eager' | 'lazy' | 'preload';
}
```

#### PluginUiConfig

Application-level plugin configuration.

```typescript
interface PluginUiConfig {
  defaultLanguage: string;
  defaultLocale: string;
  fallbackLocale?: string;
  availableLanguages: string[];
  availableLocales: string[];
  startWeekOn?: DayOfWeek;
  plugins: PluginUiDefinition[];
}
```

#### PageExtensionDefinition

Describes a UI extension contributed to an extension slot.

```typescript
interface PageExtensionDefinition {
  id: string;
  slotId: string;
  component?: Type<any>;
  loadComponent?: () => Promise<Type<any>>;
  order?: number;
  title?: string;
  description?: string;
  pluginId?: string;
  hidden?: boolean;
  visible?: (context: ExtensionVisibilityContext) => boolean | Promise<boolean>;
  permissions?: string[];
  permissionsAny?: string[];
  featureKey?: string;
  wrapper?: ExtensionWrapperConfig;
  lifecycle?: ExtensionLifecycleHooks;
  metadata?: ExtensionMetadata;
}
```

#### DayOfWeek

```typescript
enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}
```

#### PluginUiServices

Passed to `PluginUiModule.init()` to bridge the plugin system to the host application:

```typescript
interface PluginUiServices {
  navBuilder?: Type<IDeclarativeNavBuilder>;
  routeRegistry?: Type<IDeclarativePageRouteRegistry>;
  tabRegistry?: Type<IDeclarativePageTabRegistry>;
  translateService?: Type<IPluginTranslateService>;
  permissionChecker?: Type<IPluginPermissionChecker>;
  featureChecker?: Type<IPluginFeatureChecker>;
}
```

All fields are optional. Values are **Angular type references** (classes), not instances.

### Injection Tokens

| Token | Type | Description |
|-------|------|-------------|
| `PLUGIN_UI_CONFIG` | `PluginUiConfig` | The full plugin configuration |
| `PLUGIN_OPTIONS` | `Record<string, unknown>` | Per-plugin options (in plugin's child injector) |
| `PLUGIN_DEFINITION` | `PluginUiDefinition` | The plugin's own definition (in plugin's child injector) |
| `PLUGIN_ACTIVATION_PREDICATE` | `(def: PluginUiDefinition) => boolean` | Custom activation filter |
| `PLUGIN_NAV_BUILDER` | `IDeclarativeNavBuilder` | Navigation menu builder |
| `PLUGIN_ROUTE_REGISTRY` | `IDeclarativePageRouteRegistry` | Route registry |
| `PLUGIN_TAB_REGISTRY` | `IDeclarativePageTabRegistry` | Tab registry |
| `PLUGIN_TRANSLATE_SERVICE` | `IPluginTranslateService` | Translation service |
| `PLUGIN_TRANSLATE_DELEGATE` | `TranslateService` | Backing @ngx-translate/core service |
| `PLUGIN_TRANSLATE_STORE_DELEGATE` | `TranslateStore` | Backing @ngx-translate/core store |
| `PLUGIN_APP_STORE` | `IPluginAppStore` | Backing application store (permissions/features) |
| `PLUGIN_PERMISSION_CHECKER` | `IPluginPermissionChecker` | Permission checker |
| `PLUGIN_FEATURE_CHECKER` | `IPluginFeatureChecker` | Feature flag checker |

### Service Interfaces

#### IPluginPermissionChecker

```typescript
interface IPluginPermissionChecker {
  hasAllPermissions(...permissions: string[]): boolean;
}
```

#### IPluginFeatureChecker

```typescript
interface IPluginFeatureChecker {
  isFeatureEnabled(featureKey: string): boolean;
}
```

#### IPluginTranslateService

```typescript
interface IPluginTranslateService {
  instant(key: string, params?: Record<string, any>): string;
  get(key: string, params?: Record<string, any>): Observable<string>;
  onLangChange: EventEmitter<{ lang: string }>;
  currentLang: string;
  setTranslation(lang: string, translations: Record<string, any>, shouldMerge?: boolean): void;
}
```

#### IDeclarativeNavBuilder

```typescript
interface IDeclarativeNavBuilder {
  addNavMenuItem(item: PluginNavItemInput, sectionId?: string): void;
  removeNavMenuItem(itemId: string): void;
}
```

#### IDeclarativePageRouteRegistry

```typescript
interface IDeclarativePageRouteRegistry {
  registerPageRoute(route: PluginRouteInput): void;
}
```

#### IDeclarativePageTabRegistry

```typescript
interface IDeclarativePageTabRegistry {
  registerPageTab(tab: PluginTabInput): void;
}
```

### Lifecycle Interfaces

```typescript
interface IOnPluginUiBootstrap {
  ngOnPluginBootstrap(): void | Promise<void>;
}

interface IOnPluginUiDestroy {
  ngOnPluginDestroy(): void | Promise<void>;
}

interface IOnPluginAfterBootstrap {
  ngOnPluginAfterBootstrap(): void | Promise<void>;
}

interface IOnPluginBeforeDestroy {
  ngOnPluginBeforeDestroy(): void | Promise<void>;
}

interface IOnPluginBeforeRouteActivate {
  ngOnPluginBeforeRouteActivate(): boolean | Promise<boolean>;
}

interface IOnPluginConfigChange {
  ngOnPluginConfigChange(config: Record<string, unknown>): void;
}
```

### Helper Functions

#### Plugin Definition

| Function | Signature | Description |
|----------|-----------|-------------|
| `defineDeclarativePlugin` | `(id: string, config: Partial<PluginUiDefinition>) => PluginUiDefinition` | Create a declarative plugin (auto-generates bootstrap callback) |
| `definePlugin` | `(id: string, module: Type \| LazyLoader, options?) => PluginUiDefinition` | Create a module-based plugin (smart loader detection via `typeof fn === 'function' && !fn.prototype`) |
| `definePluginGroup` | `(id: string, module: Type, options: { plugins, ... }) => PluginUiDefinition` | Create a plugin group with `.init()` method |
| `applyDeclarativeRegistrations` | `(def: PluginUiDefinition, services: { navBuilder?, pageRouteRegistry?, pageTabRegistry?, pageExtensionRegistry? }) => void` | Register routes, nav, tabs, and extensions from a definition |
| `getUIPluginModules` | `(defs: PluginUiDefinition[]) => Type<any>[]` | Extract Angular modules from definitions |
| `getUIPluginModulesWithDefinitions` | `(defs: PluginUiDefinition[]) => { module, definition }[]` | Extract modules paired with definitions |

#### Plugin Utilities

| Function | Signature | Description |
|----------|-----------|-------------|
| `orderPluginsByDependencies` | `(defs: PluginUiDefinition[]) => PluginUiDefinition[]` | Topological sort by dependencies |
| `flattenPlugins` | `(defs: PluginUiDefinition[]) => PluginUiDefinition[]` | Flatten nested plugin groups |
| `collectPluginIds` | `(defs: PluginUiDefinition[]) => Set<string>` | Collect all plugin IDs |
| `isPluginActive` | `(def: PluginUiDefinition) => boolean` | Check activation status |
| `getPluginsByLocation` | `(defs: PluginUiDefinition[], location: string) => PluginUiDefinition[]` | Filter by location |
| `getPluginDefinition` | `(defs: PluginUiDefinition[], id: string) => PluginUiDefinition \| undefined` | Find by ID |

#### Config Management

| Function | Signature | Description |
|----------|-----------|-------------|
| `getPluginUiConfig` | `() => PluginUiConfig` | Get current config |
| `setPluginUiConfig` | `(config: PluginUiConfig) => void` | Set config |
| `resetPluginUiConfig` | `() => void` | Reset to defaults |

#### Dependency Validation

| Function | Signature | Description |
|----------|-----------|-------------|
| `validatePluginDependencies` | `(defs: PluginUiDefinition[]) => ValidationResult` | Validate dependency graph |
| `logDependencyValidation` | `(result: ValidationResult) => void` | Log validation results |
| `checkVersionCompatibility` | `(defs: PluginUiDefinition[]) => CompatResult` | Check peer version ranges |

#### i18n

| Function | Signature | Description |
|----------|-----------|-------------|
| `namespaceTranslations` | `(ns: string, translations: object) => object` | Wrap translations in namespace |
| `filterNewTranslationKeys` | `(existing: object, incoming: object) => object` | Strip existing keys |

#### Events

| Function | Signature | Description |
|----------|-----------|-------------|
| `definePluginEvent<T>` | `(pluginId: string, eventName: string) => PluginEventContract<T>` | Define a typed event |
| `bindEventToBus` | `(contract: PluginEventContract<T>, bus: PluginEventBusService) => TypedEventHandle<T>` | Bind event to bus |

### Services

| Service | Description |
|---------|-------------|
| `PluginUiRegistryService` | Central plugin registry |
| `PageExtensionRegistryService` | Extension slot registry |
| `PluginEventBusService` | Cross-plugin event bus |
| `PluginEventSchemaRegistry` | Event schema documentation |
| `PluginSettingsRegistryService` | Plugin settings storage |
| `PluginServiceRegistryService` | Cross-plugin service registry |
| `PluginHealthService` | Boot time and error monitoring |
| `PluginDevToolsService` | Debug introspection |
| `DynamicPluginLoaderService` | Runtime plugin load/unload |
| `UiBridgeRegistryService` | Framework bridge registry |

### Components

| Component | Selector | Description |
|-----------|----------|-------------|
| `PageExtensionSlotComponent` | `gau-page-extension-slot` | Renders extensions for a slot |

### Constants

| Constant | Description |
|----------|-------------|
| `PAGE_EXTENSION_SLOTS` | Well-known slot ID strings |

---

## @gauzy/ui-react

### Hooks

| Hook | Signature | Description |
|------|-----------|-------------|
| `useInjector` | `() => Injector` | Access Angular injector |
| `useObservable` | `<T>(obs$: Observable<T>, initial: T) => T` | Subscribe to Observable |
| `usePluginState` | `<T>(pluginId, key, initial) => [T, (v: T) => void]` | Shared plugin state |
| `usePluginSettings` | `(pluginId: string) => Record<string, any>` | All plugin settings |
| `usePluginSetting` | `<T>(pluginId, key, defaultValue) => T` | Single setting value |
| `useTranslation` | `() => { t, currentLang }` | Reactive translations |
| `usePluginEvents` | `() => PluginEventBusService` | Raw event bus access |
| `usePluginEvent` | `(eventName: string) => { emit, on }` | Basic event handle |
| `useTypedEvent` | `<T>(contract) => TypedEventHandle<T>` | Type-safe event handle |
| `useTypedEventListener` | `<T>(contract, callback) => void` | Auto-subscribed listener |
| `useDynamicPlugin` | `(pluginId) => { load, unload, isLoaded }` | Dynamic plugin control |

### Components & Directives

| Export | Description |
|--------|-------------|
| `ReactHostDirective` | `[gauReactHost]` — mount React in Angular |
| `LazyReactHostDirective` | `[gauLazyReactHost]` — lazy mount React in Angular |
| `PluginErrorBoundary` | React error boundary with recovery |
| `NgContextProvider` | React context providing Angular injector |
| `NgBridgeContext` | React context object |
| `useBridgeContext` | Access bridge context from React |

### Bridge

| Export | Description |
|--------|-------------|
| `ReactBridge` | Bridge class with mount/unmount |
| `createReactBridge` | Factory function |
| `provideReactBridge` | Angular provider helper |
| `REACT_BRIDGE` | Injection token |

### Extension Helpers

| Function | Description |
|----------|-------------|
| `defineReactExtension(config)` | Create eager React extension definition |
| `defineLazyReactExtension(config)` | Create lazy React extension definition |
| `isReactExtension(ext)` | Type guard for React extensions |

---

## @gauzy/ui-react-components

### Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Card` | `CardProps` (`variant?: 'default' \| 'accent'`) | Card container |
| `CardHeader` | — | Card header section |
| `CardTitle` | — | Card title text |
| `CardDescription` | — | Card description text |
| `CardAction` | — | Card action area |
| `CardContent` | — | Card body content |
| `CardFooter` | — | Card footer section |
| `WidgetCard` | Widget-specific props | Pre-styled stat card |
| `Progress` | `ProgressProps` (`value: number`) | Progress bar |
| `ColorDots` | `ColorDotsProps` | Color indicator dots |

### Design Tokens

```typescript
import { theme } from '@gauzy/ui-react-components';

theme.colors     // { primary, textPrimary, textSecondary, background, border, ... }
theme.shadows    // { card, elevated }
theme.spacing    // { xs, sm, md, lg, xl }
theme.fonts      // { family, sizeBase, sizeSmall, sizeLarge }
theme.radii      // { sm, md, lg }
```

### Utilities

| Function | Description |
|----------|-------------|
| `formatDuration(seconds: number)` | Format seconds as "Xh Ym" |
| `currentWeekRange()` | Get current week start/end dates |
| `todayRange()` | Get today's start/end timestamps |
