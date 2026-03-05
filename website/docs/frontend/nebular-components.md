---
sidebar_position: 24
---

# Nebular UI Components

Guide to the Nebular component library used in the Gauzy frontend.

## Overview

Gauzy uses [Nebular](https://akveo.github.io/nebular/) as the primary UI component library, providing:

- Themed components
- Multiple color themes
- Authentication UI
- Responsive layouts

## Core Components

### Layout

```html
<nb-layout>
  <nb-layout-header fixed>
    <app-header></app-header>
  </nb-layout-header>
  <nb-sidebar>
    <nb-menu [items]="menuItems"></nb-menu>
  </nb-sidebar>
  <nb-layout-column>
    <router-outlet></router-outlet>
  </nb-layout-column>
</nb-layout>
```

### Cards

```html
<nb-card>
  <nb-card-header>Employee List</nb-card-header>
  <nb-card-body>
    <!-- Content -->
  </nb-card-body>
  <nb-card-footer>
    <button nbButton status="primary">Add Employee</button>
  </nb-card-footer>
</nb-card>
```

### Forms

```html
<nb-form-field>
  <nb-icon nbPrefix icon="person-outline"></nb-icon>
  <input nbInput fullWidth placeholder="Search employees" />
</nb-form-field>

<nb-select fullWidth placeholder="Status" [(selected)]="selectedStatus">
  <nb-option value="active">Active</nb-option>
  <nb-option value="inactive">Inactive</nb-option>
</nb-select>
```

### Dialogs

```typescript
this.dialogService
  .open(ConfirmDialogComponent, {
    context: {
      title: "Delete Employee?",
      body: "This action cannot be undone.",
    },
  })
  .onClose.subscribe((confirmed) => {
    if (confirmed) this.delete();
  });
```

### Toastr Notifications

```typescript
this.toastrService.success("Employee created successfully", "Success");
this.toastrService.danger("Failed to save", "Error");
```

## Themes

| Theme     | Variable    |
| --------- | ----------- |
| Default   | `default`   |
| Dark      | `dark`      |
| Cosmic    | `cosmic`    |
| Corporate | `corporate` |

## Related Pages

- [Theme Customization](./theme-customization-deep-dive) — themes
- [Form Handling](./form-handling-patterns) — forms
- [Angular Module Architecture](./angular-module-architecture) — modules
