---
sidebar_position: 6
---

# UI Components

Shared and reusable UI components across the Gauzy frontend.

## Component Libraries

| Library              | Package                       | Purpose               |
| -------------------- | ----------------------------- | --------------------- |
| **Nebular**          | `@nebular/theme`              | Primary UI framework  |
| **Angular Material** | `@angular/material`           | Additional components |
| **Smart Table**      | `angular2-smart-table`        | Data tables           |
| **FullCalendar**     | `@fullcalendar/angular`       | Calendar views        |
| **CKEditor**         | `@ckeditor/ckeditor5-angular` | Rich text editor      |

## Custom Components

### Smart Table

Used extensively for data grids:

```typescript
settings = {
  columns: {
    name: { title: "Name", type: "string" },
    email: { title: "Email", type: "string" },
    role: { title: "Role", type: "string" },
  },
  actions: { add: false, edit: true, delete: true },
  pager: { perPage: 10 },
};
```

### Date/Time Pickers

- Nebular datepicker for date selection
- Custom time range pickers
- Calendar integration for scheduling

### Tag Selectors

Multi-select tag components for:

- Employee skills
- Task labels
- Project tags

### Avatar & Status

Employee avatar components with online/offline status indicators.

## Design Patterns

### Container/Presentational

```
Container Component (Smart)
├── Fetches data from store/service
├── Handles user interactions
└── Passes data to presentational components

Presentational Component (Dumb)
├── Receives data via @Input()
├── Emits events via @Output()
└── Purely visual, no service dependencies
```

### Form Components

Reactive forms with validation:

```typescript
this.form = this.fb.group({
  name: ["", [Validators.required, Validators.minLength(3)]],
  email: ["", [Validators.required, Validators.email]],
  role: ["", Validators.required],
});
```

## Related Pages

- [Frontend Overview](./frontend-overview)
- [Theming](./theming)
