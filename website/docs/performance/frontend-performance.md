---
sidebar_position: 5
---

# Frontend Performance

Angular application performance optimizations.

## Build Optimizations

### Production Build

```bash
# AOT compilation + tree shaking + minification
yarn build:prod:gauzy
```

### Lazy Loading

All feature modules are lazy-loaded, reducing initial bundle size:

```typescript
{
  path: 'employees',
  loadChildren: () =>
    import('./employees/employees.module').then(m => m.EmployeesModule),
}
```

### Bundle Analysis

```bash
# Generate bundle analysis
npx nx build gauzy --stats-json
npx webpack-bundle-analyzer dist/apps/gauzy/stats.json
```

## Runtime Optimizations

### OnPush Change Detection

Use `ChangeDetectionStrategy.OnPush` for improved rendering:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class EmployeeListComponent {}
```

### TrackBy Functions

```html
<tr *ngFor="let employee of employees; trackBy: trackById"></tr>
```

```typescript
trackById(index: number, item: IEmployee): string {
  return item.id;
}
```

### Virtual Scrolling

For large lists:

```html
<cdk-virtual-scroll-viewport itemSize="50">
  <div *cdkVirtualFor="let item of items">{{ item.name }}</div>
</cdk-virtual-scroll-viewport>
```

## Asset Optimization

- **Image compression** — WebP format where possible
- **Font subsetting** — load only needed characters
- **Code splitting** — per-route bundles
- **Preloading** — preload next likely routes

## Related Pages

- [Performance Overview](./performance-overview)
- [Frontend Overview](../frontend/frontend-overview)
