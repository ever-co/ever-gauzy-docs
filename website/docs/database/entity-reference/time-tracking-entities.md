---
sidebar_position: 4
---

# Time Tracking Entities

Entities for time logs, time slots, timesheets, screenshots, and activity monitoring.

## TimeLog

Individual time entries recorded by employees.

| Column        | Type    | Description                                                       |
| ------------- | ------- | ----------------------------------------------------------------- |
| `id`          | UUID    | Primary key                                                       |
| `startedAt`   | Date    | Start timestamp                                                   |
| `stoppedAt`   | Date?   | Stop timestamp                                                    |
| `logType`     | enum    | `TRACKED`, `MANUAL`, `IDLE`, `RESUMED`                            |
| `source`      | enum    | `WEB_TIMER`, `DESKTOP`, `MOBILE`, `BROWSER`, `HUBSTAFF`, `UPWORK` |
| `duration`    | number  | Duration in seconds                                               |
| `isBillable`  | boolean | Billable flag                                                     |
| `description` | string? | Time log description                                              |
| `reason`      | string? | Manual edit reason                                                |
| `isRunning`   | boolean | Currently running                                                 |
| `editedAt`    | Date?   | Last manual edit timestamp                                        |
| `employeeId`  | UUID    | FK to employee                                                    |
| `projectId`   | UUID?   | FK to project                                                     |
| `taskId`      | UUID?   | FK to task                                                        |
| `timesheetId` | UUID?   | FK to timesheet                                                   |

**Relations:**

| Relation    | Type       | Target              |
| ----------- | ---------- | ------------------- |
| `employee`  | ManyToOne  | Employee            |
| `project`   | ManyToOne  | OrganizationProject |
| `task`      | ManyToOne  | Task                |
| `timesheet` | ManyToOne  | Timesheet           |
| `timeSlots` | ManyToMany | TimeSlot            |

## TimeSlot

10-minute activity slots that aggregate activity data.

| Column       | Type   | Description                |
| ------------ | ------ | -------------------------- |
| `startedAt`  | Date   | Slot start time            |
| `duration`   | number | Duration in seconds (≤600) |
| `keyboard`   | number | Keyboard activity %        |
| `mouse`      | number | Mouse activity %           |
| `overall`    | number | Combined activity %        |
| `employeeId` | UUID   | FK to employee             |

**Relations:**

| Relation      | Type       | Target         |
| ------------- | ---------- | -------------- |
| `timeLogs`    | ManyToMany | TimeLog        |
| `screenshots` | OneToMany  | Screenshot     |
| `activities`  | OneToMany  | Activity       |
| `minutes`     | OneToMany  | TimeSlotMinute |

## TimeSlotMinute

Per-minute activity breakdown within a time slot.

| Column       | Type   | Description       |
| ------------ | ------ | ----------------- |
| `keyboard`   | number | Keyboard activity |
| `mouse`      | number | Mouse activity    |
| `datetime`   | Date   | Minute timestamp  |
| `timeSlotId` | UUID   | FK to time slot   |

## Timesheet

Weekly timesheet aggregations.

| Column         | Type    | Description                                           |
| -------------- | ------- | ----------------------------------------------------- |
| `duration`     | number  | Total duration (sec)                                  |
| `keyboard`     | number  | Keyboard activity %                                   |
| `mouse`        | number  | Mouse activity %                                      |
| `overall`      | number  | Overall activity %                                    |
| `startedAt`    | Date    | Week start                                            |
| `stoppedAt`    | Date    | Week end                                              |
| `status`       | enum    | `DRAFT`, `PENDING`, `IN_REVIEW`, `DENIED`, `APPROVED` |
| `approvedAt`   | Date?   | Approval timestamp                                    |
| `approvedById` | UUID?   | Supervisor who approved                               |
| `employeeId`   | UUID    | FK to employee                                        |
| `isBilled`     | boolean | Whether billed                                        |

## Screenshot

Activity screenshots captured during time tracking.

| Column            | Type     | Description                 |
| ----------------- | -------- | --------------------------- |
| `file`            | string   | File path/URL               |
| `thumb`           | string?  | Thumbnail path/URL          |
| `recordedAt`      | Date     | Capture timestamp           |
| `deletedAt`       | Date?    | Soft delete timestamp       |
| `timeSlotId`      | UUID     | FK to time slot             |
| `storageProvider` | enum?    | Storage provider used       |
| `isWorkRelated`   | boolean? | Work-related classification |

## Activity

Application and URL activity tracking.

| Column       | Type   | Description         |
| ------------ | ------ | ------------------- |
| `title`      | string | Window/app title    |
| `type`       | enum   | `APP`, `URL`        |
| `date`       | Date   | Activity date       |
| `time`       | Date   | Activity time       |
| `duration`   | number | Duration in seconds |
| `timeSlotId` | UUID   | FK to time slot     |
| `employeeId` | UUID   | FK to employee      |
| `projectId`  | UUID?  | FK to project       |
| `taskId`     | UUID?  | FK to task          |

## Related Pages

- [Time Tracking Endpoints](../../api/time-tracking-endpoints) — API reference
- [Time Tracking Feature](../../features/time-tracking) — feature overview
- [Activity Tracking](../../features/activity-tracking) — screenshots and activities
