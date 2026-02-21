---
sidebar_position: 7
---

# Time Tracking Endpoints

API endpoints for time logs, timesheets, activity tracking, and screenshots.

## Time Logs

### List Time Logs

```http
GET /api/timesheet/time-log?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "...",
      "startedAt": "2024-01-15T09:00:00.000Z",
      "stoppedAt": "2024-01-15T17:00:00.000Z",
      "duration": 28800,
      "logType": "TRACKED",
      "source": "DESKTOP",
      "description": "Working on feature X",
      "employeeId": "...",
      "projectId": "...",
      "taskId": "...",
      "organizationId": "..."
    }
  ],
  "total": 150
}
```

### Create Time Log

```http
POST /api/timesheet/time-log
Authorization: Bearer {token}
Content-Type: application/json

{
  "startedAt": "2024-01-15T09:00:00.000Z",
  "stoppedAt": "2024-01-15T17:00:00.000Z",
  "logType": "MANUAL",
  "source": "WEB_TIMER",
  "description": "Working on feature X",
  "projectId": "project-uuid",
  "taskId": "task-uuid",
  "organizationId": "org-uuid",
  "isBillable": true
}
```

### Update Time Log

```http
PUT /api/timesheet/time-log/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "stoppedAt": "2024-01-15T18:00:00.000Z",
  "description": "Updated description"
}
```

### Delete Time Log

```http
DELETE /api/timesheet/time-log/{id}
Authorization: Bearer {token}
```

### Log Types

| Type      | Description                        | Source            |
| --------- | ---------------------------------- | ----------------- |
| `TRACKED` | Tracked by desktop timer           | Desktop Timer app |
| `MANUAL`  | Manually entered                   | Web UI or API     |
| `IDLE`    | Idle time (automatically detected) | Desktop Timer     |
| `RESUMED` | Resumed from idle                  | Desktop Timer     |

### Log Sources

| Source              | Description          |
| ------------------- | -------------------- |
| `WEB_TIMER`         | Browser-based timer  |
| `DESKTOP`           | Desktop Timer app    |
| `MOBILE`            | Mobile app           |
| `BROWSER_EXTENSION` | Browser extension    |
| `HUBSTAFF`          | HubStaff integration |
| `UPWORK`            | Upwork integration   |

## Timesheets

### List Timesheets

```http
GET /api/timesheet?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}
```

### Submit Timesheet

```http
PUT /api/timesheet/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "ids": ["timesheet-uuid-1", "timesheet-uuid-2"],
  "status": "PENDING"
}
```

### Approve Timesheet

```http
PUT /api/timesheet/approve
Authorization: Bearer {token}
Content-Type: application/json

{
  "ids": ["timesheet-uuid-1"]
}
```

### Deny Timesheet

```http
PUT /api/timesheet/deny
Authorization: Bearer {token}
Content-Type: application/json

{
  "ids": ["timesheet-uuid-1"]
}
```

### Timesheet Statuses

| Status      | Description                  |
| ----------- | ---------------------------- |
| `DRAFT`     | Not yet submitted            |
| `PENDING`   | Submitted, awaiting approval |
| `IN_REVIEW` | Under review                 |
| `APPROVED`  | Approved by manager          |
| `DENIED`    | Rejected by manager          |

## Activity & Screenshots

### Get Activities

```http
GET /api/timesheet/activity?startDate=2024-01-01&endDate=2024-01-31&employeeId={id}
Authorization: Bearer {token}
```

### Get Screenshots

```http
GET /api/timesheet/screenshot?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}
```

**Response:**

```json
{
  "items": [
    {
      "id": "...",
      "file": "https://storage.example.com/screenshots/uuid.png",
      "thumb": "https://storage.example.com/screenshots/uuid-thumb.png",
      "recordedAt": "2024-01-15T10:30:00.000Z",
      "timeSlotId": "...",
      "employeeId": "..."
    }
  ]
}
```

## Statistics

### Get Time Summary

```http
GET /api/timesheet/statistics/counts?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}
```

**Response:**

```json
{
  "weeklyDuration": 144000,
  "weeklyActivities": 85,
  "todayDuration": 28800,
  "todayActivities": 12
}
```

### Get Project Time Report

```http
GET /api/timesheet/time-log/report/daily-chart?startDate=2024-01-01&endDate=2024-01-31&groupBy=project
Authorization: Bearer {token}
```

## Timer

### Start Timer

```http
POST /api/timesheet/timer/start
Authorization: Bearer {token}
Content-Type: application/json

{
  "projectId": "project-uuid",
  "taskId": "task-uuid",
  "organizationId": "org-uuid",
  "description": "Working on feature"
}
```

### Stop Timer

```http
POST /api/timesheet/timer/stop
Authorization: Bearer {token}
Content-Type: application/json

{
  "organizationId": "org-uuid"
}
```

### Toggle Timer

```http
POST /api/timesheet/timer/toggle
Authorization: Bearer {token}
Content-Type: application/json

{
  "projectId": "project-uuid",
  "taskId": "task-uuid",
  "organizationId": "org-uuid"
}
```

## Required Permissions

| Endpoint                        | Permission              |
| ------------------------------- | ----------------------- |
| `GET /api/timesheet/time-log`   | `TIME_TRACKER`          |
| `POST /api/timesheet/time-log`  | `TIME_TRACKER`          |
| `PUT /api/timesheet/approve`    | `CAN_APPROVE_TIMESHEET` |
| `GET /api/timesheet/screenshot` | `TIME_TRACKER`          |
