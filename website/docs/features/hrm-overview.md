---
sidebar_position: 1
---

# HRM Overview

The Human Resource Management (HRM) module is a core component of Ever Gauzy, providing comprehensive tools for managing employees, tracking time, and handling HR workflows.

## HRM Modules

```
HRM Platform
├── Employee Management     ← Profiles, onboarding, departments
├── Time Tracking          ← Desktop timer, web timer, manual entries
├── Timesheets             ← Weekly/monthly approval workflows
├── Activity Tracking      ← Screenshots, app/URL tracking
├── Time Off Management    ← Leave requests, policies
├── Employee Awards        ← Recognition and awards
├── Employee Levels        ← Career progression
└── Reports & Analytics    ← HR dashboards and reports
```

## Key Features

### Employee Lifecycle

| Phase           | Features                                           |
| --------------- | -------------------------------------------------- |
| **Recruitment** | ATS, candidate tracking, interviews                |
| **Onboarding**  | Account creation, role assignment, team assignment |
| **Active**      | Time tracking, project assignment, performance     |
| **Performance** | Goals, KPIs, reviews                               |
| **Offboarding** | Deactivation, data retention                       |

### Time Management

- **Desktop Timer** — Cross-platform Electron app with screenshot capture
- **Web Timer** — Browser-based timer with project/task selection
- **Manual Entries** — Retroactive time log creation
- **Timesheet Approval** — Manager review and approval workflow

### Organizational Structure

- **Departments** — Functional groupings
- **Teams** — Cross-functional project teams
- **Positions** — Job titles and roles
- **Employee Levels** — Seniority and career tracks

## Data Model

```
Employee
├── User (1:1)              ← Authentication account
├── Organization (M:1)      ← Belongs to organization
├── Department (M:M)        ← Multiple department memberships
├── Teams (M:M)             ← Multiple team memberships
├── Time Logs (1:M)         ← Time tracking entries
├── Timesheets (1:M)        ← Periodic timesheets
├── Skills (M:M)            ← Skill tags
├── Projects (M:M)          ← Project assignments
└── Settings (1:1)          ← Tracking preferences
```

## Related Pages

- [Employee Management](./employee-management) — employee CRUD and profiles
- [Time Tracking](./time-tracking) — timer and time log management
- [Timesheets](./timesheets) — timesheet approval workflow
- [Activity Tracking](./activity-tracking) — screenshots and activity monitoring
- [Time Off Management](./time-off-management) — leave management
