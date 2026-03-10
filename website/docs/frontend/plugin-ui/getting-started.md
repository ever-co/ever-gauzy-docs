---
sidebar_position: 2
---

# Getting Started

This guide walks you through creating your first UI plugin for Ever Gauzy and registering it in the application's `plugin-ui.config.ts`.

## Prerequisites

- Ever Gauzy monorepo cloned and dependencies installed
- Basic familiarity with Angular (components, modules, routing)

## Understanding `plugin-ui.config.ts`

All UI plugins are registered in a single configuration file: `apps/gauzy/src/plugin-ui.config.ts`. This is the entry point that tells the application which plugins to load and how they are organized.

Here is the real production config:

```typescript
import { LanguagesEnum, WeekDaysEnum } from '@gauzy/contracts';
import { JobEmployeePlugin } from '@gauzy/plugin-job-employee-ui';
import { JobMatchingPlugin } from '@gauzy/plugin-job-matching-ui';
import { JobProposalPlugin, JobProposalTemplatePlugin } from '@gauzy/plugin-job-proposal-ui';
import { JobSearchPlugin } from '@gauzy/plugin-job-search-ui';
import { JobsPlugin } from '@gauzy/plugin-jobs-ui';
import { IntegrationUpworkPlugin } from '@gauzy/plugin-integration-upwork-ui';
import { DashboardTimeTrackReactUiPlugin } from '@gauzy/plugin-dashboard-time-track-react-ui';
import { DayOfWeek, PluginUiConfig } from '@gauzy/plugin-ui';
import { dayOfWeekAsString } from '@gauzy/ui-core/shared';
import { environment } from '@gauzy/ui-config';

export const uiPluginConfig: PluginUiConfig = {
  // ── Internationalization ───────────────────────────────
  defaultLanguage: LanguagesEnum.ENGLISH,
  defaultLocale: 'en-US',
  fallbackLocale: LanguagesEnum.ENGLISH,
  availableLanguages: [
    LanguagesEnum.ENGLISH, LanguagesEnum.FRENCH, LanguagesEnum.SPANISH,
    LanguagesEnum.GERMAN,  LanguagesEnum.RUSSIAN, LanguagesEnum.CHINESE,
    // ... more languages
  ],
  availableLocales: ['en-US', 'fr-FR', 'es-ES', 'de-DE', 'ru-RU', 'zh-CN', /* ... */],
  startWeekOn: dayOfWeekAsString(WeekDaysEnum.MONDAY) as DayOfWeek,

  // ── Plugins ────────────────────────────────────────────
  plugins: [
    // Flat plugin — registers directly
    IntegrationUpworkPlugin,

    // Plugin group — parent with child plugins
    JobsPlugin.init({
      plugins: [
        JobProposalPlugin,
        JobEmployeePlugin,
        JobSearchPlugin,
        JobMatchingPlugin,
        JobProposalTemplatePlugin
      ]
    }),

    // Conditional plugin — only loaded in demo mode
    ...(environment.DEMO ? [DashboardTimeTrackReactUiPlugin] : [])
  ]
};
```

### Key patterns in the config

| Pattern | Example | When to use |
|---------|---------|-------------|
| **Flat plugin** | `IntegrationUpworkPlugin` | Standalone plugin, no children |
| **Plugin group with `.init()`** | `JobsPlugin.init({ plugins: [...] })` | Parent plugin with customizable child plugins |
| **Conditional loading** | `...(condition ? [Plugin] : [])` | Feature-flagged or environment-gated plugins |

## Step 1: Create the Plugin Directory

```bash
mkdir -p packages/plugins/my-plugin-ui/src/lib
```

Standard directory structure:

```text
packages/plugins/my-plugin-ui/
├── src/
│   ├── lib/
│   │   ├── my-plugin.ts           # Plugin definition
│   │   ├── my-plugin.module.ts    # Angular module (if module-based)
│   │   ├── my-page.component.ts   # Page components
│   │   └── my-page-route.ts       # Route configuration
│   └── index.ts                   # Public API exports
├── package.json
└── tsconfig.json
```

## Step 2: Choose Your Plugin Type

### Option A: Module-Based Plugin (most common)

This is the pattern used by most existing plugins (Upwork, Jobs, Job Search, etc.):

```typescript
// packages/plugins/my-plugin-ui/src/lib/my-plugin.ts
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
  routes: [MY_PLUGIN_PAGE_ROUTE as any]
};
```

The Angular module:

```typescript
// packages/plugins/my-plugin-ui/src/lib/my-plugin.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyPageComponent } from './my-page.component';

@NgModule({
  declarations: [MyPageComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MyPageComponent }
    ])
  ]
})
export class MyPluginModule {}
```

The route configuration:

```typescript
// packages/plugins/my-plugin-ui/src/lib/my-page-route.ts
export const MY_PLUGIN_PAGE_ROUTE = {
  location: 'pages',
  path: 'my-feature',
  loadChildren: () => import('./my-plugin.module').then(m => m.MyPluginModule),
  data: {
    selectors: { project: false, employee: false, organization: true }
  }
};
```

### Option B: Declarative Plugin (no Angular module needed)

Used by the React dashboard plugin and simpler plugins:

