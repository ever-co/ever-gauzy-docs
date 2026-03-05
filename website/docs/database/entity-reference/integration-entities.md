---
sidebar_position: 10
---

# Integration Entities

Entities for third-party integration configurations, tenant bindings, entity mappings, and settings.

## Integration

| Column            | Type     | Description          |
| ----------------- | -------- | -------------------- |
| `name`            | string   | Integration name     |
| `imgSrc`          | string?  | Logo URL             |
| `isComingSoon`    | boolean  | Coming soon flag     |
| `isPaid`          | boolean? | Requires payment     |
| `version`         | string?  | Version number       |
| `docUrl`          | string?  | Documentation URL    |
| `isFreeTrial`     | boolean? | Free trial available |
| `freeTrialPeriod` | number?  | Trial period (days)  |
| `order`           | number?  | Display order        |

## IntegrationTenant

Binds an integration to a specific tenant.

| Column          | Type    | Description       |
| --------------- | ------- | ----------------- |
| `name`          | string? | Connection name   |
| `integrationId` | UUID    | FK to integration |

**Relations:** `entitySettings` (OneToMany IntegrationEntitySetting), `settings` (OneToMany IntegrationSetting)

## IntegrationSetting

Key-value settings for integration configuration.

| Column                | Type   | Description              |
| --------------------- | ------ | ------------------------ |
| `settingsName`        | string | Setting key              |
| `settingsValue`       | string | Setting value            |
| `integrationTenantId` | UUID   | FK to integration tenant |

## IntegrationMap

Maps external entities to internal Gauzy entities.

| Column                | Type   | Description              |
| --------------------- | ------ | ------------------------ |
| `sourceId`            | string | External entity ID       |
| `gauzyId`             | string | Internal Gauzy entity ID |
| `entity`              | string | Entity type              |
| `integrationTenantId` | UUID   | FK to integration tenant |

## IntegrationEntitySetting

Configures which entities are synced for an integration.

| Column                | Type    | Description              |
| --------------------- | ------- | ------------------------ |
| `entity`              | enum    | Entity type to sync      |
| `sync`                | boolean | Whether to sync          |
| `integrationTenantId` | UUID    | FK to integration tenant |

## Related Pages

- [Integration Endpoints](../../api/integration-endpoints) — API reference
- [Integrations Overview](../../integrations/integrations-overview) — integrations guide
