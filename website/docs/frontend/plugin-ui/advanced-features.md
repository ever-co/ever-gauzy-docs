---
sidebar_position: 7
---

# Advanced Features

This page covers dynamic plugin loading, health monitoring, developer tools, dependency graph validation, and internationalization namespace isolation.

## Dynamic Plugin Loading

The `DynamicPluginLoaderService` allows loading and unloading plugins at runtime — after the initial application bootstrap.

### Loading a Plugin

```typescript
import { DynamicPluginLoaderService } from '@gauzy/plugin-ui';

const loader = inject(DynamicPluginLoaderService);

// Load a plugin definition at runtime
await loader.loadPlugin(myPluginDefinition);
```

The service:

1. Instantiates the plugin's module (or calls `bootstrap()` for declarative plugins)
2. Creates a child `Injector` with `PLUGIN_OPTIONS` and `PLUGIN_DEFINITION` tokens
3. Applies declarative registrations (routes, nav, tabs, extensions)
4. Calls lifecycle hooks (`ngOnPluginBootstrap`)
5. Records the plugin in the loaded registry

### Unloading a Plugin

```typescript
await loader.unloadPlugin('my-plugin-id');
```

The service:

1. Calls `ngOnPluginBeforeDestroy()` if implemented
2. Calls `ngOnPluginDestroy()` if implemented
3. Cleans up: extensions, settings, services, event subscriptions, plugin state
4. Destroys the child injector (cleaning up Angular DI resources)
5. Removes the plugin from the loaded registry
6. Emits `plugin:dynamic-unloaded` event

### Reloading a Plugin

```typescript
await loader.reloadPlugin(updatedPluginDefinition);
```

This is equivalent to `unloadPlugin()` followed by `loadPlugin()` — useful for hot-reloading during development.

### Full API

| Method / Property | Signature | Description |
|-------------------|-----------|-------------|
| `loadPlugin` | `(definition: PluginUiDefinition) => Promise<void>` | Load a plugin at runtime |
| `unloadPlugin` | `(pluginId: string) => Promise<void>` | Unload and clean up a plugin |
| `reloadPlugin` | `(definition: PluginUiDefinition) => Promise<void>` | Unload then reload |
| `isLoaded` | `(pluginId: string) => boolean` | Check if a plugin is loaded |
| `loadedPluginIds` | `string[]` (getter) | Current loaded plugin IDs |
| `loadedPluginIds$` | `Observable<string[]>` | Reactive loaded plugin IDs |

### Events Emitted

| Event Type | When |
|-----------|------|
| `plugin:dynamic-loaded` | After a plugin is successfully loaded |
| `plugin:dynamic-unloaded` | After a plugin is fully unloaded and cleaned up |

### From React

```tsx
import { useDynamicPlugin } from '@gauzy/ui-react';

function PluginToggle() {
  const { load, unload, isLoaded } = useDynamicPlugin('optional-plugin');
  return <button onClick={() => isLoaded ? unload() : load()}>Toggle</button>;
}
```

## Health Monitoring

The `PluginHealthService` automatically tracks plugin bootstrap performance and errors.

### Boot Time Tracking

Every plugin's bootstrap time is recorded automatically. Query it via:

```typescript
import { PluginHealthService } from '@gauzy/plugin-ui';

const health = inject(PluginHealthService);

// Get boot time for a specific plugin (ms)
const bootTime = health.getBootTime('my-plugin');

// Get all boot times
const allTimes = health.getAllBootTimes();
// Map<string, number> → { 'plugin-a': 45, 'plugin-b': 120, ... }
```

### Error Monitoring

Plugin bootstrap errors are captured rather than crashing the application:

```typescript
// Get errors for a specific plugin
const errors = health.getErrors('my-plugin');

// Get all plugin errors
const allErrors = health.getAllErrors();
// Map<string, Error[]>

// Check if a plugin is healthy
const isHealthy = health.isHealthy('my-plugin'); // no errors recorded
```

### Health Summary

```typescript
const summary = health.getSummary();
// {
//   totalPlugins: 12,
//   healthyPlugins: 11,
//   failedPlugins: 1,
//   totalBootTime: 340,
//   slowestPlugin: { id: 'heavy-plugin', bootTime: 120 }
// }
```

## Developer Tools

The `PluginDevToolsService` aggregates debug information for development and troubleshooting.

### Plugin Introspection

```typescript
import { PluginDevToolsService } from '@gauzy/plugin-ui';

const devtools = inject(PluginDevToolsService);

// Get a full debug snapshot of all plugins
const snapshot = devtools.getSnapshot();
```

The snapshot includes for each plugin:
- Plugin ID, version, and location
- Boot time and health status
- Number of registered extensions
- Dependency information
- Settings schema
- Translation namespaces

