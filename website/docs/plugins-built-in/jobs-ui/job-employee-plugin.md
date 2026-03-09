---
sidebar_position: 2
---

# JobEmployeePlugin

Provides the **Employee** tab in the Jobs section, showing employee job listings and assignments.

## Plugin Details

| Property | Value |
|----------|-------|
| **Plugin ID** | `job-employee` |
| **Package** | `@gauzy/plugin-job-employee-ui` |
| **Version** | `1.0.0` |
| **Location** | `jobs-sections` |
| **Permission** | `ORG_JOB_EMPLOYEE_VIEW` |
| **Type** | Module-based |

## Plugin Definition

```typescript
export const JobEmployeePlugin: PluginUiDefinition = {
  id: 'job-employee',
  version: '1.0.0',
  location: 'jobs-sections',
  module: JobEmployeeModule,
  permissionKeys: [PermissionsEnum.ORG_JOB_EMPLOYEE_VIEW],
  routes: [JOB_EMPLOYEE_PAGE_ROUTE as PluginRouteInput]
};
```

## Route

- **Path:** `/pages/jobs/employee`
- **Component:** `JobEmployeeComponent` (direct, not lazy-loaded)
- **Selectors:** `date: true, employee: true, project: false, team: false`

## Features

- View employee job listings and assignments
- Edit job search status per employee
- Filter by date range and employee

## Navigation

Adds an "Employee" tab in the Jobs section with `fas fa-user-friends` icon.
