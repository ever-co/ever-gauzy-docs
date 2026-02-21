---
sidebar_position: 14
---

# Goal Endpoints

API endpoints for Goals, Key Results, and KPIs.

## Goals

```bash
# List goals
GET /api/goals?organizationId=xxx&tenantId=xxx

# Create goal
POST /api/goals
{
  "name": "Increase Revenue Q1",
  "description": "Grow revenue by 20%",
  "deadline": "Q1-2024",
  "level": "organization",
  "ownerEmployeeId": "employee-uuid",
  "organizationId": "org-uuid"
}

# Update goal
PUT /api/goals/:id
{
  "progress": 65
}

# Delete goal
DELETE /api/goals/:id
```

## Key Results

```bash
# List key results
GET /api/key-results?goalId=xxx

# Create key result
POST /api/key-results
{
  "name": "Close 50 deals",
  "type": "Numerical",
  "targetValue": 50,
  "initialValue": 0,
  "currentValue": 23,
  "goalId": "goal-uuid",
  "weight": 40
}

# Update key result
PUT /api/key-results/:id
{
  "currentValue": 35
}
```

## KPIs

```bash
# List KPIs
GET /api/goal-kpi

# Create KPI
POST /api/goal-kpi
{
  "name": "Monthly Recurring Revenue",
  "type": "Currency",
  "currentValue": 50000,
  "targetValue": 75000,
  "operator": ">="
}
```

## Goal Templates

```bash
# List templates
GET /api/goal-templates

# Create template
POST /api/goal-templates
{
  "name": "Revenue Growth Template",
  "level": "organization",
  "keyResults": [
    { "name": "New Deals", "type": "Numerical" },
    { "name": "Customer Retention", "type": "Numerical" }
  ]
}
```

## Time Frames

```bash
GET /api/goal-time-frame
POST /api/goal-time-frame
```

## Related Pages

- [API Overview](./overview)
- [Goals & OKRs](../features/goals-and-okrs) — feature guide
