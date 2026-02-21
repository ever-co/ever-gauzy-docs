---
sidebar_position: 1
---

# Plugins Overview

Ever Gauzy uses a plugin-based architecture to extend the platform with optional features, integrations, analytics, and media capture capabilities.

## Plugin Architecture

Plugins are NestJS dynamic modules registered through the `PluginModule` system. Each plugin:

- Registers its own entities, services, and controllers
- Can extend existing entities with custom fields
- Runs migrations independently
- Has its own configuration via environment variables

```typescript
@PluginModule({
  imports: [],
  entities: [MyEntity],
  controllers: [MyController],
  providers: [MyService],
})
export class MyPlugin {}
```

## Available Plugins

### Integration Plugins

| Plugin                                           | Package                | Description                             |
| ------------------------------------------------ | ---------------------- | --------------------------------------- |
| [AI](./ai-plugin)                                | `integration-ai`       | Gauzy AI assistant, NLP, smart matching |
| [GitHub](../integrations/github-integration)     | `integration-github`   | Issue sync, webhooks                    |
| [Upwork](../integrations/upwork-integration)     | `integration-upwork`   | Time & contract sync                    |
| [HubStaff](../integrations/hubstaff-integration) | `integration-hubstaff` | Time tracking sync                      |
| [Jira](../integrations/jira-integration)         | `integration-jira`     | Issue tracking sync                     |
| [WakaTime](./wakatime-plugin)                    | `integration-wakatime` | Developer metrics                       |

### Automation Plugins

| Plugin                                | Package                    | Description             |
| ------------------------------------- | -------------------------- | ----------------------- |
| [Zapier](./zapier-plugin)             | `integration-zapier`       | 5,000+ app automations  |
| [Make](./make-plugin)                 | `integration-make-com`     | Visual workflow builder |
| [Activepieces](./activepieces-plugin) | `integration-activepieces` | Open-source automation  |

### Analytics Plugins

| Plugin                           | Package                      | Description                       |
| -------------------------------- | ---------------------------- | --------------------------------- |
| [Analytics](./analytics-plugins) | `jitsu-analytics`, `posthog` | Product analytics, event tracking |

### Media & Capture Plugins

| Plugin                           | Package                          | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- |
| [Media Capture](./media-plugins) | `camshot`, `soundshot`, `videos` | Screenshot, audio, video capture |

### Other Plugins

| Plugin            | Package           | Description                  |
| ----------------- | ----------------- | ---------------------------- |
| `sentry-tracing`  | `sentry-tracing`  | Error tracking & performance |
| `changelog`       | `changelog`       | Release changelog management |
| `knowledge-base`  | `knowledge-base`  | Knowledge base / wiki        |
| `product-reviews` | `product-reviews` | Product review system        |
| `job-search`      | `job-search`      | Job board & search           |
| `job-proposal`    | `job-proposal`    | Job proposal management      |

## Plugin Loading

Plugins are loaded in `plugin.module.ts`:

```typescript
@Module({
  imports: [
    PluginModule.init({
      plugins: [
        IntegrationAIModule,
        IntegrationGitHubModule,
        SentryTracingModule,
        // ... more plugins
      ],
    }),
  ],
})
export class AppModule {}
```

## Environment-Based Activation

Most plugins are controlled by environment variables:

```bash
# Enable/disable specific integrations
GAUZY_AI_GRAPHQL_ENDPOINT=http://localhost:3005/graphql
GITHUB_CLIENT_ID=your-github-id
HUBSTAFF_CLIENT_ID=your-hubstaff-id
JIRA_CLIENT_ID=your-jira-id
```

## Developing Custom Plugins

See the [Plugin System](../development/plugin-system) guide for creating your own plugins.

## Related Pages

- [Plugin System](../development/plugin-system) — how to build plugins
- [Architecture: Plugin System](../architecture/plugin-system) — plugin architecture
- [Custom Integrations](../integrations/custom-integrations) — API-based integrations
