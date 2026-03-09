---
sidebar_position: 5
---

# JobProposalPlugin

Provides the **Proposals** page under the Sales section for managing job proposals.

:::note
Unlike other Jobs child plugins, `JobProposalPlugin` registers under `sales-sections` (not `jobs-sections`), so it appears in the Sales menu rather than the Jobs tab bar.
:::

## Plugin Details

| Property | Value |
|----------|-------|
| **Plugin ID** | `job-proposal` |
| **Package** | `@gauzy/plugin-job-proposal-ui` |
| **Version** | `1.0.0` |
| **Location** | `sales-sections` |
| **Permission** | `ORG_PROPOSALS_VIEW` |
| **Type** | Module-based |

## Plugin Definition

```typescript
export const JobProposalPlugin: PluginUiDefinition = {
  id: 'job-proposal',
  version: '1.0.0',
  location: 'sales-sections',
  module: JobProposalModule,
  permissionKeys: [PermissionsEnum.ORG_PROPOSALS_VIEW],
  routes: [JOB_PROPOSAL_SALES_ROUTE as PluginRouteInput]
};
```

## Route Tree

```
/pages/sales/proposals
  ├── /              → ProposalComponent (list view)
  ├── /register      → ProposalRegisterComponent (create new)
  ├── /details/:id   → ProposalDetailsComponent (view)
  └── /edit/:id      → ProposalEditComponent (edit)
```

- **Module:** `JobProposalModule` (lazy-loaded)
- **Selectors:** `project: false, team: false`

## Features

- List, create, view, and edit job proposals
- Proposal status tracking
- Conditional "Add" button for users with `PROPOSALS_EDIT` permission

## Navigation

Adds a "Proposals" item under the Sales section in the sidebar.
