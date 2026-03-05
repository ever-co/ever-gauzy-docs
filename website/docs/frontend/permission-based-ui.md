---
sidebar_position: 13
---

# Permission-Based UI Rendering

Conditionally display UI elements based on user roles and permissions.

## Overview

Gauzy provides directives and guards for permission-based rendering in the Angular frontend.

## NgxPermissions Directive

```html
<!-- Show only for users with ORG_USERS_VIEW permission -->
<button *ngxPermissionsOnly="['ORG_USERS_VIEW']">View Users</button>

<!-- Hide for users without permission -->
<div *ngxPermissionsExcept="['ADMIN_EDIT_DELETE']">Read-only content</div>
```

## Role-Based Rendering

```html
<!-- Show only for admins -->
<div *ngIf="store.hasRole('ADMIN')">Admin controls</div>

<!-- Show for managers and above -->
<div *ngIf="store.hasAnyRole(['ADMIN', 'MANAGER'])">Management panel</div>
```

## Route Guards

```typescript
const routes: Routes = [
  {
    path: "admin",
    canActivate: [PermissionGuard],
    data: {
      permissions: {
        only: [PermissionsEnum.ADMIN_EDIT_DELETE],
        redirectTo: "/dashboard",
      },
    },
    loadChildren: () => import("./admin/admin.module"),
  },
];
```

## Permission Service

```typescript
@Component({ ... })
export class MyComponent {
  constructor(private permissionsService: NgxPermissionsService) {}

  async checkPermission() {
    const hasPermission = await this.permissionsService
      .hasPermission('ORG_TASK_ADD');

    if (hasPermission) {
      // Show add task button
    }
  }
}
```

## Menu Visibility

Sidebar menu items are filtered based on permissions:

```typescript
{
  title: 'Tasks',
  icon: 'clipboard-outline',
  link: '/pages/tasks',
  permission: PermissionsEnum.ORG_TASK_VIEW,
  feature: FeatureEnum.FEATURE_TASK,
}
```

## Related Pages

- [Roles & Permissions](../authentication/roles-and-permissions) — permission system
- [User & Role Management](../admin/user-role-management) — admin guide
