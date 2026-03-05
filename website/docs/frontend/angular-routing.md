---
sidebar_position: 22
---

# Angular Routing Deep Dive

Routing configuration and navigation patterns in the Gauzy frontend.

## Route Structure

```typescript
const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "time-tracker",
        loadChildren: () =>
          import("./time-tracker/time-tracker.module").then(
            (m) => m.TimeTrackerModule,
          ),
      },
      {
        path: "employees",
        loadChildren: () =>
          import("./employees/employees.module").then((m) => m.EmployeesModule),
        data: { permission: PermissionsEnum.ORG_EMPLOYEES_VIEW },
      },
    ],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];
```

## Route Guards

| Guard               | Purpose                    |
| ------------------- | -------------------------- |
| `AuthGuard`         | Check JWT authentication   |
| `RoleGuard`         | Verify user role           |
| `PermissionGuard`   | Check specific permissions |
| `OrganizationGuard` | Verify org membership      |

## Route Data

```typescript
{
  path: 'invoices',
  component: InvoiceListComponent,
  data: {
    permission: PermissionsEnum.INVOICES_VIEW,
    selectors: { organization: true },
    breadcrumb: 'Invoices',
  }
}
```

## Navigation Patterns

### Programmatic Navigation

```typescript
this.router.navigate(["/pages/employees", employeeId]);
```

### Route Parameters

```typescript
// In route config
{ path: 'employee/:id', component: EmployeeDetailComponent }

// In component
const id = this.route.snapshot.params['id'];
// Or reactive
this.route.params.subscribe(params => {
  this.loadEmployee(params['id']);
});
```

### Query Parameters (Filters)

```typescript
this.router.navigate(["/pages/tasks"], {
  queryParams: { status: "TODO", project: "uuid" },
});
```

## Related Pages

- [Lazy Loading Modules](./lazy-loading) — code splitting
- [Angular Module Architecture](./angular-module-architecture) — modules
