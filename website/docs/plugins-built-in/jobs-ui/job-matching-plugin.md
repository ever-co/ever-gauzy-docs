---
sidebar_position: 4
---

# JobMatchingPlugin

Provides the **Matching** tab in the Jobs section with AI-powered job-candidate matching recommendations.

## Plugin Details

| Property | Value |
|----------|-------|
| **Plugin ID** | `job-matching` |
| **Package** | `@gauzy/plugin-job-matching-ui` |
| **Version** | `1.0.0` |
| **Location** | `jobs-sections` |
| **Permission** | `ORG_JOB_MATCHING_VIEW` |
| **Type** | Module-based |

## Plugin Definition

```typescript
export const JobMatchingPlugin: PluginUiDefinition = {
  id: 'job-matching',
  version: '1.0.0',
  location: 'jobs-sections',
  module: JobMatchingModule,
  permissionKeys: [PermissionsEnum.ORG_JOB_MATCHING_VIEW],
  routes: [JOB_MATCHING_PAGE_ROUTE as PluginRouteInput]
};
```

## Route

- **Path:** `/pages/jobs/matching`
- **Module:** `JobMatchingModule` (lazy-loaded)
- **Redirect on denied:** `/pages/dashboard`
- **Selectors:** `date: true, employee: true, project: false, team: false`

## Features

- AI-powered job-candidate matching recommendations
- Requires active Gauzy AI integration

## Navigation

Adds a "Matching" tab with `fas fa-user` icon. **Dynamically shown/hidden** based on `jobMatchingEntity$` observable.
