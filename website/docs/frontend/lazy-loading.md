---
sidebar_position: 16
---

# Lazy Loading & Preloading Strategies

Optimize Angular bundle size with lazy loading.

## Lazy Loading

Feature modules are loaded on demand:

```typescript
const routes: Routes = [
  {
    path: "tasks",
    loadChildren: () =>
      import("./tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "employees",
    loadChildren: () =>
      import("./employees/employees.module").then((m) => m.EmployeesModule),
  },
];
```

## Preloading Strategies

### PreloadAllModules

Preloads all lazy modules after the app loads:

```typescript
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ]
})
```

### Custom Preloading

Preload only modules the user is likely to visit:

```typescript
@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.["preload"] ? load() : of(null);
  }
}
```

## Bundle Analysis

```bash
# Analyze bundle sizes
yarn build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

## Tips

- Keep feature modules independent
- Use `SharedModule` for common components
- Avoid importing large libraries in `CoreModule`
- Use dynamic imports for heavy components

## Related Pages

- [Angular Module Architecture](./angular-module-architecture) — module structure
- [Frontend Performance](../performance/frontend-performance) — optimization
