---
sidebar_position: 1
---

# Frontend Overview

The Ever Gauzy web frontend is built with Angular and organized as a modular monorepo application.

## Technology Stack

| Technology           | Version | Purpose               |
| -------------------- | ------- | --------------------- |
| **Angular**          | 17+     | UI framework          |
| **NgRx**             | Latest  | State management      |
| **Nebular**          | 12+     | UI component library  |
| **Bootstrap**        | 5       | CSS framework         |
| **Angular Material** | 17+     | Additional components |
| **RxJS**             | 7+      | Reactive programming  |
| **ngx-translate**    | Latest  | Internationalization  |

## Application Structure

```
apps/gauzy/src/
├── app/
│   ├── @core/              # Core services, guards, interceptors
│   ├── @shared/             # Shared components, pipes, directives
│   ├── @theme/              # Theme configuration
│   ├── auth/                # Authentication pages
│   ├── pages/               # Feature pages
│   │   ├── dashboard/
│   │   ├── employees/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── time-tracker/
│   │   ├── invoices/
│   │   ├── expenses/
│   │   └── settings/
│   ├── app-routing.module.ts
│   └── app.module.ts
├── assets/
│   ├── i18n/               # Translation files
│   ├── images/
│   └── styles/
└── environments/
```

## UI Library Packages

| Package                        | Purpose                                            |
| ------------------------------ | -------------------------------------------------- |
| `@gauzy/ui-core`               | Core UI services and models                        |
| `@gauzy/ui-config`             | Configuration service                              |
| `@gauzy/ui-auth`               | Authentication UI                                  |
| `@gauzy/common-angular`        | Shared Angular utilities                           |
| `@gauzy/plugin-ui`             | Plugin UI infrastructure (registry, extensions, events) |
| `@gauzy/ui-react`              | React-to-Angular bridge (directives, hooks)        |
| `@gauzy/ui-react-components`   | Reusable React UI primitives (Card, Progress)      |

## Related Pages

- [Routing & Modules](/frontend/routing-and-modules) — app structure
- [State Management](/frontend/state-management) — NgRx store
- [Theming](/frontend/theming) — UI customization
- [i18n](/frontend/i18n) — internationalization
- [Plugin UI System](/frontend/plugin-ui/overview) — frontend plugin architecture, extension slots, and React bridge
