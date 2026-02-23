---
sidebar_position: 16
---

# Goals & KPIs

Set organizational and individual goals with measurable key results.

## Goal Hierarchy

```
Organization Goal
├── Team Goal
│   ├── Key Result 1
│   └── Key Result 2
└── Employee Goal
    ├── Key Result 1
    └── Key Result 2
```

## Goal Levels

| Level          | Scope      | Description                |
| -------------- | ---------- | -------------------------- |
| `ORGANIZATION` | Org-wide   | Company-level objectives   |
| `TEAM`         | Team       | Team-level targets         |
| `EMPLOYEE`     | Individual | Personal development goals |

## Goal Deadlines

| Deadline         | Period          |
| ---------------- | --------------- |
| `END_OF_WEEK`    | Current week    |
| `END_OF_MONTH`   | Current month   |
| `END_OF_QUARTER` | Current quarter |
| `END_OF_YEAR`    | Current year    |
| `CUSTOM`         | Custom date     |

## Key Results

Each goal has measurable key results:

| Field          | Description             |
| -------------- | ----------------------- |
| `name`         | Key result description  |
| `type`         | KPI, TASK, or NUMERICAL |
| `targetValue`  | Target to achieve       |
| `initialValue` | Starting value          |
| `update`       | Current progress value  |
| `progress`     | Auto-calculated %       |
| `weight`       | Importance weight       |
| `owner`        | Responsible employee    |

### Key Result Types

| Type        | Measurement                      |
| ----------- | -------------------------------- |
| `KPI`       | Key Performance Indicator metric |
| `TASK`      | Completed/not completed          |
| `NUMERICAL` | Numeric target value             |

## KPI Templates

Pre-defined KPI templates:

| KPI                   | Unit | Description      |
| --------------------- | ---- | ---------------- |
| Revenue               | $    | Revenue target   |
| Customer Satisfaction | %    | NPS/CSAT score   |
| Employee Retention    | %    | Retention rate   |
| Project Delivery      | %    | On-time delivery |
| Bug Resolution        | days | Average fix time |

## Related Pages

- [Task Management](./task-management) — task-based key results
- [Reports & Analytics](./reports-and-analytics) — KPI dashboards
