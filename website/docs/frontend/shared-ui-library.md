---
sidebar_position: 17
---

# Shared UI Component Library

Reusable UI components available across the Gauzy webapp.

## Core Components

### Avatar Component

```html
<ga-avatar [src]="user.imageUrl" [name]="user.name" [size]="40"></ga-avatar>
```

### Status Badge

```html
<ga-status-badge [status]="task.status" [type]="'task'"></ga-status-badge>
```

### Date Picker

```html
<ga-date-range-picker
  [start]="startDate"
  [end]="endDate"
  (dateChange)="onDateChange($event)"
>
</ga-date-range-picker>
```

### Confirmation Dialog

```typescript
this.dialogService
  .open(ConfirmComponent, {
    context: {
      title: "Delete Task",
      message: "Are you sure you want to delete this task?",
    },
  })
  .onClose.subscribe((confirmed) => {
    if (confirmed) this.deleteTask();
  });
```

### Tags Input

```html
<ga-tags-input
  [tags]="selectedTags"
  [availableTags]="allTags"
  (tagsChange)="onTagsChange($event)"
>
</ga-tags-input>
```

## Layout Components

| Component        | Description                 |
| ---------------- | --------------------------- |
| `PageHeader`     | Page title with breadcrumbs |
| `EmptyState`     | No-data placeholder         |
| `LoadingSpinner` | Loading indicator           |
| `Sidebar`        | Collapsible sidebar         |
| `ActionBar`      | Top action buttons bar      |

## Form Components

| Component        | Description              |
| ---------------- | ------------------------ |
| `SelectEmployee` | Employee picker dropdown |
| `SelectProject`  | Project picker           |
| `SelectOrg`      | Organization selector    |
| `CurrencyInput`  | Amount + currency input  |
| `RichTextEditor` | Quill-based rich text    |

## Related Pages

- [UI Components](./ui-components) — component overview
- [Theming](./theming) — theme customization
- [Angular Module Architecture](./angular-module-architecture) — module setup
