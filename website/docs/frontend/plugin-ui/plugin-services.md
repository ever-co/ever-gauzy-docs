---
sidebar_position: 6
---

# Plugin Services

Plugins communicate and share data through type-safe events, settings registries, and state management — all without direct imports between plugins.

## Event System

### PluginEventBusService

The central event bus for cross-plugin communication. Events carry a `type`, `payload`, `source` (plugin ID), `timestamp`, and optional `metadata`.

```typescript
import { PluginEventBusService } from '@gauzy/plugin-ui';

@Injectable()
export class MyService {
  private readonly eventBus = inject(PluginEventBusService);

  notifyDataChanged() {
    this.eventBus.emit('my-plugin:data-changed', { updatedAt: Date.now() });
  }

  listenForChanges() {
    this.eventBus.on('other-plugin:settings-updated').subscribe(event => {
      console.log('Settings changed:', event.payload);
    });
  }
}
```

#### Full API

| Method | Signature | Description |
|--------|-----------|-------------|
| `emit` | `(type: string, payload: any, options?) => void` | Emit an event |
| `on` | `(type: string, options?) => Observable<PluginEvent>` | Subscribe to a specific event type |
| `onPattern` | `(pattern: string, options?) => Observable<PluginEvent>` | Subscribe with wildcards (e.g., `'user.*'`) |
| `once` | `(type: string, callback, options?) => void` | Subscribe once, then auto-unsubscribe |
| `forPlugin` | `(pluginId: string) => PluginEventEmitter` | Get a scoped emitter for a plugin |
| `registerSubscription` | `(pluginId: string, sub: Subscription) => void` | Track a subscription for cleanup |
| `unsubscribeByPlugin` | `(pluginId: string) => void` | Unsubscribe all plugin subscriptions |

#### Scoped Emitter

Use `forPlugin()` to get an emitter that automatically tags events with the plugin's source:

```typescript
const emitter = this.eventBus.forPlugin('my-plugin');
emitter.emit('data-changed', { updatedAt: Date.now() });
// Event type becomes 'my-plugin:data-changed', source is 'my-plugin'
```

#### Pattern Matching

Subscribe to multiple event types using wildcard patterns:

```typescript
// Listen to all events from a plugin
this.eventBus.onPattern('my-plugin:*').subscribe(event => { /* ... */ });

// Listen to all settings-related events
this.eventBus.onPattern('*:settings-*').subscribe(event => { /* ... */ });
```

#### Automatic Cleanup

When a plugin is unloaded via `DynamicPluginLoaderService`, all subscriptions registered via `registerSubscription()` are automatically cleaned up.

### Type-Safe Events

Define strongly-typed event contracts to catch payload errors at compile time:

```typescript
import { definePluginEvent, bindEventToBus } from '@gauzy/plugin-ui';

// 1. Define the event contract
export interface RefreshPayload {
  timestamp: number;
  source: string;
}

export const DataRefreshed = definePluginEvent<RefreshPayload>(
  'my-plugin',              // plugin ID
  'my-plugin:data-refreshed' // event name
);

// 2. Create a bound handle
const handle = bindEventToBus(DataRefreshed, eventBus);

// 3. Emit (type-checked)
handle.emit({ timestamp: Date.now(), source: 'user-action' });

// 4. Subscribe (type-checked)
handle.on().subscribe(event => {
  console.log(event.payload.timestamp); // TypeScript knows the shape
});
```

### Event Schema Registry

Register event schemas for runtime validation and dev tools introspection:

```typescript
import { PluginEventSchemaRegistry } from '@gauzy/plugin-ui';

const registry = inject(PluginEventSchemaRegistry);

registry.register({
  event: DataRefreshed,
  description: 'Emitted when dashboard data is refreshed',
  payloadSchema: {
    timestamp: 'number',
    source: 'string'
  }
});
```

### Using Events in React

```tsx
import { useTypedEvent, useTypedEventListener } from '@gauzy/ui-react';
import { DataRefreshed } from '../events';

function RefreshButton() {
  const handle = useTypedEvent(DataRefreshed);

  return <button onClick={() => handle.emit({ timestamp: Date.now(), source: 'button' })}>
    Refresh
  </button>;
}

function DataDisplay() {
  useTypedEventListener(DataRefreshed, (event) => {
    // Re-fetch data when event fires
    fetchData(event.payload.timestamp);
  });

  return <div>...</div>;
}
```

## Settings Registry

Plugins can declare a settings schema and read/write settings at runtime.

### Declaring Settings

In the plugin definition:

```typescript
export const MyPlugin = defineDeclarativePlugin('my-plugin', {
  settings: {
    theme: { type: 'string', default: 'light', label: 'Theme', enum: ['light', 'dark', 'auto'] },
    refreshInterval: { type: 'number', default: 30, label: 'Refresh interval (seconds)' },
    showNotifications: { type: 'boolean', default: true, label: 'Show notifications' }
  }
});
```

### Reading Settings (Angular)

```typescript
import { PluginSettingsRegistryService } from '@gauzy/plugin-ui';

@Injectable()
export class MyService {
  private readonly settings = inject(PluginSettingsRegistryService);

  getTheme(): string {
    return this.settings.get('my-plugin', 'theme', 'light');
  }

  updateTheme(theme: string) {
    this.settings.set('my-plugin', 'theme', theme);
  }
}
```

### Reading Settings (React)

```tsx
import { usePluginSettings, usePluginSetting } from '@gauzy/ui-react';

function SettingsPanel() {
  const settings = usePluginSettings('my-plugin');
  const theme = usePluginSetting('my-plugin', 'theme', 'light');

  return <div>Current theme: {theme}</div>;
}
```

## Cross-Plugin Service Registry

The `PluginServiceRegistryService` allows plugins to expose services for other plugins to consume — without direct imports:

```typescript
import { PluginServiceRegistryService } from '@gauzy/plugin-ui';

// Plugin A: expose a service
const serviceRegistry = inject(PluginServiceRegistryService);
serviceRegistry.register('data-plugin', 'dataFetcher', myDataFetcherService);

// Plugin B: consume the service
const dataFetcher = serviceRegistry.get<IDataFetcher>('data-plugin', 'dataFetcher');
if (dataFetcher) {
  const data = await dataFetcher.fetch();
}
```

## Plugin State Management

Share reactive state between components within and across plugins:

### Angular

```typescript
import { PluginUiRegistryService } from '@gauzy/plugin-ui';

const registry = inject(PluginUiRegistryService);

// Set state
registry.setPluginState('my-plugin', 'counter', 0);

// Get state
const count = registry.getPluginState<number>('my-plugin', 'counter');
```

### React

```tsx
import { usePluginState } from '@gauzy/ui-react';

function Counter() {
  const [count, setCount] = usePluginState<number>('my-plugin', 'counter', 0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

## Translation Service

Plugins access translations through the `IPluginTranslateService` interface, decoupled from the host's `TranslateService`:

```typescript
import { PLUGIN_TRANSLATE_SERVICE, IPluginTranslateService } from '@gauzy/plugin-ui';

const translate = inject<IPluginTranslateService>(PLUGIN_TRANSLATE_SERVICE);
const label = translate.instant('MY_PLUGIN.WIDGET_TITLE');
```

### Namespace Isolation

Plugin translations are automatically scoped under their `translationNamespace` to prevent collisions:

```typescript
export const MyPlugin = defineDeclarativePlugin('my-plugin', {
  translationNamespace: 'MY_PLUGIN',
  translations: {
    en: { MY_PLUGIN: { TITLE: 'Dashboard', SAVE: 'Save' } },
    ru: { MY_PLUGIN: { TITLE: 'Панель', SAVE: 'Сохранить' } }
  }
});
```

The `namespaceTranslations()` helper ensures keys are properly prefixed, and `filterNewTranslationKeys()` prevents plugins from overriding core application translations.

### React Translation Hook

```tsx
import { useTranslation } from '@gauzy/ui-react';

function MyWidget() {
  const { t, currentLang } = useTranslation();
  return <h2>{t('MY_PLUGIN.TITLE')}</h2>;
}
```

## Permission and Feature Checking

Plugins access the host's permission and feature systems through abstracted interfaces:

### Permission Checker

```typescript
import { PLUGIN_PERMISSION_CHECKER, IPluginPermissionChecker } from '@gauzy/plugin-ui';

const checker = inject<IPluginPermissionChecker>(PLUGIN_PERMISSION_CHECKER);

if (checker.hasAllPermissions('ADMIN_DASHBOARD_VIEW', 'ORG_EXPENSES_VIEW')) {
  // User has both permissions
}
```

### Feature Checker

```typescript
import { PLUGIN_FEATURE_CHECKER, IPluginFeatureChecker } from '@gauzy/plugin-ui';

const checker = inject<IPluginFeatureChecker>(PLUGIN_FEATURE_CHECKER);

if (checker.isFeatureEnabled('FEATURE_DASHBOARD')) {
  // Feature is enabled for this organization
}
```

## Related Pages

- [Extension Slots](./extension-slots) — visibility and permission rules
- [React Bridge](./react-bridge) — using hooks in React components
- [Advanced Features](./advanced-features) — event schema registry and devtools
- [API Reference](./api-reference) — token and interface reference