```typescript
// packages/plugins/my-plugin-ui/src/lib/my-plugin.ts
import { defineDeclarativePlugin } from '@gauzy/plugin-ui';
import { PermissionsEnum } from '@gauzy/contracts';

export const MyPlugin = defineDeclarativePlugin('my-plugin', {
  version: '1.0.0',
  location: 'page-sections',
  routes: [MY_PLUGIN_ROUTE as any],

  // Translations with namespace isolation
  translationNamespace: 'MY_PLUGIN',
  translations: {
    en: { MY_PLUGIN: { TITLE: 'My Feature', TAB_LABEL: 'My Tab' } }
  },

  // Plugin settings (auto-generates settings UI)
  settings: {
    title: 'My Plugin Settings',
    description: 'Configure my plugin behavior.',
    category: 'general',
    fields: [
      { key: 'enabled', type: 'boolean', label: 'Enable feature', defaultValue: true, order: 1 },
      { key: 'maxItems', type: 'number', label: 'Max items', defaultValue: 10, order: 2 }
    ]
  },

  // Dashboard tab
  tabs: [
    {
      tabsetId: 'dashboard-page',
      tabId: 'my-tab',
      tabsetType: 'route',
      path: '/pages/dashboard/my-feature',
      tabTitle: (_i18n) => _i18n.getTranslation('MY_PLUGIN.TAB_LABEL'),
      tabIcon: 'star-outline',
      responsive: true,
      order: 5,
      permissions: [PermissionsEnum.ADMIN_DASHBOARD_VIEW]
    }
  ]
});
```

## Step 3: Export from the Package

```typescript
// packages/plugins/my-plugin-ui/src/index.ts
export { MyPlugin } from './lib/my-plugin';
```

## Step 4: Add the Path Alias

In the root `tsconfig.json`, add your package path:

```json
{
  "compilerOptions": {
    "paths": {
      "@gauzy/plugin-my-plugin-ui": ["packages/plugins/my-plugin-ui/src/index.ts"]
    }
  }
}
```

## Step 5: Register in `plugin-ui.config.ts`

```typescript
// apps/gauzy/src/plugin-ui.config.ts
import { MyPlugin } from '@gauzy/plugin-my-plugin-ui';

export const uiPluginConfig: PluginUiConfig = {
  // ... i18n config stays the same

  plugins: [
    IntegrationUpworkPlugin,
    JobsPlugin.init({ plugins: [/* ... */] }),

    // Add your plugin here
    MyPlugin
  ]
};
```

### Conditional Registration

To load your plugin only under certain conditions:

```typescript
plugins: [
  // Only in demo environments
  ...(environment.DEMO ? [MyPlugin] : []),

  // Only when a feature flag is set
  ...(environment.FEATURE_MY_PLUGIN ? [MyPlugin] : []),
]
```

## Step 6: Run the Application

```bash
yarn start:gauzy
```

## Real-World Examples

### Simple Module Plugin (like Job Search)

```typescript
// Minimal pattern: id + version + location + module + permissions + routes
export const JobSearchPlugin: PluginUiDefinition = {
  id: 'job-search',
  version: '1.0.0',
  location: 'jobs-sections',
  module: JobSearchModule,
  permissionKeys: [PermissionsEnum.ORG_JOB_SEARCH],
  routes: [JOB_SEARCH_PAGE_ROUTE as any]
};
```

### Plugin Group with Children (like Jobs)

```typescript
// Parent-child pattern with customizable child plugins
export interface JobsPluginDefinition extends PluginUiDefinition {
  init(opts: { plugins: PluginUiDefinition[] }): PluginUiDefinition;
}

export const JobsPlugin: JobsPluginDefinition = {
  id: 'jobs',
  version: '1.0.0',
  location: 'jobs-sections',
  module: JobsModule,
  routes: [JOBS_PAGE_ROUTE as any],
  navMenu: [{
    type: 'config',
    config: {
      id: 'jobs',
      title: 'Jobs',
      icon: 'fas fa-briefcase',
      link: '/pages/jobs',
      data: { translationKey: 'MENU.JOBS', featureKey: FeatureEnum.FEATURE_JOB },
      items: []
    },
    before: 'employees'
  }],
  featureKey: FeatureEnum.FEATURE_JOB,
  plugins: [],

  // .init() lets consumers choose which child plugins to include
  init(opts: { plugins: PluginUiDefinition[] }): PluginUiDefinition {
    return { ...JobsPlugin, plugins: opts.plugins };
  }
};
```

### Declarative React Plugin (like Dashboard Time Track)

```typescript
// Full declarative plugin with translations, settings, and tabs
export const DashboardTimeTrackReactUiPlugin = defineDeclarativePlugin(
  'dashboard-time-track-react-ui', {
    version: '1.0.0',
    location: 'page-sections',
    routes: [DASHBOARD_TIME_TRACK_ROUTE as any],
    translationNamespace: 'REACT_UI',
    translations: { en },
    settings: {
      title: 'React Dashboard Widgets',
      description: 'Configure widget visibility.',
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

## Next Steps

- [Plugin Definitions](./plugin-definitions) — all plugin types, fields, and lifecycle hooks in detail
- [Extension Slots](./extension-slots) — contribute widgets to dashboard slots
- [React Bridge](./react-bridge) — embed React components in your plugin
- [Plugin Services](./plugin-services) — events, settings, and cross-plugin communication
- [Advanced Features](./advanced-features) — dynamic loading, health monitoring, and dependency graphs
