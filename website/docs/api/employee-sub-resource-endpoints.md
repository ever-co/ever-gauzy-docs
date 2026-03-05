---
sidebar_position: 26
---

# Employee Sub-Resource Endpoints

API endpoints for employee awards, levels, settings, statistics, and recurring expenses.

## Employee Awards

### Base Path: `/api/employee-award`

```
GET    /api/employee-award                # List awards
GET    /api/employee-award/:id            # Get award
POST   /api/employee-award                # Create award
PUT    /api/employee-award/:id            # Update award
DELETE /api/employee-award/:id            # Delete award
```

**Create Body:**

```json
{
  "name": "Employee of the Month",
  "year": "2025",
  "employeeId": "employee-uuid"
}
```

## Employee Levels

### Base Path: `/api/employee-level`

```
GET    /api/employee-level                # List levels
POST   /api/employee-level                # Create level
PUT    /api/employee-level/:id            # Update level
DELETE /api/employee-level/:id            # Delete level
```

**Create Body:**

```json
{
  "level": "Senior",
  "tag": [{ "id": "tag-uuid" }]
}
```

## Employee Settings

### Base Path: `/api/employee-setting`

Per-employee configuration, such as time tracking preferences.

```
GET    /api/employee-setting              # List settings
GET    /api/employee-setting/:id          # Get setting
POST   /api/employee-setting              # Create setting
PUT    /api/employee-setting/:id          # Update setting
DELETE /api/employee-setting/:id          # Delete setting
```

## Employee Statistics

### Base Path: `/api/employee-statistics`

Read-only aggregate statistics.

```
GET /api/employee-statistics/months
GET /api/employee-statistics/count
GET /api/employee-statistics/statistics
```

**Statistics Response:**

```json
{
  "totalWorkHours": 160.5,
  "totalIncome": 8500,
  "totalExpenses": 1200,
  "totalBonuses": 500
}
```

## Employee Recurring Expenses

### Base Path: `/api/employee-recurring-expense`

```
GET    /api/employee-recurring-expense                # List
GET    /api/employee-recurring-expense/:id            # Get by ID
POST   /api/employee-recurring-expense                # Create
PUT    /api/employee-recurring-expense/:id            # Update
DELETE /api/employee-recurring-expense/:id            # Delete
GET    /api/employee-recurring-expense/employee/:id   # By employee
```

**Create Body:**

```json
{
  "categoryName": "Insurance",
  "value": 500,
  "currency": "USD",
  "startDate": "2025-01-01",
  "employeeId": "employee-uuid"
}
```

## Employee Recent Visits

### Base Path: `/api/employee-recent-visit`

Track recently visited entities for quick access.

```
GET    /api/employee-recent-visit             # List recent visits
POST   /api/employee-recent-visit             # Record visit
DELETE /api/employee-recent-visit/:id         # Delete visit
```

## Employee Notification Settings

### Base Path: `/api/employee-notification-setting`

```
GET    /api/employee-notification-setting                  # Get settings
POST   /api/employee-notification-setting                  # Create settings
PUT    /api/employee-notification-setting/:id              # Update settings
```

## Related Pages

- [Employee Endpoints](./employee-endpoints) — main employee API
- [Employee Management](../features/employee-management) — feature guide
- [Employee Entities](../database/entity-reference/employee-entities) — DB schema
