---
sidebar_position: 6
---

# JobProposalTemplatePlugin

Provides the **Proposal Template** tab in the Jobs section for managing reusable proposal templates.

## Plugin Details

| Property | Value |
|----------|-------|
| **Plugin ID** | `job-proposal-template` |
| **Package** | `@gauzy/plugin-job-proposal-ui` |
| **Version** | `1.0.0` |
| **Location** | `jobs-sections` |
| **Permission** | `ORG_PROPOSAL_TEMPLATES_VIEW` |
| **Type** | Module-based |

## Plugin Definition

```typescript
export const JobProposalTemplatePlugin: PluginUiDefinition = {
  id: 'job-proposal-template',
  version: '1.0.0',
  location: 'jobs-sections',
  module: JobProposalTemplateModule,
  permissionKeys: [PermissionsEnum.ORG_PROPOSAL_TEMPLATES_VIEW],
  routes: [JOB_PROPOSAL_TEMPLATE_ROUTE as PluginRouteInput]
};
```

## Route

- **Path:** `/pages/jobs/proposal-template`
- **Module:** `JobProposalTemplateModule` (lazy-loaded)
- **Redirect on denied:** `/pages/jobs/search`
- **Selectors:** `project: false, team: false`

## Features

- Browse and manage reusable proposal templates
- Create and edit templates with form builder
- Conditional "Add" button for users with `PROPOSAL_TEMPLATES_EDIT` permission

## Navigation

Adds a "Proposal Template" tab with `far fa-file-alt` icon in the Jobs section.
