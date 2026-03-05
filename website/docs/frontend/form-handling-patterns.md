---
sidebar_position: 23
---

# Form Handling Patterns

Reactive form patterns used across the Gauzy frontend.

## Reactive Forms

```typescript
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  /* ... */
})
export class CreateTaskComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: [""],
      projectId: ["", Validators.required],
      priority: ["MEDIUM", Validators.required],
      dueDate: [null],
      assignees: [[]],
      tags: [[]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.taskService.create(this.form.value).subscribe();
    }
  }
}
```

## Dynamic Forms

```typescript
// Add dynamic form controls
addField() {
  const items = this.form.get('items') as FormArray;
  items.push(this.fb.group({
    name: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0)]],
  }));
}
```

## Custom Validators

```typescript
export function dateRangeValidator(group: FormGroup): ValidationErrors | null {
  const start = group.get("startDate")?.value;
  const end = group.get("endDate")?.value;
  return start && end && start > end
    ? { dateRange: "End date must be after start date" }
    : null;
}
```

## Form Component Pattern

```typescript
// Reusable form component
@Component({
  selector: "ga-employee-form",
  template: `...`,
})
export class EmployeeFormComponent {
  @Input() employee: IEmployee;
  @Output() save = new EventEmitter<IEmployee>();
  @Output() cancel = new EventEmitter<void>();
}
```

## Error Display

```html
<nb-form-field>
  <input nbInput formControlName="email" />
  <span
    *ngIf="form.get('email').hasError('required') && form.get('email').touched"
  >
    Email is required
  </span>
  <span *ngIf="form.get('email').hasError('email')">
    Invalid email format
  </span>
</nb-form-field>
```

## Related Pages

- [NgRx State Management](./ngrx-state-management) — state
- [Nebular UI Components](./nebular-components) — UI library