### Console Integration

During development, the devtools service is available on the browser console:

```javascript
// In browser console (development mode)
window.__GAUZY_PLUGIN_DEVTOOLS__.getSnapshot();
window.__GAUZY_PLUGIN_DEVTOOLS__.getPluginInfo('my-plugin');
```

## Dependency Graph Validation

The system validates plugin dependencies at bootstrap time to catch configuration errors early.

### Automatic Validation

When `PluginUiModule.bootstrapPlugins()` is called, it automatically:

1. **Validates existence** — all `dependsOn` references point to registered plugins
2. **Detects cycles** — circular dependency chains are reported
3. **Orders bootstrap** — plugins are bootstrapped in topological order

### Manual Validation

```typescript
import { validatePluginDependencies, logDependencyValidation } from '@gauzy/plugin-ui';

const result = validatePluginDependencies(pluginDefinitions);

if (!result.valid) {
  logDependencyValidation(result);
  // Logs missing dependencies, circular chains, and ordering issues
}

// result.ordered — correctly ordered plugin IDs
// result.errors — list of validation error messages
// result.cycles — detected circular dependency chains
```

### Version Compatibility

```typescript
import { checkVersionCompatibility } from '@gauzy/plugin-ui';

const compat = checkVersionCompatibility(pluginDefinitions);

if (!compat.compatible) {
  console.error('Version conflicts:', compat.conflicts);
  // e.g., "my-plugin requires core-plugin >=2.0.0 but found 1.5.0"
}
```

This checks `peerPlugins` version ranges against actual `version` fields:

```typescript
export const MyPlugin = defineDeclarativePlugin('my-plugin', {
  version: '1.0.0',
  peerPlugins: {
    'core-plugin': '>=2.0.0',
    'data-plugin': '^1.5.0'
  }
});
```

## i18n Namespace Isolation

Plugin translations are isolated to prevent naming collisions with the host application or other plugins.

### How It Works

1. Each plugin declares a `translationNamespace` (e.g., `'MY_PLUGIN'`)
2. Translation keys are automatically scoped under that namespace
3. `filterNewTranslationKeys()` ensures plugins cannot override existing core keys
4. Language change events trigger re-merging of plugin translations

### Namespace Helpers

```typescript
import { namespaceTranslations, NamespacedTranslateHelper } from '@gauzy/plugin-ui';

// Wrap raw translations with a namespace
const namespaced = namespaceTranslations('MY_PLUGIN', {
  TITLE: 'Dashboard',
  SAVE: 'Save'
});
// Result: { MY_PLUGIN: { TITLE: 'Dashboard', SAVE: 'Save' } }

// Use the namespaced translate helper
const helper = new NamespacedTranslateHelper(translateService, 'MY_PLUGIN');
const title = helper.instant('TITLE'); // Translates 'MY_PLUGIN.TITLE'
```

### Translation Lifecycle

When a plugin provides translations:

1. At bootstrap, translations are merged into the host's translation store for all available languages
2. The `onLangChange` subscription re-merges translations when the user switches languages
3. On plugin unload (dynamic plugins), the subscription is cleaned up via Angular's `DestroyRef`
4. `filterNewTranslationKeys()` strips any keys that already exist in the host store, preventing overrides

## Testing Utilities

The `@gauzy/plugin-ui` package provides testing helpers for unit and integration tests.

### createTestPlugin

Create a minimal plugin definition for tests:

```typescript
import { createTestPlugin } from '@gauzy/plugin-ui';

const testPlugin = createTestPlugin('test-plugin', {
  extensions: [
    { id: 'test-ext', slotId: 'dashboard-widgets', component: MockComponent }
  ]
});
```

### MockEventBus

A mock event bus that records emitted events for assertions:

```typescript
import { MockEventBus } from '@gauzy/plugin-ui';

const mockBus = new MockEventBus();

// Use in tests
myService.doSomething(); // internally emits an event
expect(mockBus.emittedEvents).toContainEqual({
  name: 'my-plugin:data-changed',
  payload: expect.objectContaining({ updatedAt: expect.any(Number) })
});
```

### TestPluginHarness

A test harness that sets up the full plugin environment:

```typescript
import { TestPluginHarness } from '@gauzy/plugin-ui';

const harness = new TestPluginHarness();
await harness.bootstrap([testPlugin]);

// Access registries
const extensions = harness.extensionRegistry.getExtensions('dashboard-widgets');
expect(extensions).toHaveLength(1);

// Clean up
harness.destroy();
```

## Related Pages

- [Plugin Definitions](./plugin-definitions) — dependency and version fields
- [Plugin Services](./plugin-services) — events and translations
- [API Reference](./api-reference) — full type and token reference
