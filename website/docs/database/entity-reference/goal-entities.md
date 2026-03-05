---
sidebar_position: 12
---

# Goal & KPI Entities

Entities for goals, OKRs, KPIs, key results, and goal templates.

## Goal

| Column               | Type    | Description                        |
| -------------------- | ------- | ---------------------------------- |
| `name`               | string  | Goal name                          |
| `description`        | string? | Description                        |
| `deadline`           | string  | Deadline period                    |
| `level`              | enum    | `ORGANIZATION`, `TEAM`, `EMPLOYEE` |
| `progress`           | number  | Progress percentage                |
| `ownerEmployeeId`    | UUID?   | FK to owning employee              |
| `ownerTeamId`        | UUID?   | FK to owning team                  |
| `leadId`             | UUID?   | FK to lead employee                |
| `alignedKeyResultId` | UUID?   | FK to aligned key result           |

**Relations:** `keyResults` (OneToMany KeyResult), `ownerEmployee` (ManyToOne Employee), `ownerTeam` (ManyToOne OrganizationTeam)

## KeyResult

| Column         | Type    | Description                                          |
| -------------- | ------- | ---------------------------------------------------- |
| `name`         | string  | Key result name                                      |
| `description`  | string? | Description                                          |
| `type`         | enum    | `NUMERICAL`, `TRUE_FALSE`, `CURRENCY`, `TASK`        |
| `targetValue`  | number? | Target value                                         |
| `initialValue` | number? | Starting value                                       |
| `update`       | number? | Current value                                        |
| `progress`     | number  | Progress percentage                                  |
| `deadline`     | string  | Deadline period                                      |
| `softDeadline` | Date?   | Soft deadline                                        |
| `hardDeadline` | Date?   | Hard deadline                                        |
| `status`       | enum    | `ON_TRACK`, `NEEDS_ATTENTION`, `AT_RISK`, `NONE_SET` |
| `weight`       | enum?   | Importance weight                                    |
| `goalId`       | UUID    | FK to goal                                           |
| `ownerId`      | UUID?   | FK to employee owner                                 |
| `leadId`       | UUID?   | FK to lead employee                                  |
| `projectId`    | UUID?   | FK to project                                        |
| `taskId`       | UUID?   | FK to task                                           |

## GoalKPI

| Column         | Type    | Description                                   |
| -------------- | ------- | --------------------------------------------- |
| `name`         | string  | KPI name                                      |
| `description`  | string? | Description                                   |
| `type`         | enum    | `NUMERICAL`, `TRUE_FALSE`, `CURRENCY`, `TASK` |
| `unit`         | string? | Measurement unit                              |
| `operator`     | enum    | `>=`, `<=`, `=`                               |
| `currentValue` | number  | Current value                                 |
| `targetValue`  | number  | Target value                                  |
| `leadId`       | UUID?   | FK to lead employee                           |

## GoalTemplate / KeyResultTemplate / GoalKPITemplate

Template versions of goals, key results, and KPIs for reuse.

## GoalTimeFrame

| Column      | Type   | Description       |
| ----------- | ------ | ----------------- |
| `name`      | string | Time frame name   |
| `status`    | enum   | Time frame status |
| `startDate` | Date   | Start date        |
| `endDate`   | Date   | End date          |

## GoalGeneralSetting

| Column                       | Type    | Description                 |
| ---------------------------- | ------- | --------------------------- |
| `maxObjectives`              | number  | Max objectives per employee |
| `maxKeyResults`              | number  | Max KRs per objective       |
| `employeeCanCreateObjective` | boolean | Self-service creation       |
| `canSeeAllObjectives`        | boolean | Visibility                  |

## Related Pages

- [Goal Endpoints](../../api/goal-endpoints) — API reference
- [Goals & KPIs](../../features/goals-and-kpis) — feature guide
- [Goals & OKRs](../../features/goals-and-okrs) — OKR methodology
