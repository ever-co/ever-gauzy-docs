---
sidebar_position: 2
---

# Employee Management

Comprehensive employee profile management including onboarding, departments, teams, and settings.

## Employee Profile

Each employee record contains:

| Field              | Type    | Description                |
| ------------------ | ------- | -------------------------- |
| `firstName`        | string  | First name                 |
| `lastName`         | string  | Last name                  |
| `startedWorkOn`    | date    | Employment start date      |
| `endWork`          | date    | Employment end date        |
| `billRateValue`    | number  | Hourly bill rate           |
| `billRateCurrency` | string  | Bill rate currency         |
| `reWeeklyLimit`    | number  | Weekly hour limit          |
| `isActive`         | boolean | Active employment status   |
| `payPeriod`        | enum    | BI_WEEKLY, WEEKLY, MONTHLY |
| `offerDate`        | date    | Offer date                 |
| `acceptDate`       | date    | Acceptance date            |

## Users vs. Employees

:::important
A **User** and an **Employee** are separate entities. Not all users are employees, and the distinction is important.
:::

| Concept      | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| **User**     | An authentication account with email, password, role                  |
| **Employee** | A work context linked to a User with billing, time tracking, projects |

A User becomes an Employee when:

- Admin creates an employee record for them
- They are invited with `featureAsEmployee: true`
- They complete onboarding as SUPER_ADMIN (auto-created)

## Employee Onboarding

### 1. Invite Flow

```
Admin sends invite → User receives email → User accepts
→ User account created → Employee record created
→ Assigned to organization + department + team
```

### 2. Manual Creation

```
Admin navigates to Employees → Add Employee
→ Fill profile form → Assign role, department, team
→ Employee record + user account created
```

## Departments

Departments represent functional areas within an organization:

```
Organization
├── Engineering
│   ├── Frontend Team
│   └── Backend Team
├── Product
│   └── Design Team
├── Sales
│   └── Enterprise Sales
└── Operations
    ├── Finance
    └── HR
```

### Manage via UI

1. Navigate to **Organization → Departments**
2. Create departments with name and description
3. Assign employees to departments
4. Set department managers

## Teams

Teams are cross-functional groups for project collaboration:

### Team Roles

| Role        | Value | Permissions          |
| ----------- | ----- | -------------------- |
| **Manager** | `0`   | Full team management |
| **Member**  | `1`   | Standard member      |

### Team Features

- **Member management** — add/remove team members
- **Task assignment** — assign tasks to teams
- **Time tracking** — view team time summaries
- **Sprint management** — manage team sprints
- **Join requests** — team join request workflow

## Employee Settings

Per-employee tracking preferences:

| Setting                  | Default | Description                 |
| ------------------------ | ------- | --------------------------- |
| `isTrackingEnabled`      | `true`  | Enable time tracking        |
| `isScreenshotEnabled`    | `true`  | Capture screenshots         |
| `screenshotFrequency`    | `10`    | Minutes between screenshots |
| `trackOnSleep`           | `false` | Track during idle periods   |
| `randomScreenshot`       | `false` | Randomize screenshot timing |
| `allowScreenshotCapture` | `true`  | Allow desktop to capture    |
| `allowModifyTime`        | `true`  | Allow manual time entry     |
| `allowManualTime`        | `true`  | Allow manual logs           |
| `allowDeleteTime`        | `true`  | Allow deleting time entries |

## Employee Statistics

Available statistics per employee:

| Metric                | Description                 |
| --------------------- | --------------------------- |
| **Total Tracked**     | Total hours tracked         |
| **Weekly Hours**      | Hours tracked this week     |
| **Monthly Hours**     | Hours tracked this month    |
| **Bill Amount**       | Total billable amount       |
| **Activity Level**    | Average activity percentage |
| **Project Breakdown** | Hours per project           |

## Related Pages

- [Employee Endpoints](../api/employee-endpoints) — API reference
- [HRM Overview](./hrm-overview) — HRM module overview
- [Time Tracking](./time-tracking) — time tracking features
