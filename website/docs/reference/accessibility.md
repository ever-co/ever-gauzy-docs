---
sidebar_position: 10
---

# Accessibility Guide

Ensure Ever Gauzy is accessible to all users.

## ARIA Standards

The Gauzy frontend follows WCAG 2.1 guidelines:

### Keyboard Navigation

- All interactive elements are keyboard-focusable
- Tab order follows visual layout
- Focus indicators are visible
- Skip-to-content links available

### Screen Reader Support

- Proper ARIA labels on interactive elements
- Descriptive alt text on images
- Semantic HTML structure
- Live regions for dynamic updates

## Implementation Guidelines

### Buttons

```html
<!-- Good -->
<button aria-label="Delete task" (click)="deleteTask()">
  <mat-icon>delete</mat-icon>
</button>

<!-- Bad -->
<div (click)="deleteTask()">
  <mat-icon>delete</mat-icon>
</div>
```

### Forms

```html
<label for="task-title">Task Title</label>
<input
  id="task-title"
  type="text"
  aria-required="true"
  aria-describedby="task-title-help"
/>
<small id="task-title-help">Enter a descriptive task title</small>
```

### Tables

```html
<table role="grid" aria-label="Employee list">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Department</th>
    </tr>
  </thead>
</table>
```

## Color Contrast

| Element       | Minimum Ratio |
| ------------- | ------------- |
| Normal text   | 4.5:1         |
| Large text    | 3:1           |
| UI components | 3:1           |

## Testing

- Use browser DevTools Accessibility tab
- Test with screen readers (NVDA, VoiceOver)
- Run Lighthouse accessibility audit
- Test keyboard-only navigation

## Related Pages

- [UI Components](../frontend/ui-components) — component library
- [Shared UI Library](../frontend/shared-ui-library) — reusable components
