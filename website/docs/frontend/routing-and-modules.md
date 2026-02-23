---
sidebar_position: 2
---

# Routing & Modules

Angular routing and lazy-loaded module architecture.

## Top-Level Routes

| Path                  | Module            | Description           |
| --------------------- | ----------------- | --------------------- |
| `/auth`               | AuthModule        | Login, register       |
| `/pages`              | PagesModule       | Main app shell        |
| `/pages/dashboard`    | DashboardModule   | Dashboard             |
| `/pages/employees`    | EmployeesModule   | Employee management   |
| `/pages/projects`     | ProjectsModule    | Project management    |
| `/pages/tasks`        | TasksModule       | Task management       |
| `/pages/time-tracker` | TimeTrackerModule | Time tracking         |
| `/pages/invoices`     | InvoicesModule    | Invoicing             |
| `/pages/expenses`     | ExpensesModule    | Expenses              |
| `/pages/settings`     | SettingsModule    | Organization settings |

## Lazy Loading

All feature modules are lazy-loaded:

```typescript
const routes: Routes = [
  {
    path: "employees",
    loadChildren: () =>
      import("./employees/employees.module").then((m) => m.EmployeesModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { permissions: ["ORG_EMPLOYEES_VIEW"] },
  },
];
```

## Route Guards

| Guard               | Purpose                           |
| ------------------- | --------------------------------- |
| `AuthGuard`         | Requires authenticated user       |
| `RoleGuard`         | Requires specific role/permission |
| `OrganizationGuard` | Requires active organization      |
| `TenantGuard`       | Requires active tenant            |

## Module Pattern

Each feature module follows:

```
feature/
├── feature.module.ts         # Module declaration
├── feature-routing.module.ts # Routes
├── feature.component.ts      # Container component
├── components/               # Child components
├── services/                 # Feature services
└── models/                   # Feature interfaces
```

## Related Pages

- [Frontend Overview](./frontend-overview)
- [State Management](./state-management)
