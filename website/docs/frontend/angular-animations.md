---
sidebar_position: 28
---

# Angular Animations

Animation patterns used in the Gauzy UI.

## Angular Animation Module

```typescript
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [BrowserAnimationsModule],
})
export class AppModule {}
```

## Common Animations

### Fade In/Out

```typescript
import { trigger, transition, style, animate } from "@angular/animations";

export const fadeInOut = trigger("fadeInOut", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("300ms ease-in", style({ opacity: 1 })),
  ]),
  transition(":leave", [animate("200ms ease-out", style({ opacity: 0 }))]),
]);
```

### Slide In

```typescript
export const slideIn = trigger("slideIn", [
  transition(":enter", [
    style({ transform: "translateX(-100%)" }),
    animate("300ms ease-out", style({ transform: "translateX(0)" })),
  ]),
]);
```

### List Stagger

```typescript
export const listAnimation = trigger("listAnimation", [
  transition("* => *", [
    query(
      ":enter",
      [
        style({ opacity: 0, transform: "translateY(-15px)" }),
        stagger("50ms", [
          animate(
            "300ms ease-out",
            style({ opacity: 1, transform: "translateY(0)" }),
          ),
        ]),
      ],
      { optional: true },
    ),
  ]),
]);
```

## Usage in Components

```typescript
@Component({
  animations: [fadeInOut, slideIn],
  template: `
    <div @fadeInOut *ngIf="isVisible">Content</div>
    <div @slideIn>Slides in on load</div>
  `,
})
export class MyComponent {}
```

## Where Used

| Component        | Animation          |
| ---------------- | ------------------ |
| Sidebar          | Slide open/close   |
| Modals           | Fade in/scale      |
| Notifications    | Slide in from top  |
| Task board cards | Drag and drop ease |
| Data loading     | Skeleton shimmer   |

## Related Pages

- [Nebular Components](./nebular-components) — UI library
- [Theme Customization](./theme-customization-deep-dive) — theming
