---
sidebar_position: 15
---

# Form Validation Patterns

Client-side form validation patterns used in Gauzy.

## Overview

Gauzy uses Angular Reactive Forms with custom validators for consistent form validation across the application.

## Standard Form Setup

```typescript
@Component({ ... })
export class CreateTaskComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      projectId: ['', Validators.required],
      status: ['TODO', Validators.required],
      priority: ['MEDIUM'],
      dueDate: [null],
      assignees: [[]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.taskService.create(this.form.value);
  }
}
```

## Custom Validators

### Email Validator

```typescript
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return valid ? null : { invalidEmail: true };
  };
}
```

### Password Validator

```typescript
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const errors: any = {};

    if (!/[A-Z]/.test(password)) errors.missingUppercase = true;
    if (!/[a-z]/.test(password)) errors.missingLowercase = true;
    if (!/[0-9]/.test(password)) errors.missingNumber = true;
    if (!/[!@#$%^&*]/.test(password)) errors.missingSpecial = true;
    if (password.length < 8) errors.tooShort = true;

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
```

## Error Display

```html
<input nbInput formControlName="title" placeholder="Task Title" />
<div *ngIf="form.get('title').invalid && form.get('title').touched">
  <span class="error" *ngIf="form.get('title').hasError('required')">
    Title is required
  </span>
  <span class="error" *ngIf="form.get('title').hasError('maxlength')">
    Title must be less than 255 characters
  </span>
</div>
```

## Related Pages

- [Input Validation](../security/input-validation) — server-side validation
- [Frontend Architecture](./frontend-architecture) — frontend overview
