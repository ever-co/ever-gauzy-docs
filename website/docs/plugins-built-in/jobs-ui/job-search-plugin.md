---
sidebar_position: 3
---

# JobSearchPlugin

Provides the **Browse** tab in the Jobs section for searching and browsing job listings from integrated platforms.

## Plugin Details

| Property | Value |
|----------|-------|
| **Plugin ID** | `job-search` |
| **Package** | `@gauzy/plugin-job-search-ui` |
| **Version** | `1.0.0` |
| **Location** | `jobs-sections` |
| **Permission** | `ORG_JOB_SEARCH` |
| **Integration** | Requires Gauzy AI |
| **Type** | Module-based |

## Plugin Definition

```typescript
export const JobSearchPlugin: PluginUiDefinition = {
  id: 'job-search',
  version: '1.0.0',
  location: 'jobs-sections',
  module: JobSearchModule,
  permissionKeys: [PermissionsEnum.ORG_JOB_SEARCH],
  routes: [JOB_SEARCH_PAGE_ROUTE as PluginRouteInput]
};
```

## Route

- **Path:** `/pages/jobs/search`
- **Module:** `JobSearchModule` (lazy-loaded)
- **Integration:** `IntegrationEnum.GAUZY_AI`
- **Selectors:** `date: true, employee: true, project: false, team: false`

## Features

- Browse and search job listings from integrated platforms
- Apply to jobs manually
- View job status and details
- Requires active Gauzy AI integration for job matching sync

## Navigation

Adds a "Browse" tab with `fas fa-list` icon. **Dynamically shown/hidden** based on whether job matching sync is active (`jobMatchingEntity$` observable).
