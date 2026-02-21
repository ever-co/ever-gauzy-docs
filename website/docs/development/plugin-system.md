---
sidebar_position: 4
---

# Plugin System

Ever Gauzy supports a plugin architecture for extending functionality.

## Plugin Structure

```
packages/plugins/
├── plugin-integration-github/     # GitHub integration
├── plugin-integration-upwork/     # Upwork integration
├── plugin-integration-hubstaff/   # HubStaff integration
├── plugin-integration-jira/       # Jira integration
├── plugin-integration-wakatime/   # Wakatime integration
├── plugin-job-search/             # Job search
├── plugin-job-matching/           # AI job matching
├── plugin-knowledge-base/         # KB module
├── plugin-changelog/              # Changelog tracking
└── plugin-product-reviews/        # Product reviews
```

## Creating a Plugin

### 1. Create Module

```typescript
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  providers: [CustomPluginService],
  controllers: [CustomPluginController],
  exports: [CustomPluginService],
})
export class CustomPluginModule {}
```

### 2. Register Plugin

```typescript
// In PluginModule or AppModule
@Module({
  imports: [
    // ... core modules
    CustomPluginModule,
  ],
})
export class AppModule {}
```

### 3. Add Entities

```typescript
@MultiORMEntity("custom_plugin_data")
export class CustomPluginData extends TenantOrganizationBaseEntity {
  @MultiORMColumn()
  name: string;

  @MultiORMColumn({ nullable: true })
  value: string;
}
```

### 4. Register Entity

Add your entity to the plugin's module:

```typescript
TypeOrmModule.forFeature([CustomPluginData]);
MikroOrmModule.forFeature([CustomPluginData]);
```

## Plugin Guidelines

- ✅ Extend `TenantOrganizationBaseEntity` for tenant scoping
- ✅ Use Multi-ORM decorators
- ✅ Define API contracts in `@gauzy/contracts`
- ✅ Follow existing service/controller patterns
- ❌ Don't modify core entities directly
- ❌ Don't bypass tenant filtering

## Related Pages

- [Architecture Overview](../architecture/overview)
- [Multi-ORM Entities](../database/multi-orm-entities)
- [Custom Integrations](../integrations/custom-integrations)
