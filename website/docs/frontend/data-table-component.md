---
sidebar_position: 12
---

# Data Table Component

Using and customizing the smart data table for listing entities.

## Overview

Gauzy uses Angular2 Smart Table (`angular2-smart-table`) for data display across the application. All list views use a consistent table component with filtering, sorting, pagination, and actions.

## Basic Usage

```typescript
@Component({
  template: `
    <angular2-smart-table
      [settings]="settings"
      [source]="source"
      (edit)="onEditRow($event)"
      (delete)="onDeleteRow($event)"
    >
    </angular2-smart-table>
  `,
})
export class MyListComponent {
  settings = {
    actions: {
      add: false,
      edit: { editButtonContent: '<i class="nb-edit"></i>' },
      delete: { deleteButtonContent: '<i class="nb-trash"></i>' },
    },
    columns: {
      name: { title: "Name", type: "string" },
      email: { title: "Email", type: "string" },
      status: {
        title: "Status",
        type: "custom",
        renderComponent: StatusBadgeComponent,
      },
      createdAt: {
        title: "Created",
        type: "custom",
        renderComponent: DateViewComponent,
      },
    },
  };
}
```

## Server-Side Data Source

```typescript
import { ServerDataSource } from "angular2-smart-table";

export class MyListComponent {
  source: ServerDataSource;

  constructor(private http: HttpClient) {
    this.source = new ServerDataSource(http, {
      endPoint: "/api/my-entity",
      dataKey: "items",
      totalKey: "total",
      pagerPageKey: "page",
      pagerLimitKey: "limit",
      sortFieldKey: "orderBy",
      sortDirKey: "order",
    });
  }
}
```

## Custom Render Components

| Component              | Type    | Description           |
| ---------------------- | ------- | --------------------- |
| `DateViewComponent`    | Date    | Formatted dates       |
| `StatusBadgeComponent` | Badge   | Colored status badges |
| `AvatarComponent`      | Image   | User/employee avatar  |
| `ActionComponent`      | Actions | Row action buttons    |

## Related Pages

- [Frontend Architecture](./frontend-architecture) — frontend overview
- [Pagination & Filtering](../api/pagination-and-filtering) — API pagination
