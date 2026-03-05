---
sidebar_position: 26
---

# Responsive Design Patterns

Creating responsive layouts in the Gauzy frontend.

## Breakpoints

| Breakpoint | Width    | Target           |
| ---------- | -------- | ---------------- |
| XS         | < 576px  | Mobile portrait  |
| SM         | ≥ 576px  | Mobile landscape |
| MD         | ≥ 768px  | Tablet           |
| LG         | ≥ 992px  | Desktop          |
| XL         | ≥ 1200px | Large desktop    |
| XXL        | ≥ 1400px | Ultra-wide       |

## SCSS Mixins

```scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == "sm" {
    @media (min-width: 576px) {
      @content;
    }
  }
  @if $breakpoint == "md" {
    @media (min-width: 768px) {
      @content;
    }
  }
  @if $breakpoint == "lg" {
    @media (min-width: 992px) {
      @content;
    }
  }
  @if $breakpoint == "xl" {
    @media (min-width: 1200px) {
      @content;
    }
  }
}

// Usage
.employee-grid {
  display: grid;
  grid-template-columns: 1fr;

  @include respond-to("md") {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to("lg") {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Sidebar Behavior

| Screen Size | Sidebar State     |
| ----------- | ----------------- |
| < 768px     | Hidden (overlay)  |
| 768-1200px  | Collapsed (icons) |
| > 1200px    | Expanded (full)   |

## Table Responsiveness

```html
<div class="table-responsive">
  <nb-card>
    <nb-card-body>
      <angular2-smart-table [settings]="settings" [source]="source">
      </angular2-smart-table>
    </nb-card-body>
  </nb-card>
</div>
```

## Mobile-First Components

```scss
.dashboard-widget {
  width: 100%;
  padding: 1rem;

  @include respond-to("md") {
    width: 50%;
  }

  @include respond-to("lg") {
    width: 33.33%;
  }
}
```

## Related Pages

- [Theme Customization](./theme-customization-deep-dive) — theming
- [Nebular Components](./nebular-components) — UI library
