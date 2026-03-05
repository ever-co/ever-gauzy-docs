---
sidebar_position: 3
---

# Employee Entities

Employee-related entities covering profiles, awards, levels, settings, phone numbers, availability, and recurring expenses.

## Employee

The main employee entity, linked 1:1 to a `User`.

| Column                  | Type     | Description                  |
| ----------------------- | -------- | ---------------------------- |
| `id`                    | UUID     | Primary key                  |
| `userId`                | UUID     | FK to user (1:1)             |
| `startedWorkOn`         | Date?    | Employment start date        |
| `endWork`               | Date?    | Employment end date          |
| `payPeriod`             | enum?    | `BI_WEEKLY`, `MONTHLY`, etc. |
| `billRateValue`         | number?  | Billing rate                 |
| `billRateCurrency`      | string?  | Billing currency             |
| `reWeeklyLimit`         | number?  | Weekly hour limit            |
| `offerDate`             | Date?    | Offer date                   |
| `acceptDate`            | Date?    | Offer acceptance date        |
| `rejectDate`            | Date?    | Offer rejection date         |
| `employeeLevel`         | string?  | Seniority level              |
| `isTrackingEnabled`     | boolean  | Time tracking enabled        |
| `isActive`              | boolean  | Currently active             |
| `short_description`     | string?  | Short bio                    |
| `description`           | string?  | Full description             |
| `averageIncome`         | number?  | Average income               |
| `averageBonus`          | number?  | Average bonus                |
| `totalWorkHours`        | number?  | Total logged hours           |
| `averageExpenses`       | number?  | Average expenses             |
| `show_anonymous_bonus`  | boolean? | Show bonus anonymously       |
| `show_average_bonus`    | boolean? | Show average bonus           |
| `show_average_expenses` | boolean? | Show average expenses        |
| `show_average_income`   | boolean? | Show average income          |
| `show_billrate`         | boolean? | Show billing rate            |
| `show_payperiod`        | boolean? | Show pay period              |
| `show_start_work_on`    | boolean? | Show start date              |
| `isOnline`              | boolean? | Currently online             |
| `isAway`                | boolean? | Currently away               |

**Key Relations:**

| Relation               | Type       | Target               |
| ---------------------- | ---------- | -------------------- |
| `user`                 | OneToOne   | User                 |
| `contact`              | ManyToOne  | Contact              |
| `organizationPosition` | ManyToOne  | OrganizationPosition |
| `tags`                 | ManyToMany | Tag                  |
| `skills`               | ManyToMany | Skill                |
| `projects`             | ManyToMany | OrganizationProject  |
| `teams`                | ManyToMany | OrganizationTeam     |
| `timeLogs`             | OneToMany  | TimeLog              |
| `awards`               | OneToMany  | EmployeeAward        |

## EmployeeAward

| Column       | Type   | Description    |
| ------------ | ------ | -------------- |
| `name`       | string | Award name     |
| `year`       | string | Year awarded   |
| `employeeId` | UUID   | FK to employee |

## EmployeeLevel

| Column  | Type   | Description             |
| ------- | ------ | ----------------------- |
| `level` | string | Level name (e.g., A, B) |
| `tag`   | Tag[]  | Associated tags         |

## EmployeeSetting

| Column         | Type   | Description    |
| -------------- | ------ | -------------- |
| `settingName`  | string | Setting key    |
| `settingValue` | string | Setting value  |
| `employeeId`   | UUID   | FK to employee |

## EmployeePhone

| Column        | Type   | Description    |
| ------------- | ------ | -------------- |
| `type`        | string | Phone type     |
| `phoneNumber` | string | Phone number   |
| `employeeId`  | UUID   | FK to employee |

## EmployeeAvailability

| Column       | Type   | Description       |
| ------------ | ------ | ----------------- |
| `dayOfWeek`  | number | 0 (Sun) - 6 (Sat) |
| `startTime`  | string | HH:mm format      |
| `endTime`    | string | HH:mm format      |
| `employeeId` | UUID   | FK to employee    |

## EmployeeRecurringExpense

| Column         | Type    | Description        |
| -------------- | ------- | ------------------ |
| `categoryName` | string  | Expense category   |
| `value`        | number  | Amount             |
| `currency`     | string  | Currency code      |
| `startDay`     | number  | Start day of month |
| `startMonth`   | number  | Start month        |
| `startYear`    | number  | Start year         |
| `startDate`    | Date    | Start date         |
| `endDay`       | number? | End day            |
| `endMonth`     | number? | End month          |
| `endYear`      | number? | End year           |
| `employeeId`   | UUID    | FK to employee     |

## Related Pages

- [Employee Endpoints](../../api/employee-endpoints) — API reference
- [Employee Management](../../features/employee-management) — feature guide
