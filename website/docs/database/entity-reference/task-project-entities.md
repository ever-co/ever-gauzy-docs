---
sidebar_position: 5
---

# Task & Project Entities

Entities for tasks, projects, sprints, daily plans, and related configuration (statuses, priorities, sizes, issue types).

## Task

| Column        | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| `title`       | string   | Task title                    |
| `number`      | number   | Auto-increment per project    |
| `prefix`      | string   | Project prefix (e.g., `PROJ`) |
| `description` | string?  | Rich text description         |
| `status`      | string?  | Current status name           |
| `priority`    | string?  | Priority level name           |
| `size`        | string?  | Size/complexity name          |
| `issueType`   | string?  | Issue type name               |
| `estimate`    | number?  | Estimated seconds             |
| `dueDate`     | Date?    | Deadline                      |
| `startDate`   | Date?    | Start date                    |
| `resolvedAt`  | Date?    | Resolution timestamp          |
| `version`     | string?  | Version/milestone             |
| `isDraft`     | boolean? | Draft status                  |
| `projectId`   | UUID?    | FK to organization_project    |
| `creatorId`   | UUID     | FK to user who created        |
| `parentId`    | UUID?    | FK to parent task (sub-tasks) |

**Key Relations:**

| Relation       | Type       | Target                  |
| -------------- | ---------- | ----------------------- |
| `project`      | ManyToOne  | OrganizationProject     |
| `creator`      | ManyToOne  | User                    |
| `parent`       | ManyToOne  | Task (self-referencing) |
| `children`     | OneToMany  | Task (sub-tasks)        |
| `members`      | ManyToMany | Employee                |
| `teams`        | ManyToMany | OrganizationTeam        |
| `tags`         | ManyToMany | Tag                     |
| `linkedIssues` | OneToMany  | TaskLinkedIssue         |
| `comments`     | OneToMany  | Comment                 |
| `timeLogs`     | OneToMany  | TimeLog                 |
| `dailyPlans`   | ManyToMany | DailyPlan               |

## OrganizationProject

| Column                  | Type     | Description                                                |
| ----------------------- | -------- | ---------------------------------------------------------- |
| `name`                  | string   | Project name                                               |
| `startDate`             | Date?    | Start date                                                 |
| `endDate`               | Date?    | End date                                                   |
| `billing`               | enum?    | `RATE_PER_TASK`, `RATE_PER_HOUR`, `FLAT_FEE`, `MILESTONES` |
| `currency`              | string?  | Project currency                                           |
| `public`                | boolean  | Public visibility                                          |
| `taskListType`          | enum     | Default task view type                                     |
| `code`                  | string?  | Short code                                                 |
| `description`           | string?  | Project description                                        |
| `color`                 | string?  | UI color                                                   |
| `billable`              | boolean? | Is billable                                                |
| `billingFlat`           | boolean? | Flat billing                                               |
| `budget`                | number?  | Budget amount                                              |
| `budgetType`            | enum?    | Budget tracking type                                       |
| `imageUrl`              | string?  | Project image                                              |
| `organizationContactId` | UUID?    | FK to client/contact                                       |

## OrganizationSprint

| Column      | Type    | Description                   |
| ----------- | ------- | ----------------------------- |
| `name`      | string  | Sprint name                   |
| `goal`      | string? | Sprint goal                   |
| `length`    | number  | Sprint length (days)          |
| `startDate` | Date?   | Start date                    |
| `endDate`   | Date?   | End date                      |
| `dayStart`  | number? | Week start day                |
| `status`    | enum?   | `TODO`, `IN_PROGRESS`, `DONE` |
| `projectId` | UUID    | FK to project                 |

## DailyPlan

| Column       | Type   | Description         |
| ------------ | ------ | ------------------- |
| `date`       | Date   | Plan date           |
| `status`     | enum   | Plan status         |
| `employeeId` | UUID   | FK to employee      |
| `tasks`      | Task[] | Planned tasks (M2M) |

## Status / Priority / Size / IssueType

Each is a lookup entity with customizable values per project:

| Column        | Type    | Description             |
| ------------- | ------- | ----------------------- |
| `name`        | string  | Display name            |
| `value`       | string  | Unique value identifier |
| `description` | string? | Description             |
| `icon`        | string? | Icon identifier         |
| `color`       | string? | Color hex               |
| `isSystem`    | boolean | System-defined          |
| `projectId`   | UUID?   | Scoped to project       |

## TaskLinkedIssue

| Column       | Type | Description       |
| ------------ | ---- | ----------------- |
| `action`     | enum | Relationship type |
| `taskFromId` | UUID | Source task       |
| `taskToId`   | UUID | Target task       |

**Action types:** `IS_BLOCKED_BY`, `BLOCKS`, `IS_CLONED_BY`, `CLONES`, `IS_DUPLICATED_BY`, `DUPLICATES`, `RELATES_TO`

## Related Pages

- [Task Endpoints](../../api/task-endpoints) — API reference
- [Sprint Endpoints](../../api/sprint-endpoints) — sprint API
- [Daily Plan Endpoints](../../api/daily-plan-endpoints) — daily plan API
- [Task Management](../../features/task-management) — feature guide
