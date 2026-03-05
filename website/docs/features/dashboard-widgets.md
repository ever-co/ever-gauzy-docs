---
sidebar_position: 30
---

# Dashboard Widgets Configuration

Configure and customize the dashboard with widgets.

## Overview

The Gauzy dashboard provides visual widgets for at-a-glance insight into key metrics like time tracked, income/expense summaries, team activity, and project progress.

## Available Widgets

| Widget               | Description                       | Data Source          |
| -------------------- | --------------------------------- | -------------------- |
| Today's Tracked Time | Time logged today by current user | Time Logs            |
| Team Activity        | Team members' tracking status     | Time Logs + Employee |
| Income vs Expenses   | Financial summary chart           | Income + Expense     |
| Outstanding Invoices | Unpaid invoice count and total    | Invoices             |
| Active Tasks         | Tasks in progress                 | Tasks                |
| Project Progress     | Completion percentage per project | Projects + Tasks     |
| Employee Count       | Total active employees            | Employees            |

## Customizing the Dashboard

### Add a Widget

1. Navigate to the **Dashboard**
2. Click **Edit Dashboard** (gear icon)
3. Click **Add Widget**
4. Select a widget from the gallery
5. Configure size and position

### Remove a Widget

Click the **×** button on any widget to remove it.

### Resize and Reorder

Drag widgets to reorder. Resize by dragging edges.

## Custom Widgets

Organizations can create custom widgets. See [Dashboard Widget Development](../frontend/dashboard-widget-development).

## API

- [Dashboard Endpoints](../api/dashboard-endpoints) — dashboard data
- [Dashboard Widget Endpoints](../api/dashboard-endpoints) — widget CRUD

## Related Pages

- [Admin Dashboard](../admin/admin-dashboard) — admin guide
