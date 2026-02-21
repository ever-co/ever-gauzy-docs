---
sidebar_position: 7
---

# Plugin System

Ever Gauzy uses a modular **plugin architecture** that allows extending the platform with new features, integrations, entities, and UI components without modifying the core codebase.

## Plugin Architecture

```
┌──────────────────────────────────────────────────────┐
│                   Application                         │
│  ┌────────────────────────────────────────────────┐  │
│  │                Core Module                      │  │
│  │  (Auth, Users, Tenants, Organizations, etc.)   │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ Plugin A │ │ Plugin B │ │ Plugin C │  ...        │
│  │(GitHub)  │ │(Upwork)  │ │(Sentry)  │             │
│  └──────────┘ └──────────┘ └──────────┘             │
└──────────────────────────────────────────────────────┘
```

## Plugin Types

### Backend Plugins

Backend plugins can add:

| Capability           | Description                 |
| -------------------- | --------------------------- |
| **Entities**         | New database tables/columns |
| **Controllers**      | New API endpoints           |
| **Services**         | Business logic              |
| **Commands/Queries** | CQRS handlers               |
| **Event Handlers**   | React to platform events    |
| **Middleware**       | Request processing          |
| **Guards**           | Authorization rules         |

### UI Plugins

UI plugins provide:

| Capability     | Description             |
| -------------- | ----------------------- |
| **Pages**      | New routes and views    |
| **Components** | Reusable UI components  |
| **Modules**    | Angular feature modules |
| **Services**   | Frontend business logic |

## Creating a Plugin

### Step 1: Create Plugin Module

```typescript
// packages/plugins/my-plugin/src/lib/my-plugin.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MyPluginEntity } from "./my-plugin.entity";
import { MyPluginService } from "./my-plugin.service";
import { MyPluginController } from "./my-plugin.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([MyPluginEntity]),
    MikroOrmModule.forFeature([MyPluginEntity]),
  ],
  controllers: [MyPluginController],
  providers: [MyPluginService],
  exports: [MyPluginService],
})
export class MyPluginModule {}
```

### Step 2: Define Entity

```typescript
import { MultiORMEntity, MultiORMColumn } from "@gauzy/core";
import { TenantOrganizationBaseEntity } from "@gauzy/core";

@MultiORMEntity("my_plugin_data")
export class MyPluginEntity extends TenantOrganizationBaseEntity {
  @MultiORMColumn()
  name: string;

  @MultiORMColumn({ type: "jsonb", nullable: true })
  config?: Record<string, any>;
}
```

### Step 3: Create Service

```typescript
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TenantAwareCrudService } from "@gauzy/core";
import { MyPluginEntity } from "./my-plugin.entity";

@Injectable()
export class MyPluginService extends TenantAwareCrudService<MyPluginEntity> {
  constructor(
    @InjectRepository(MyPluginEntity)
    private readonly myPluginRepository,
  ) {
    super(myPluginRepository);
  }
}
```

### Step 4: Register the Plugin

Register the plugin in the API application:

```typescript
// apps/api/src/plugin-config.ts
import { MyPluginModule } from "@gauzy/plugin-my-plugin";

export const pluginConfig = {
  plugins: [
    MyPluginModule,
    // ... other plugins
  ],
};
```

## Built-in Plugins

### Integration Plugins

| Plugin           | Package                                  | Description                                 |
| ---------------- | ---------------------------------------- | ------------------------------------------- |
| **GitHub**       | `@gauzy/plugin-integration-github`       | GitHub App integration (issues, PRs, repos) |
| **Upwork**       | `@gauzy/plugin-integration-upwork`       | Upwork time tracking and contracts          |
| **HubStaff**     | `@gauzy/plugin-integration-hubstaff`     | HubStaff time tracking sync                 |
| **Jira**         | `@gauzy/plugin-integration-jira`         | Jira issue synchronization                  |
| **Zapier**       | `@gauzy/plugin-integration-zapier`       | Zapier automation webhooks                  |
| **Make.com**     | `@gauzy/plugin-integration-make`         | Make.com automation                         |
| **ActivePieces** | `@gauzy/plugin-integration-activepieces` | ActivePieces automation                     |
| **Gauzy AI**     | `@gauzy/plugin-integration-ai`           | AI-powered features                         |

### Feature Plugins

| Plugin              | Package                         | Description                  |
| ------------------- | ------------------------------- | ---------------------------- |
| **Knowledge Base**  | `@gauzy/plugin-knowledge-base`  | Help center / knowledge base |
| **Product Reviews** | `@gauzy/plugin-product-reviews` | Product review system        |
| **Job Search**      | `@gauzy/plugin-job-search`      | Job board search integration |
| **Changelog**       | `@gauzy/plugin-changelog`       | Activity audit trail         |

### Analytics & Monitoring Plugins

| Plugin              | Package                         | Description                |
| ------------------- | ------------------------------- | -------------------------- |
| **Sentry**          | `@gauzy/plugin-sentry`          | Error tracking integration |
| **Jitsu Analytics** | `@gauzy/plugin-jitsu-analytics` | Jitsu data ingestion       |

### UI Plugins

| Plugin                | Package                               | Description                |
| --------------------- | ------------------------------------- | -------------------------- |
| **GitHub UI**         | `@gauzy/plugin-integration-github-ui` | GitHub settings UI         |
| **Job Search UI**     | `@gauzy/plugin-job-search-ui`         | Job board search UI        |
| **Job Matching UI**   | `@gauzy/plugin-job-matching-ui`       | Job matching interface     |
| **Knowledge Base UI** | `@gauzy/plugin-knowledge-base-ui`     | Knowledge base frontend    |
| **Onboarding UI**     | `@gauzy/plugin-onboarding-ui`         | Setup/onboarding wizard UI |
| **Legal UI**          | `@gauzy/plugin-legal-ui`              | Privacy/Terms pages        |

## Plugin Configuration

### Integration Plugin Pattern

Integration plugins follow a common pattern:

```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([IntegrationEntity, IntegrationSetting]),
    HttpModule,
  ],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
    IntegrationCommandHandler,
    IntegrationEventHandler,
  ],
})
export class IntegrationPluginModule {
  // Register OAuth callbacks, webhook endpoints, and settings
}
```

### Feature Flags

Plugins can be enabled/disabled via environment variables:

```bash
# Enable/disable integrations
FEATURE_APP_INTEGRATION=true

# Feature-specific flags
FEATURE_JOB=true
FEATURE_ORGANIZATION_HELP_CENTER=true
```

## Plugin Discovery

The platform discovers plugins through the module registration in the API bootstrap:

```typescript
// packages/core/src/lib/bootstrap/index.ts
const app = await NestFactory.create(
  AppModule.forRoot({
    plugins: pluginConfig.plugins,
  }),
);
```

Plugins are dynamically imported into the NestJS dependency injection container.

## Related Pages

- [Backend Architecture](./backend-architecture) — NestJS module system
- [Integrations Overview](../integrations/integrations-overview) — integration configuration
- [Event Bus](./event-bus) — plugin event communication
