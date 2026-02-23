---
sidebar_position: 17
---

# Goals & OKRs

Objective and Key Result (OKR) tracking system for organizational alignment and performance measurement.

## Overview

The Goals module implements a full OKR framework with hierarchical goal setting, key result tracking, and progress visualization.

## Goal Hierarchy

```
Organization Goal
  │
  ├── Team Goal
  │     ├── Key Result 1
  │     ├── Key Result 2
  │     └── Key Result 3
  │
  └── Employee Goal
        ├── Key Result 1
        └── Key Result 2
```

## Core Entities

### Goal

| Field             | Type   | Description                  |
| ----------------- | ------ | ---------------------------- |
| `name`            | string | Goal title                   |
| `description`     | string | Detailed description         |
| `deadline`        | string | Target quarter/date          |
| `level`           | enum   | Organization, Team, Employee |
| `progress`        | number | 0-100% completion            |
| `ownerEmployeeId` | UUID   | Responsible employee         |
| `ownerTeamId`     | UUID   | Responsible team (optional)  |

### Key Result

| Field          | Type   | Description                     |
| -------------- | ------ | ------------------------------- |
| `name`         | string | Key result title                |
| `type`         | enum   | Numerical, True/False, Currency |
| `targetValue`  | number | Target metric                   |
| `initialValue` | number | Starting metric                 |
| `currentValue` | number | Current metric                  |
| `goalId`       | UUID   | Parent goal                     |
| `weight`       | number | Importance weight               |

### KPI (Key Performance Indicator)

| Field          | Type   | Description                           |
| -------------- | ------ | ------------------------------------- |
| `name`         | string | KPI name                              |
| `type`         | enum   | Numerical, True/False, Currency, Task |
| `currentValue` | number | Current value                         |
| `targetValue`  | number | Target value                          |
| `operator`     | enum   | `>=` , `<=`, `=`                      |

## Goal Templates

Pre-built goal templates for common objectives:

| Template              | Level        | Description                |
| --------------------- | ------------ | -------------------------- |
| Revenue Growth        | Organization | Increase quarterly revenue |
| Customer Satisfaction | Organization | Improve NPS score          |
| Sprint Velocity       | Team         | Maintain sprint velocity   |
| Code Quality          | Team         | Reduce bug count           |
| Skill Development     | Employee     | Complete training goals    |

## Time Frames

Goals operate within defined time frames:

| Period    | Example          |
| --------- | ---------------- |
| Annual    | FY 2024          |
| Quarterly | Q1 2024, Q2 2024 |
| Monthly   | January 2024     |
| Custom    | Any date range   |

## API Endpoints

```bash
# Goals
GET    /api/goals
POST   /api/goals
PUT    /api/goals/:id
DELETE /api/goals/:id

# Key Results
GET    /api/key-results
POST   /api/key-results
PUT    /api/key-results/:id

# KPIs
GET    /api/goal-kpi
POST   /api/goal-kpi

# Templates
GET    /api/goal-templates
POST   /api/goal-templates
```

## Related Pages

- [HRM Features](../features/hrm-overview)
- [Reports & Analytics](../features/reports-and-analytics)
