---
sidebar_position: 5
---

# Frontend Architecture

The Ever Gauzy frontend is built with **Angular** (v19+) using the **Nebular UI** component library and **ngx-admin** dashboard template.

## Application Structure

The primary web application is in `apps/gauzy/`:

```
apps/gauzy/
├── src/
│   ├── app/
│   │   ├── @core/                 # Core services, guards, and interceptors
│   │   ├── @shared/               # Shared components, pipes, directives
│   │   ├── @theme/                # Theme definitions and layout components
│   │   ├── auth/                  # Login, register, and password pages
│   │   ├── pages/                 # Main application pages
│   │   │   ├── dashboard/         # Dashboard views
│   │   │   ├── employees/         # Employee management
│   │   │   ├── time-tracker/      # Time tracking views
│   │   │   ├── tasks/             # Task management
│   │   │   ├── projects/          # Project views
│   │   │   ├── invoices/          # Invoice management
│   │   │   ├── expenses/          # Expense tracking
│   │   │   ├── contacts/          # CRM contacts
│   │   │   ├── pipelines/         # Sales pipelines
│   │   │   ├── candidates/        # ATS candidates
│   │   │   ├── goals/             # Goals and KPIs
│   │   │   ├── reports/           # Reports and analytics
│   │   │   ├── settings/          # Organization settings
│   │   │   ├── integrations/      # Third-party integrations
│   │   │   └── inventory/         # Inventory management
│   │   ├── app.module.ts          # Root Angular module
│   │   ├── app-routing.module.ts  # Root routing configuration
│   │   └── app.component.ts       # Root component
│   ├── assets/                    # Static assets (images, icons, i18n)
│   ├── environments/              # Auto-generated environment configs
│   └── styles/                    # Global SCSS stylesheets
├── angular.json                   # Angular CLI configuration
└── tsconfig.json                  # TypeScript configuration
```

## Module Architecture

### Lazy Loading

Feature modules are lazy-loaded for performance:

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];
```

### Core Module (`@core/`)

Provides singleton services available throughout the application:

- **AuthService** — JWT token management, login/logout
- **Store** — global application state
- **ServerDataSource** — ng2-smart-table server-side data adapter
- **HTTP Interceptors** — automatic JWT attachment, error handling
- **Guards** — route guards for authentication and roles

### Shared Module (`@shared/`)

Reusable components, pipes, and directives:

- **Components** — header selectors, date pickers, status badges
- **Pipes** — moment/date formatting, currency formatting, truncation
- **Directives** — click outside, auto-focus, permission-based visibility
- **Dialogs** — confirmation, input, and custom modal dialogs

### Theme Module (`@theme/`)

Layout and theming infrastructure:

- **Layouts** — one-column, two-column, three-column layouts
- **Header** — top navigation bar with organization/project selectors
- **Sidebar** — collapsible navigation sidebar
- **Theme Switcher** — dark, light, corporate, material themes

## UI Library Packages

### `@gauzy/ui-core`

Core UI library shared across applications:

```
packages/ui-core/src/lib/
├── core/               # Core services (ServerDataSource, etc.)
├── shared/             # Shared components and modules
├── common/             # Common utilities
└── modules/            # Feature-specific UI modules
```

### `@gauzy/ui-config`

Configuration and feature flag management for the UI:

- Environment detection (production, development, demo)
- Feature flag evaluation
- API URL configuration

### `@gauzy/ui-sdk`

SDK for building external UI extensions and plugins.

## State Management

The application uses a combination of state management approaches:

### 1. Store Service

A central `Store` service manages global application state:

```typescript
@Injectable({ providedIn: "root" })
export class Store {
  // Selected organization
  selectedOrganization$: BehaviorSubject<IOrganization>;

  // Selected employee
  selectedEmployee$: BehaviorSubject<ISelectedEmployee>;

  // Selected project
  selectedProject$: BehaviorSubject<IOrganizationProject>;

  // Selected date range
  selectedDateRange$: BehaviorSubject<IDateRangePicker>;

