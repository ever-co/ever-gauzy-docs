---
sidebar_position: 25
---

# Integration Upwork UI Plugin

The Upwork integration UI plugin provides the frontend interface for connecting and managing Upwork freelance projects, contracts, and payments within Ever Gauzy.

## Plugin Details

| Property | Value |
|----------|-------|
| **Plugin ID** | `integration-upwork` |
| **Package** | `@gauzy/plugin-integration-upwork-ui` |
| **Version** | `1.0.0` |
| **Location** | `integrations-sections` |
| **Type** | Module-based (Angular) |
| **Permission** | `INTEGRATION_VIEW` |

## Plugin Definition

```typescript
import { PluginUiDefinition } from '@gauzy/plugin-ui';
import { PermissionsEnum } from '@gauzy/contracts';
import { IntegrationUpworkUiModule } from './integration-upwork-ui.module';
import { INTEGRATION_UPWORK_PAGE_ROUTE } from './integration-upwork.routes';

export const IntegrationUpworkPlugin: PluginUiDefinition = {
  id: 'integration-upwork',
  version: '1.0.0',
  location: 'integrations-sections',
  module: IntegrationUpworkUiModule,
  permissionKeys: [PermissionsEnum.INTEGRATION_VIEW],
  routes: [INTEGRATION_UPWORK_PAGE_ROUTE as PluginRouteInput]
};
```

## Registration

Registered as a flat plugin in `apps/gauzy/src/plugin-ui.config.ts`:

```typescript
import { IntegrationUpworkPlugin } from '@gauzy/plugin-integration-upwork-ui';

export const uiPluginConfig: PluginUiConfig = {
  plugins: [
    IntegrationUpworkPlugin,
    // ...
  ]
};
```

## Routes

| Path | URL | Component | Description |
|------|-----|-----------|-------------|
| `/` | `/pages/integrations/upwork` | `UpworkAuthorizeComponent` | Authorization page |
| `/regenerate` | `/pages/integrations/upwork/regenerate` | `UpworkAuthorizeComponent` | Re-authorize |
| `/:id` | `/pages/integrations/upwork/:id` | `UpworkComponent` | Main integration view |
| `/:id/activities` | `/pages/integrations/upwork/:id/activities` | `TransactionsComponent` | Activity log |
| `/:id/reports` | `/pages/integrations/upwork/:id/reports` | `ReportsComponent` | Upwork reports |
| `/:id/transactions` | `/pages/integrations/upwork/:id/transactions` | `TransactionsComponent` | Financial transactions |
| `/:id/contracts` | `/pages/integrations/upwork/:id/contracts` | `ContractsComponent` | Contract management |

## Features

- **OAuth Authorization** — Connect Upwork accounts via OAuth flow
- **Contract Management** — View and manage active Upwork contracts
- **Activity Tracking** — Browse synced activities and time entries
- **Financial Reports** — View transaction history and payment reports
- **Data Sync Configuration** — Select which Upwork data to synchronize

## Components

| Component | Purpose |
|-----------|---------|
| `IntegrationUpworkLayoutComponent` | Main layout wrapper |
| `UpworkAuthorizeComponent` | OAuth authorization flow |
| `UpworkComponent` | Primary integration interface |
| `TransactionsComponent` | Activities and transactions view |
| `ContractsComponent` | Contract listing and management |
| `ReportsComponent` | Financial reports |
| `SyncDataSelectionComponent` | Data synchronization settings |

## Related

- [Plugin UI System](../frontend/plugin-ui/overview) — how UI plugins work
- [Upwork Integration](../integrations/upwork-integration) — backend integration setup
