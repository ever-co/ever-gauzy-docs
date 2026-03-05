---
sidebar_position: 11
---

# Dashboard Widget Development

Create custom dashboard widgets for the Gauzy dashboard.

## Overview

Dashboard widgets provide at-a-glance metrics and data visualizations on the main dashboard.

## Widget Architecture

```typescript
interface IDashboardWidget {
  id: string;
  name: string;
  component: Type<any>;
  defaultWidth: number; // Grid columns (1-12)
  defaultHeight: number; // Grid rows
  permissions?: string[];
}
```

## Creating a Widget

### 1. Create the Component

```typescript
@Component({
  selector: "ga-my-widget",
  template: `
    <nb-card>
      <nb-card-header>My Widget</nb-card-header>
      <nb-card-body>
        <div class="widget-content">
          <span class="metric">{{ value }}</span>
          <span class="label">Active Tasks</span>
        </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class MyWidgetComponent implements OnInit {
  value: number;

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.value = await this.dashboardService.getActiveTaskCount();
  }
}
```

### 2. Register the Widget

```typescript
@NgModule({
  declarations: [MyWidgetComponent],
  providers: [
    {
      provide: DASHBOARD_WIDGETS,
      useValue: {
        id: "my-widget",
        name: "Active Tasks",
        component: MyWidgetComponent,
        defaultWidth: 4,
        defaultHeight: 2,
      },
      multi: true,
    },
  ],
})
export class MyWidgetModule {}
```

## Built-in Widgets

| Widget           | Description          | Default Size |
| ---------------- | -------------------- | ------------ |
| Today's Log      | Current day time log | 4 × 2        |
| Active Tasks     | Tasks in progress    | 4 × 2        |
| Team Activity    | Team member status   | 4 × 3        |
| Income/Expense   | Financial summary    | 6 × 3        |
| Project Progress | Project completion   | 6 × 3        |

## API Reference

- [Dashboard Endpoints](../api/dashboard-endpoints) — dashboard data API
- [Dashboard Widget Endpoints](../api/dashboard-endpoints) — widget CRUD

## Related Pages

- [Admin Dashboard](../admin/admin-dashboard) — dashboard guide
- [Angular Module Architecture](./angular-module-architecture) — module patterns
