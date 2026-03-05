---
sidebar_position: 27
---

# Smart Table Deep Dive

Using angular2-smart-table for data display in Gauzy.

## Overview

Gauzy uses [angular2-smart-table](https://akveo.github.io/ng2-smart-table/) extensively for data tables with support for:

- Sorting
- Filtering
- Pagination
- Inline editing
- Custom renderers

## Basic Configuration

```typescript
settings = {
  columns: {
    name: { title: "Name", type: "string" },
    email: { title: "Email", type: "string" },
    status: { title: "Status", type: "string" },
  },
  actions: {
    add: false,
    edit: true,
    delete: true,
  },
  pager: {
    display: true,
    perPage: 10,
  },
};
```

## Custom Cell Components

```typescript
columns: {
  name: {
    title: 'Name',
    type: 'custom',
    renderComponent: EmployeeNameComponent,
  },
  status: {
    title: 'Status',
    type: 'custom',
    renderComponent: StatusBadgeComponent,
  },
}
```

## Server-Side Source

```typescript
import { ServerDataSource } from "ng2-smart-table";

this.source = new ServerDataSource(this.http, {
  endPoint: "/api/employee",
  dataKey: "items",
  totalKey: "total",
  pagerPageKey: "page",
  pagerLimitKey: "limit",
  sortFieldKey: "sortBy",
  sortDirKey: "order",
  filterFieldKey: "#field#",
});
```

## Event Handling

```typescript
onEdit(event) {
  this.router.navigate(['/employees', event.data.id]);
}

onDelete(event) {
  if (confirm('Delete this employee?')) {
    this.employeeService.delete(event.data.id).subscribe();
  }
}
```

## Related Pages

- [Nebular Components](./nebular-components) — UI library
- [Responsive Design](./responsive-design) — layouts
- [Pagination & Filtering](../api/pagination-and-filtering) — API patterns