  // Current user
  user$: BehaviorSubject<IUser>;
}
```

### 2. Angular Services

Feature-specific services manage local state with RxJS:

```typescript
@Injectable()
export class TimeTrackerService {
  private timeLogs$ = new BehaviorSubject<ITimeLog[]>([]);

  getTimeLogs(): Observable<ITimeLog[]> {
    return this.timeLogs$.asObservable();
  }
}
```

### 3. Route State

Route parameters and query params carry navigation state:

```typescript
// Navigating with state
this.router.navigate(["/pages/employees", employeeId], {
  queryParams: { date: this.selectedDate },
});
```

## Header Selectors

The application header provides contextual selectors that filter data across all pages:

```
┌──────────────────────────────────────────────────────────────────┐
│  Logo  │ Organization ▼ │ Project ▼ │ Employee ▼ │ Date Range ▼ │
└──────────────────────────────────────────────────────────────────┘
```

- **Organization Selector** — switches between organizations (Admin-level users)
- **Project Selector** — filters data to specific project
- **Employee Selector** — filters data to specific employee (Admin view)
- **Date Range Picker** — filters time-based data by date range

These selectors emit values to the `Store` service, which all page components subscribe to.

## Routing Structure

```
/                           → Redirect to /pages/dashboard
/auth/login                 → Login page
/auth/register              → Registration page
/auth/confirm-email         → Email confirmation
/pages/
├── dashboard/              → Main dashboard
├── accounting/
│   ├── invoices/           → Invoice management
│   ├── income/             → Income tracking
│   ├── expenses/           → Expense management
│   └── payments/           → Payment records
├── employees/              → Employee list and profiles
├── time-tracking/          → Time logs and timesheets
├── tasks/                  → Task board and list
├── projects/               → Project management
├── contacts/               → CRM contacts
├── candidates/             → ATS candidate management
├── goals/                  → Goals and KPIs
├── pipelines/              → Sales pipelines
├── reports/                → Reports and analytics
├── settings/               → Organization settings
├── integrations/           → Third-party integration setup
├── inventory/              → Product/inventory management
└── jobs/                   → Job board
```

## Internationalization (i18n)

The frontend supports multiple languages through `@ngx-translate`:

```
src/assets/i18n/
├── en.json          # English (default)
├── es.json          # Spanish
├── fr.json          # French
├── ru.json          # Russian
├── bg.json          # Bulgarian
├── he.json          # Hebrew
├── ar.json          # Arabic
├── pt.json          # Portuguese
├── zh.json          # Chinese
├── de.json          # German
└── ...
```

Usage in templates:

```html
<span>{{ 'HEADER.ORGANIZATION' | translate }}</span>
```

Translations are managed via [Crowdin](https://crowdin.com) for community contributions.

## Theming

The application supports multiple themes via Nebular's Eva Design System:

| Theme               | Description                        |
| ------------------- | ---------------------------------- |
| **Default (Light)** | Light backgrounds, standard colors |
| **Dark**            | Dark backgrounds, light text       |
| **Corporate**       | Professional, muted color palette  |
| **Material**        | Material Design-inspired theme     |
| **Custom**          | Custom themes via CSS variables    |

Theme switching is handled by `NbThemeService`:

```typescript
this.themeService.changeTheme("dark");
```

## Build Configuration

### Development

```bash
yarn start:ui        # Start with hot reload on :4200
```

### Production Build

```bash
yarn build:gauzy     # AOT-compiled production bundle
```

### Build Optimization

- **AOT Compilation** — ahead-of-time compilation for production
- **Tree Shaking** — removes unused code
- **Lazy Loading** — feature modules loaded on demand
- **Bundle Splitting** — vendor and main bundles separated

## Related Pages

- [Architecture Overview](./overview) — system-wide design
- [State Management](../frontend/state-management) — detailed state patterns
- [Theming](../frontend/theming) — theme customization
- [UI Components](../frontend/ui-components) — component library
- [i18n](../frontend/i18n) — internationalization setup
